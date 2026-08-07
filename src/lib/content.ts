import fs from "fs";
import path from "path";
import sharp from "sharp";
import type {
  ExperienceRole,
  Photo,
  PhotoData,
  Project,
  ProjectData,
  WritingEntry,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const PHOTOS_DIR = path.join(PUBLIC_DIR, "images", "photos");
const PROJECT_IMAGES_DIR = path.join(PUBLIC_DIR, "images", "projects");

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

/* ----------------------------------------------------------------- */
/* Experience                                                        */
/* ----------------------------------------------------------------- */

/** "2025-06" → "06 · 25" */
function stampFromDate(date: string): string {
  const [y, m] = date.split("-");
  if (!y || !m) return date;
  return `${m} · ${y.slice(-2)}`;
}

export function getExperience(): ExperienceRole[] {
  const roles = readJson<ExperienceRole[]>("experience.json", []);
  return roles
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((r) => ({ ...r, stamp: r.stamp || stampFromDate(r.date) }));
}

/* ----------------------------------------------------------------- */
/* Projects                                                          */
/* ----------------------------------------------------------------- */

function scanProjectImages(slug: string): { cover: string | null; shots: string[] } {
  const dir = path.join(PROJECT_IMAGES_DIR, slug);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f));
  } catch {
    return { cover: null, shots: [] };
  }
  const toUrl = (f: string) => `/images/projects/${slug}/${f}`;
  const cover = files.find((f) => f.toLowerCase().startsWith("cover"));
  const shots = files
    .filter((f) => f !== cover)
    .sort()
    .map(toUrl);
  return { cover: cover ? toUrl(cover) : null, shots };
}

export function getProjects(): Project[] {
  const projects = readJson<ProjectData[]>("projects.json", []);
  return projects.map((p) => ({ ...p, ...scanProjectImages(p.slug) }));
}

/* ----------------------------------------------------------------- */
/* Photography                                                       */
/* ----------------------------------------------------------------- */

/** "07 · 25" / "07 · 2025" → timestamp; NaN when unparseable */
function photoDateKey(date: string): number {
  const m = date.match(/(\d{1,2})\s*·\s*(\d{2,4})/);
  if (!m) return NaN;
  const year = m[2].length <= 2 ? 2000 + Number(m[2]) : Number(m[2]);
  return new Date(year, Number(m[1]) - 1, 1).getTime();
}

// Fallback used only if a file can't be read (corrupt/missing) — keeps the
// lightbox border sane instead of throwing at build time.
const FALLBACK_RATIO = { width: 3, height: 2 };

async function photoAspect(file: string): Promise<{ width: number; height: number }> {
  try {
    const meta = await sharp(path.join(PHOTOS_DIR, file)).metadata();
    if (meta.width && meta.height) return { width: meta.width, height: meta.height };
  } catch {}
  return FALLBACK_RATIO;
}

export async function getPhotos(): Promise<Photo[]> {
  const manifest = readJson<PhotoData[]>("photos.json", []);
  let files: string[] = [];
  try {
    files = fs.readdirSync(PHOTOS_DIR).filter((f) => IMAGE_EXT.test(f));
  } catch {
    files = [];
  }
  const inManifest = new Set(manifest.map((p) => p.file));
  // Manifest order IS the curated order for undated photos — see the note
  // below on why we don't fall back to file mtime.
  const manifestPhotos = manifest.filter((p) => files.includes(p.file));
  // Files dropped into the folder but not yet catalogued in photos.json get
  // sensible defaults so they still show up, appended after the curated set.
  const uncatalogued = files
    .filter((f) => !inManifest.has(f))
    .sort()
    .map((f) => ({
      file: f,
      caption: f.replace(IMAGE_EXT, "").replace(/[-_]+/g, " "),
      place: "San Diego",
      date: "",
    }));
  const all: PhotoData[] = [...manifestPhotos, ...uncatalogued];

  // Newest first: sort by the date stamp; undated photos fall back to their
  // position in photos.json — NOT file mtime. mtime can't be trusted here:
  // every `git clone`/checkout (including Vercel's, on every single deploy)
  // resets all file mtimes to the checkout moment, so an mtime-based sort
  // would silently scramble back to alphabetical on the next deploy. Manifest
  // order is committed data, so it's stable forever.
  const manifestIndex = new Map(all.map((p, i) => [p.file, i]));
  // Bigger than any realistic date field (year ~2286 in epoch ms), so the
  // whole undated group floats above dated photos — "just added" outranks
  // "dated 2025" until you give it a real date, same as the old behavior.
  const UNDATED_BASE = 1e15;
  const sortKey = (p: PhotoData): number => {
    const byDate = photoDateKey(p.date);
    if (!Number.isNaN(byDate)) return byDate;
    return UNDATED_BASE - (manifestIndex.get(p.file) ?? 0);
  };
  const sorted = all
    .map((p) => ({ p, key: sortKey(p) }))
    .sort((a, b) => b.key - a.key)
    .map((x) => x.p);

  return Promise.all(
    sorted.map(async (p, i) => ({
      ...p,
      src: `/images/photos/${p.file}`,
      no: String(i + 1).padStart(2, "0"),
      ...(await photoAspect(p.file)),
    }))
  );
}

/* ----------------------------------------------------------------- */
/* Writings (markdown files with simple frontmatter)                 */
/* ----------------------------------------------------------------- */

/** "2026-07-12" → "07 · 2026" */
function dateLabelFromIso(iso: string): string {
  const [y, m] = iso.split("-");
  if (!y || !m) return iso;
  return `${m} · ${y}`;
}

function parseEntry(slug: string, raw: string): WritingEntry | null {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fm) return null;
  const meta: Record<string, string> = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      meta[line.slice(0, idx).trim()] = line
        .slice(idx + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }
  if (!meta.title || !meta.date) return null;
  const paragraphs = fm[2]
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return {
    slug,
    title: meta.title,
    date: meta.date,
    dateLabel: meta.dateLabel || dateLabelFromIso(meta.date),
    paragraphs,
  };
}

export function getWritings(): WritingEntry[] {
  const dir = path.join(CONTENT_DIR, "writings");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files
    .map((f) =>
      parseEntry(f.replace(/\.md$/, ""), fs.readFileSync(path.join(dir, f), "utf8"))
    )
    .filter((e): e is WritingEntry => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
