"use client";

import { useCallback, useEffect, useRef, useState } from "react";
/* eslint-disable @next/next/no-img-element -- exact-fit filmstrip/lightbox media */
import type { Photo } from "@/lib/types";

export default function Filmstrip({ photos }: { photos: Photo[] }) {
  const [lb, setLb] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const n = photos.length;

  const scroll = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (el) el.scrollBy({ left: dir * Math.min(560, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const prev = useCallback(() => setLb((s) => (s === null ? s : (s - 1 + n) % n)), [n]);
  const next = useCallback(() => setLb((s) => (s === null ? s : (s + 1) % n)), [n]);

  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lb, prev, next]);

  const cur = lb === null ? null : photos[lb];

  return (
    <>
      <section className="mg-container mg-rise" style={{ paddingTop: 60, paddingBottom: 8 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="mg-eyebrow">04 · 35mm</span>
            <h1 className="mg-page-h1" style={{ marginBottom: 12 }}>
              Life on film
            </h1>
            <p className="mg-page-sub" style={{ maxWidth: 520 }}>
              A roll across the world (at least what I&rsquo;ve seen of it). Scroll the
              strip sideways, or tap a frame to see more.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button type="button" className="mg-scroll-btn" aria-label="Previous" onClick={() => scroll(-1)}>
              ←
            </button>
            <button type="button" className="mg-scroll-btn" aria-label="Next" onClick={() => scroll(1)}>
              →
            </button>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "var(--text-faint)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              DRAG
              <span style={{ animation: "mg-nudge 1.6s ease-in-out infinite" }}>→</span>
            </span>
          </div>
        </div>
      </section>

      <div ref={stripRef} className="mg-strip">
        <div className="mg-strip-track">
          {photos.map((f, i) => (
            <figure key={f.src} className="mg-photo-frame" onClick={() => setLb(i)}>
              <div aria-hidden="true" className="mg-sprocket-row" />
              <div className="mg-photo-window">
                <img src={f.src} alt={f.caption} loading={i < 2 ? "eager" : "lazy"} />
                <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.4 }} />
                {f.date && <div className="mg-photo-date">{f.date}</div>}
                <div className="mg-photo-no">FRAME {f.no}</div>
              </div>
              <div aria-hidden="true" className="mg-sprocket-row" />
              <figcaption className="mg-photo-caption">
                <span className="mg-photo-caption-title">{f.caption}</span>
                <span className="mg-photo-caption-place">{f.place}</span>
              </figcaption>
            </figure>
          ))}
          {/* End-of-roll marker */}
          <div
            style={{
              scrollSnapAlign: "center",
              flex: "0 0 auto",
              padding: "0 48px 0 28px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#7c7259",
                whiteSpace: "nowrap",
              }}
            >
              — End of roll —
            </span>
          </div>
        </div>
      </div>

      {cur && (
        <div className="mg-lightbox" onClick={() => setLb(null)} role="dialog" aria-modal="true">
          <button
            type="button"
            className="mg-lightbox-close"
            aria-label="Close"
            onClick={() => setLb(null)}
          >
            ×
          </button>
          <div className="mg-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="mg-lightbox-nav" aria-label="Previous" onClick={prev}>
              ←
            </button>
            <div className="mg-lightbox-photo">
              <img src={cur.src} alt={cur.caption} />
              <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.35 }} />
              {cur.date && <div className="mg-lightbox-date">{cur.date}</div>}
            </div>
            <button type="button" className="mg-lightbox-nav" aria-label="Next" onClick={next}>
              →
            </button>
          </div>
          <div onClick={(e) => e.stopPropagation()} style={{ textAlign: "center" }}>
            <p className="mg-lightbox-caption">{cur.caption}</p>
            <p className="mg-lightbox-place">{cur.place}</p>
          </div>
        </div>
      )}
    </>
  );
}
