"use client";

import { useEffect, useRef, useState } from "react";
import type { WritingEntry } from "@/lib/types";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function roman(i: number): string {
  return ROMAN[i] ?? String(i + 1);
}

export default function Notebook({ entries }: { entries: WritingEntry[] }) {
  const [ch, setCh] = useState(0);
  const readingRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Replay the page-turn animation whenever the chapter changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = readingRef.current;
    if (!el) return;
    el.classList.remove("is-turning");
    void el.offsetWidth;
    el.classList.add("is-turning");
  }, [ch]);

  if (entries.length === 0) {
    return (
      <div className="mg-book" style={{ gridTemplateColumns: "1fr" }}>
        <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.35, zIndex: 3 }} />
        <article
          className="mg-reading"
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: 460,
            gap: 10,
          }}
        >
          <span className="mg-chapter-label">Chapter I</span>
          <h2 className="mg-entry-title" style={{ margin: 0, maxWidth: "none" }}>
            Blank pages, for now.
          </h2>
          <p className="mg-entry-para" style={{ margin: 0, maxWidth: "42ch" }}>
            The first entries are still being written — the ink isn&rsquo;t dry yet. Check
            back soon.
          </p>
          <span className="mg-chapter-date" style={{ marginTop: 8 }}>
            •&nbsp;•&nbsp;•
          </span>
        </article>
      </div>
    );
  }

  const n = entries.length;
  const cur = entries[ch];
  const first = cur.paragraphs[0] ?? "";
  const rest = cur.paragraphs.slice(1);

  return (
    <div className="mg-book">
      <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.35, zIndex: 3 }} />
      <div aria-hidden="true" className="mg-book-gutter" />

      <aside className="mg-toc">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2 className="mg-toc-title">Contents</h2>
          <span className="mg-toc-sort">by date ↓</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {entries.map((e, i) => (
            <button
              key={e.slug}
              type="button"
              className={`mg-toc-row${i === ch ? " is-active" : ""}`}
              onClick={() => setCh(i)}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0 }}>
                <span className="mg-toc-label">{roman(i)}</span>
                <span className="mg-toc-entry-title">{e.title}</span>
              </span>
              <span className="mg-toc-date">{e.dateLabel}</span>
            </button>
          ))}
        </nav>
      </aside>

      <article ref={readingRef} className="mg-reading">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 6,
          }}
        >
          <span className="mg-chapter-label">Chapter {roman(ch)}</span>
          <span className="mg-chapter-date">{cur.dateLabel}</span>
        </div>
        <h2 className="mg-entry-title">{cur.title}</h2>
        <p className="mg-entry-para">
          <span className="mg-dropcap">{first.charAt(0)}</span>
          {first.slice(1)}
        </p>
        {rest.map((p, i) => (
          <p key={i} className="mg-entry-para">
            {p}
          </p>
        ))}
        <div style={{ flex: 1 }} />
        <div className="mg-reading-footer">
          <button
            type="button"
            className={`mg-page-btn ${ch > 0 ? "mg-page-btn--on" : "mg-page-btn--off"}`}
            disabled={ch === 0}
            onClick={() => setCh((c) => Math.max(0, c - 1))}
          >
            ← Previous
          </button>
          <span className="mg-page-count">
            Entry {ch + 1} of {n}
          </span>
          <button
            type="button"
            className={`mg-page-btn ${ch < n - 1 ? "mg-page-btn--on" : "mg-page-btn--off"}`}
            disabled={ch === n - 1}
            onClick={() => setCh((c) => Math.min(n - 1, c + 1))}
          >
            Next →
          </button>
        </div>
      </article>
    </div>
  );
}
