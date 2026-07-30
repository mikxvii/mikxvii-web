"use client";

import { useState } from "react";

type Tab = "journal" | "experience" | "project" | "photo";

const TABS: { id: Tab; label: string }[] = [
  { id: "journal", label: "Journal entry" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Project" },
  { id: "photo", label: "Photo" },
];

const HUES = [
  { v: "#BF5A3C", label: "Terracotta" },
  { v: "#F85525", label: "Clay" },
  { v: "#FAA968", label: "Peach" },
  { v: "#2BAF90", label: "Spearmint" },
  { v: "#028391", label: "Teal" },
  { v: "#0E5C4A", label: "Pine" },
  { v: "#FF5A1F", label: "Ember" },
  { v: "#01204E", label: "Navy" },
];

export default function StudioClient() {
  const [tab, setTab] = useState<Tab>("journal");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    data.set("type", tab);
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/studio", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setMsg({ ok: true, text: json.message });
      formEl.reset();
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Request failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="studio-panel">
      <div className="studio-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`studio-tab${tab === t.id ? " is-active" : ""}`}
            onClick={() => {
              setTab(t.id);
              setMsg(null);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} key={tab}>
        {tab === "journal" && (
          <>
            <div className="studio-field">
              <label htmlFor="j-title">Title</label>
              <input id="j-title" name="title" required placeholder="On shipping small things" />
            </div>
            <div className="studio-field">
              <label htmlFor="j-date">Date</label>
              <input id="j-date" name="date" type="date" required />
            </div>
            <div className="studio-field">
              <label htmlFor="j-body">Entry</label>
              <textarea
                id="j-body"
                name="body"
                required
                rows={10}
                placeholder="Write your entry. Separate paragraphs with a blank line — the first letter becomes the drop cap."
              />
              <p className="studio-hint">
                Saved as markdown in src/content/writings/, sorted into the notebook by date.
              </p>
            </div>
          </>
        )}

        {tab === "experience" && (
          <>
            <div className="studio-field">
              <label htmlFor="x-role">Role</label>
              <input id="x-role" name="role" required placeholder="Software Engineering Intern" />
            </div>
            <div className="studio-field">
              <label htmlFor="x-org">Organization</label>
              <input id="x-org" name="org" required placeholder="A Startup" />
            </div>
            <div className="studio-field">
              <label htmlFor="x-location">Location</label>
              <input id="x-location" name="location" placeholder="San Diego, CA" />
            </div>
            <div className="studio-field">
              <label htmlFor="x-date">Start month</label>
              <input id="x-date" name="date" type="month" required />
              <p className="studio-hint">Used to sort the reel (newest first) and print the date stamp.</p>
            </div>
            <div className="studio-field">
              <label htmlFor="x-points">Highlights — one per line</label>
              <textarea id="x-points" name="points" rows={4} placeholder={"Shipped X\nBuilt Y"} />
            </div>
            <div className="studio-field">
              <label htmlFor="x-tags">Tech tags — comma separated</label>
              <input id="x-tags" name="tags" placeholder="React, TypeScript, CI/CD" />
            </div>
          </>
        )}

        {tab === "project" && (
          <>
            <div className="studio-field">
              <label htmlFor="p-title">Title</label>
              <input id="p-title" name="title" required placeholder="Driftwood" />
            </div>
            <div className="studio-field">
              <label htmlFor="p-year">Year</label>
              <input id="p-year" name="year" required placeholder="2025" />
            </div>
            <div className="studio-field">
              <label htmlFor="p-role">Role / kind</label>
              <input id="p-role" name="role" placeholder="Full-stack web app" />
            </div>
            <div className="studio-field">
              <label htmlFor="p-color">Record label color</label>
              <select id="p-color" name="color" defaultValue="#BF5A3C">
                {HUES.map((h) => (
                  <option key={h.v} value={h.v}>
                    {h.label} ({h.v})
                  </option>
                ))}
              </select>
            </div>
            <div className="studio-field">
              <label htmlFor="p-blurb">Blurb</label>
              <textarea id="p-blurb" name="blurb" rows={3} placeholder="What it is, in a sentence or two." />
            </div>
            <div className="studio-field">
              <label htmlFor="p-tech">Tracklist (tech stack) — one per line</label>
              <textarea id="p-tech" name="tech" rows={3} placeholder={"Next.js + TypeScript\nPostgres"} />
            </div>
            <div className="studio-field">
              <label htmlFor="p-live">Live URL</label>
              <input id="p-live" name="live" placeholder="https://…" />
            </div>
            <div className="studio-field">
              <label htmlFor="p-github">Code URL</label>
              <input id="p-github" name="github" placeholder="https://github.com/…" />
            </div>
            <div className="studio-field">
              <label htmlFor="p-cover">Album cover (square image)</label>
              <input id="p-cover" name="cover" type="file" accept="image/*" />
            </div>
            <div className="studio-field">
              <label htmlFor="p-shots">Sleeve gallery shots (up to 3)</label>
              <input id="p-shots" name="shots" type="file" accept="image/*" multiple />
              <p className="studio-hint">
                You can also drop images into public/images/projects/&lt;slug&gt;/ later —
                cover.jpg and shot-1.jpg … shot-3.jpg are picked up automatically.
              </p>
            </div>
          </>
        )}

        {tab === "photo" && (
          <>
            <div className="studio-field">
              <label htmlFor="f-file">Photo</label>
              <input id="f-file" name="file" type="file" accept="image/*" required />
            </div>
            <div className="studio-field">
              <label htmlFor="f-caption">Caption</label>
              <input id="f-caption" name="caption" placeholder="Golden hour" />
            </div>
            <div className="studio-field">
              <label htmlFor="f-place">Place</label>
              <input id="f-place" name="place" placeholder="San Diego" />
            </div>
            <div className="studio-field">
              <label htmlFor="f-date">Date stamp</label>
              <input id="f-date" name="date" placeholder="07 · 25" />
              <p className="studio-hint">
                Shortcut: dropping a file straight into public/images/photos also works —
                this form just adds the caption metadata too.
              </p>
            </div>
          </>
        )}

        <button type="submit" className="mg-btn mg-btn--primary" disabled={busy}>
          {busy ? "Saving…" : "Save"}
        </button>

        {msg && (
          <div className={`studio-msg ${msg.ok ? "studio-msg--ok" : "studio-msg--err"}`}>
            {msg.text}
          </div>
        )}
      </form>
    </div>
  );
}
