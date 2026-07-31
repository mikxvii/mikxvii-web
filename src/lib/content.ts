import fs from "fs";
import path from "path";
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

export function getPhotos(): Photo[] {
  const manifest = readJson<PhotoData[]>("photos.json", []);
  let files: string[] = [];
  try {
    files = fs.readdirSync(PHOTOS_DIR).filter((f) => IMAGE_EXT.test(f));
  } catch {
    files = [];
  }
  const inManifest = new Set(manifest.map((p) => p.file));
  // Manifest provides metadata; any extra files dropped into the folder get
  // sensible defaults so they still show up.
  const all: PhotoData[] = [
    ...manifest.filter((p) => files.includes(p.file)),
    ...files
      .filter((f) => !inManifest.has(f))
      .map((f) => ({
        file: f,
        caption: f.replace(IMAGE_EXT, "").replace(/[-_]+/g, " "),
        place: "San Diego",
        date: "",
      })),
  ];
  // Newest first: sort by the date stamp; photos without one fall back to the
  // file's modification time, so a fresh drop starts at the front of the roll
  // until it's given a date in photos.json.
  const sortKey = (p: PhotoData): number => {
    const byDate = photoDateKey(p.date);
    if (!Number.isNaN(byDate)) return byDate;
    try {
      return fs.statSync(path.join(PHOTOS_DIR, p.file)).mtimeMs;
    } catch {
      return 0;
    }
  };
  return all
    .map((p) => ({ p, key: sortKey(p) }))
    .sort((a, b) => b.key - a.key)
    .map(({ p }, i) => ({
      ...p,
      src: `/images/photos/${p.file}`,
      no: String(i + 1).padStart(2, "0"),
    }));
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
