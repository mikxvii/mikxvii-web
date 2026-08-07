"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/types";

export default function Crate({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [gal, setGal] = useState(0);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (i: number) => {
    if (flipTimer.current) clearTimeout(flipTimer.current);
    setSelected(i);
    setFlipped(false);
    setGal(0);
    // Auto-flip to the back of the sleeve shortly after the modal pops in.
    flipTimer.current = setTimeout(() => setFlipped(true), 650);
  };

  const close = useCallback(() => {
    if (flipTimer.current) clearTimeout(flipTimer.current);
    setSelected(null);
    setFlipped(false);
    setGal(0);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, close]);

  useEffect(() => {
    return () => {
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, []);

  const sel = selected === null ? null : projects[selected];

  return (
    <>
      <div className="mg-crate">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
          <span
            className="mg-eyebrow"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            Now crate-digging
          </span>
          <div className="mg-cards-rule" />
        </div>
        <div className="mg-crate-grid">
          {projects.map((p, i) => (
            <div key={p.slug} style={{ display: "flex", flexDirection: "column" }}>
              <div className="mg-album-art">
                <div aria-hidden="true" className="mg-vinyl" />
                <div className="mg-sleeve">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={`${p.title} cover`}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="mg-default-cover" style={{ background: p.color }}>
                      <span className="mg-default-cover-kicker">
                        Mike Guerrero Records
                      </span>
                      <span className="mg-default-cover-title">{p.title}</span>
                      <span className="mg-default-cover-meta">
                        {p.year} · {p.role}
                      </span>
                    </div>
                  )}
                  <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.25 }} />
                  <div aria-hidden="true" className="mg-sleeve-edge" />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                <button
                  type="button"
                  className="mg-album-btn"
                  style={{ flex: 1, minWidth: 0 }}
                  onClick={() => open(i)}
                >
                  <span style={{ minWidth: 0 }}>
                    <span className="mg-album-title">{p.title}</span>
                    <span className="mg-album-meta">
                      {p.year} · {p.role}
                    </span>
                  </span>
                  <span className="mg-album-play" aria-hidden="true">
                    ▶
                  </span>
                </button>
                {p.live && p.live !== "#" && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mg-album-ext"
                    aria-label={`Open ${p.title} live site`}
                    title="Open live project"
                  >
                    ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div className="mg-modal-overlay" onClick={close} role="dialog" aria-modal="true">
          <div className="mg-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="mg-modal-close" aria-label="Close" onClick={close}>
              ×
            </button>

            {/* Turntable */}
            <div className="mg-turntable-wrap">
              <div className="mg-turntable">
                <div className="mg-disc-wrap">
                  <div className="mg-disc">
                    <div className="mg-disc-label" style={{ background: sel.color }}>
                      <span>{sel.short || sel.title}</span>
                    </div>
                    <div className="mg-disc-spindle" />
                  </div>
                  <div aria-hidden="true" className="mg-tonearm" />
                </div>
              </div>
            </div>

            {/* Flipping album cover */}
            <div className="mg-flip-wrap">
              <div className="mg-flip-scene">
                <div className={`mg-flip-card${flipped ? " is-flipped" : ""}`}>
                  <div className="mg-flip-front" style={{ background: sel.color }}>
                    <span className="mg-label-brand">Mike Guerrero Records</span>
                    <div>
                      <h3>{sel.title}</h3>
                      <p className="mg-label-year">{sel.year} · LP</p>
                    </div>
                    <button type="button" className="mg-flip-btn" onClick={() => setFlipped(true)}>
                      Read the back →
                    </button>
                  </div>
                  <div className="mg-flip-back">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 10,
                      }}
                    >
                      <span className="mg-back-kicker">Side A</span>
                      <span className="mg-back-year">{sel.year}</span>
                    </div>
                    <h3 className="mg-back-title">{sel.title}</h3>
                    <p className="mg-back-role">{sel.role}</p>
                    <p className="mg-back-blurb">{sel.blurb}</p>
                    <span className="mg-back-kicker" style={{ letterSpacing: "0.16em" }}>
                      Tracklist
                    </span>
                    <ol className="mg-tracklist">
                      {sel.tech.map((t, ti) => (
                        <li key={t}>
                          <span className="mg-track-n">A{ti + 1}</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ol>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {sel.live && sel.live !== "#" && (
                        <a
                          href={sel.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mg-back-link mg-back-link--live"
                        >
                          Live ↗
                        </a>
                      )}
                      {sel.github && (
                        <a
                          href={sel.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mg-back-link mg-back-link--code"
                        >
                          Code ↗
                        </a>
                      )}
                      <button
                        type="button"
                        className="mg-back-link mg-back-link--muted"
                        onClick={() => setFlipped(false)}
                      >
                        ← Cover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sleeve gallery — only when the project has shots */}
            {sel.shots.length > 0 && (
              <div className="mg-gallery">
                <div className="mg-gallery-head">
                  <span className="mg-gallery-label">Sleeve gallery — {sel.title}</span>
                  {sel.shots.length > 1 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button
                        type="button"
                        className="mg-round-btn"
                        aria-label="Previous shot"
                        onClick={() => setGal((g) => Math.max(0, g - 1))}
                      >
                        ←
                      </button>
                      <span className="mg-gallery-count">
                        {gal + 1} / {sel.shots.length}
                      </span>
                      <button
                        type="button"
                        className="mg-round-btn"
                        aria-label="Next shot"
                        onClick={() => setGal((g) => Math.min(sel.shots.length - 1, g + 1))}
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
                <div className="mg-gallery-window">
                  <div
                    className="mg-gallery-track"
                    style={{ transform: `translateX(-${gal * 100}%)` }}
                  >
                    {sel.shots.map((shot, i) => (
                      <div key={shot} className="mg-gallery-slide">
                        <Image
                          src={shot}
                          alt={`${sel.title} shot ${i + 1}`}
                          fill
                          sizes="(max-width: 760px) 100vw, 900px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.25 }} />
                </div>
                {sel.shots.length > 1 && (
                  <div className="mg-gallery-dots">
                    {sel.shots.map((shot, i) => (
                      <button
                        key={shot}
                        type="button"
                        className={`mg-gallery-dot${i === gal ? " is-on" : ""}`}
                        aria-label={`Go to shot ${i + 1}`}
                        onClick={() => setGal(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
