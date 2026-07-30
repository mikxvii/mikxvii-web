import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Dev-only content writer for the /studio admin. Writes into src/content and
 * public/images — i.e. straight into your git working tree, so you review and
 * commit the result like any other change. Disabled outside `next dev`.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const PHOTOS_DIR = path.join(process.cwd(), "public", "images", "photos");
const PROJECT_IMAGES_DIR = path.join(process.cwd(), "public", "images", "projects");

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

function safeFileName(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = slugify(path.basename(name, ext)) || "image";
  return base + ext;
}

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, data: unknown) {
  fs.writeFileSync(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2) + "\n");
}

async function saveUpload(file: File, dir: string, name: string): Promise<string> {
  fs.mkdirSync(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, name), buf);
  return name;
}

function lines(v: string | null): string[] {
  return (v || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Studio is only available in dev mode." }, { status: 404 });
  }

  const form = await req.formData();
  const type = String(form.get("type") || "");
  const str = (k: string) => String(form.get(k) || "").trim();

  try {
    switch (type) {
      case "journal": {
        const title = str("title");
        const date = str("date"); // yyyy-mm-dd from <input type="date">
        const body = String(form.get("body") || "").trim();
        if (!title || !date || !body) throw new Error("Title, date and body are required.");
        const slug = slugify(title);
        if (!slug) throw new Error("Title must contain letters or numbers.");
        const file = path.join(CONTENT_DIR, "writings", `${slug}.md`);
        if (fs.existsSync(file)) throw new Error(`Entry "${slug}" already exists.`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, `---\ntitle: ${title}\ndate: ${date}\n---\n\n${body}\n`);
        return NextResponse.json({ ok: true, message: `Saved src/content/writings/${slug}.md` });
      }

      case "experience": {
        const role = str("role");
        const org = str("org");
        const date = str("date"); // yyyy-mm
        if (!role || !org || !date) throw new Error("Role, organization and date are required.");
        const entry = {
          date,
          role,
          org,
          location: str("location"),
          points: lines(str("points")),
          tags: str("tags").split(",").map((s) => s.trim()).filter(Boolean),
        };
        const all = readJson<unknown[]>("experience.json", []);
        writeJson("experience.json", [entry, ...all]);
        return NextResponse.json({ ok: true, message: `Added "${role}" to experience.json` });
      }

      case "project": {
        const title = str("title");
        if (!title) throw new Error("Title is required.");
        const slug = slugify(str("slug") || title);
        if (!SLUG_RE.test(slug)) throw new Error("Slug must be lowercase letters, numbers and dashes.");
        const all = readJson<{ slug: string }[]>("projects.json", []);
        if (all.some((p) => p.slug === slug)) throw new Error(`Project "${slug}" already exists.`);
        const entry = {
          slug,
          title,
          year: str("year"),
          role: str("role"),
          color: str("color") || "#BF5A3C",
          blurb: str("blurb"),
          tech: lines(str("tech")),
          live: str("live"),
          github: str("github"),
        };
        writeJson("projects.json", [entry, ...all]);
        const dir = path.join(PROJECT_IMAGES_DIR, slug);
        fs.mkdirSync(dir, { recursive: true });
        const cover = form.get("cover");
        if (cover instanceof File && cover.size > 0) {
          await saveUpload(cover, dir, "cover" + path.extname(cover.name).toLowerCase());
        }
        const shots = form.getAll("shots").filter((f): f is File => f instanceof File && f.size > 0);
        for (let i = 0; i < shots.length; i++) {
          await saveUpload(shots[i], dir, `shot-${i + 1}${path.extname(shots[i].name).toLowerCase()}`);
        }
        return NextResponse.json({
          ok: true,
          message: `Added "${title}". Images go in public/images/projects/${slug}/`,
        });
      }

      case "photo": {
        const file = form.get("file");
        if (!(file instanceof File) || file.size === 0) throw new Error("Pick an image file.");
        const name = safeFileName(file.name);
        if (fs.existsSync(path.join(PHOTOS_DIR, name))) throw new Error(`${name} already exists.`);
        await saveUpload(file, PHOTOS_DIR, name);
        const manifest = readJson<unknown[]>("photos.json", []);
        writeJson("photos.json", [
          ...manifest,
          {
            file: name,
            caption: str("caption") || name.replace(path.extname(name), ""),
            place: str("place"),
            date: str("date"),
          },
        ]);
        return NextResponse.json({ ok: true, message: `Uploaded ${name} to the roll.` });
      }

      default:
        throw new Error(`Unknown type "${type}".`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
