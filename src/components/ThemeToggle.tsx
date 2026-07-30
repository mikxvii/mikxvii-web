"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
  try {
    localStorage.setItem("mg-theme", t);
  } catch {}
}

/** Sun/moon segmented control; persists to localStorage['mg-theme']. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const set = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  return (
    <div className="mg-theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={theme === "light" ? "is-on" : ""}
        aria-pressed={theme === "light"}
        aria-label="Light theme"
        onClick={() => set("light")}
      >
        ☀
      </button>
      <button
        type="button"
        className={theme === "dark" ? "is-on" : ""}
        aria-pressed={theme === "dark"}
        aria-label="Dark theme"
        onClick={() => set("dark")}
      >
        ☾
      </button>
    </div>
  );
}
