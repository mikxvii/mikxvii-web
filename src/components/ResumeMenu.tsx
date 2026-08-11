"use client";

import { useEffect, useRef, useState } from "react";
import { RESUMES } from "@/lib/site";

/**
 * Dropdown trigger for the résumé link — swap `variant` to match wherever
 * it's placed: "social" mirrors SocialLink's icon+label look (hero, footer
 * brand column), "link" mirrors the plain footer nav link style.
 */
export default function ResumeMenu({
  variant = "social",
}: {
  variant?: "social" | "link";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mg-resume-menu" ref={rootRef}>
      <button
        type="button"
        className={variant === "social" ? "mg-social mg-resume-trigger" : "mg-footer-link mg-resume-trigger"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {variant === "social" && (
          // eslint-disable-next-line @next/next/no-img-element -- tiny local svg mark
          <img src="/file.svg" alt="" />
        )}
        Résumé{variant === "link" ? " ↗" : ""}
        <span className={`mg-resume-caret${open ? " is-open" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <div className="mg-resume-panel" role="menu">
          {RESUMES.map((r) => (
            <a
              key={r.id}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="mg-resume-item"
              onClick={() => setOpen(false)}
            >
              {r.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
