"use client";

import { useEffect, useRef } from "react";
import type { ExperienceRole } from "@/lib/types";

/**
 * Dark projection section: each role is a film frame that fades/rises in and
 * flashes like a projector catching the frame (mg-flicker) on first reveal.
 */
export default function Reel({ roles }: { roles: ExperienceRole[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const frames = root.querySelectorAll<HTMLElement>("[data-frame]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    frames.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="mg-reel">
      <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.5 }} />
      <div aria-hidden="true" className="mg-reel-vignette" />
      {roles.map((x, i) => (
        <div key={`${x.role}-${x.date}`} data-frame className="mg-frame">
          <div className="mg-frame-inner">
            <div aria-hidden="true" className="mg-sprocket mg-sprocket--left" />
            <div className="mg-screen">
              <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.4, borderRadius: 2 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 22,
                }}
              >
                <span className="mg-screen-kicker">
                  Reel 02 · Scene {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mg-screen-stamp">{x.stamp}</span>
              </div>
              <h2 className="mg-screen-role">{x.role}</h2>
              <p className="mg-screen-org">
                <strong>{x.org}</strong> · {x.location}
              </p>
              <ul className="mg-screen-points">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {x.tags.map((t) => (
                  <span key={t} className="mg-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div aria-hidden="true" className="mg-sprocket mg-sprocket--right" />
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", padding: "20px 20px 80px", position: "relative" }}>
        <span className="mg-reel-end">— End of reel —</span>
      </div>
    </section>
  );
}
