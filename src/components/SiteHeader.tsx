import Link from "next/link";
import type { SectionId } from "@/lib/types";
import { NAV } from "@/lib/site";
import { Monogram } from "./ui";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader({ active }: { active: SectionId }) {
  return (
    <header className="mg-header">
      <Link href="/" className="mg-brand">
        <Monogram size={36} />
        <span className="mg-brand-name">Mike Guerrero</span>
      </Link>
      <div className="mg-nav">
        <nav className="mg-nav-links" aria-label="Sections">
          {NAV.filter((n) => n.id !== "home").map((n) => (
            <Link
              key={n.id}
              href={n.href}
              className={`mg-navlink${n.id === active ? " is-active" : ""}`}
              aria-current={n.id === active ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
