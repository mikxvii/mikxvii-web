"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The <html data-theme> attribute (set pre-paint by the inline script in the
// root layout) is the single source of truth; this store subscribes to it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function applyTheme(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
  try {
    localStorage.setItem("mg-theme", t);
  } catch {}
}

/** Sun/moon segmented control; persists to localStorage['mg-theme']. */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="mg-theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={theme === "light" ? "is-on" : ""}
        aria-pressed={theme === "light"}
        aria-label="Light theme"
        onClick={() => applyTheme("light")}
      >
        ☀
      </button>
      <button
        type="button"
        className={theme === "dark" ? "is-on" : ""}
        aria-pressed={theme === "dark"}
        aria-label="Dark theme"
        onClick={() => applyTheme("dark")}
      >
        ☾
      </button>
    </div>
  );
}
