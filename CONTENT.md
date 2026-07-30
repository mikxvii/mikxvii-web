# Adding content

Everything on the site is driven by files in `src/content/` and images in
`public/images/`. No code changes needed. All pages are statically generated,
so after editing content in production you just rebuild/redeploy; in `npm run
dev` a browser refresh is enough.

## The easy way: Studio

Run `npm run dev` and open **http://localhost:3000/studio**. It has forms for:

- **Journal entry** → writes `src/content/writings/<slug>.md`
- **Experience role** → prepends to `src/content/experience.json`
- **Project** (with cover + gallery upload) → `src/content/projects.json` +
  `public/images/projects/<slug>/`
- **Photo upload** → `public/images/photos/` + caption metadata in
  `src/content/photos.json`

Studio only exists in dev mode — it writes into your working tree, so review
with `git diff` and commit. It is a 404 in production.

## By hand

### Journal entries — `src/content/writings/*.md`

One markdown file per entry. Blank lines separate paragraphs; the first letter
becomes the drop cap. Entries are sorted newest-first by `date`.

```markdown
---
title: On shipping small things
date: 2026-07-01
---

First paragraph…

Second paragraph…
```

### Photos — `public/images/photos/`

Drop image files in the folder — they appear on the filmstrip automatically.
To control caption, place, date stamp, and order, add a matching entry to
`src/content/photos.json`:

```json
{ "file": "my_photo.jpg", "caption": "Golden hour", "place": "San Francisco", "date": "07 · 25" }
```

### Projects — `src/content/projects.json` + `public/images/projects/<slug>/`

Add an object to the JSON (see existing entries for the shape), then drop
images into `public/images/projects/<slug>/`:

- `cover.jpg` (square) → the album sleeve
- `shot-1.jpg`, `shot-2.jpg`, `shot-3.jpg` → the sleeve gallery

Missing images render as labeled placeholders, so you can add them later.
`color` is the record-label hue — pick from the signature palette: terracotta
`#BF5A3C`, clay `#F85525`, peach `#FAA968`, spearmint `#2BAF90`, teal
`#028391`, pine `#0E5C4A`, ember `#FF5A1F`, navy `#01204E`.

### Experience — `src/content/experience.json`

Add an object with `date` (`"YYYY-MM"`, used for newest-first sorting and the
ember date stamp), `role`, `org`, `location`, `points` (bullet list), and
`tags` (tech pills). Scene numbers are assigned automatically.

### Site-wide bits

- Nav/footer/Explore-card copy: `src/lib/site.ts`
- Social links + résumé: `src/lib/site.ts` (`SOCIALS`) and `public/mike_resume.pdf`
- Hero/portrait photos: `public/images/site/`
- Design tokens (colors, fonts, grain): `src/app/globals.css`
