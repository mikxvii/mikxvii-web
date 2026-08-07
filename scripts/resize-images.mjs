#!/usr/bin/env node
// Resizes/recompresses images in public/images in place. Camera exports are
// far larger than anything a browser will ever display them at (portfolio
// photos were running 12-19MB each); this brings them down to a sane web
// size without a visible quality loss. Safe to re-run — already-small files
// are skipped. public/images is tracked in git, so `git checkout -- public/images`
// undoes this if needed.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "public", "images");
const MAX_DIMENSION = 2000; // long edge, px — plenty for full-bleed retina display
const JPEG_QUALITY = 82;
const SKIP_UNDER_BYTES = 300 * 1024; // don't bother re-encoding already-small files
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function fmtMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
}

async function run() {
  const files = walk(ROOT);
  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;
  let processed = 0;

  for (const file of files) {
    const before = fs.statSync(file).size;
    totalBefore += before;

    if (before < SKIP_UNDER_BYTES) {
      skipped++;
      totalAfter += before;
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    const img = sharp(file).rotate(); // auto-orient from EXIF, then strip it
    const meta = await img.metadata();
    const needsResize =
      (meta.width || 0) > MAX_DIMENSION || (meta.height || 0) > MAX_DIMENSION;

    const resized = needsResize
      ? img.resize({
          width: MAX_DIMENSION,
          height: MAX_DIMENSION,
          fit: "inside",
          withoutEnlargement: true,
        })
      : img;

    const buffer =
      ext === ".png"
        ? await resized.png({ compressionLevel: 9 }).toBuffer()
        : await resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

    // Only overwrite if we actually saved space.
    if (buffer.length < before) {
      fs.writeFileSync(file, buffer);
      totalAfter += buffer.length;
      processed++;
      console.log(
        `${path.relative(ROOT, file)}: ${fmtMB(before)} -> ${fmtMB(buffer.length)}`
      );
    } else {
      totalAfter += before;
      skipped++;
    }
  }

  console.log("\n---");
  console.log(`Processed: ${processed}, skipped (already small): ${skipped}, total: ${files.length}`);
  console.log(`Total: ${fmtMB(totalBefore)} -> ${fmtMB(totalAfter)} (saved ${fmtMB(totalBefore - totalAfter)})`);
}

run();
