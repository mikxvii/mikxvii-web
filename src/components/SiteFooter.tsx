import Link from "next/link";
import type { SectionId } from "@/lib/types";
import { NAV, SECTION_CARDS, SOCIALS } from "@/lib/site";
import { Monogram, SocialLink } from "./ui";
import ResumeMenu from "./ResumeMenu";

/** Explore cards + site footer, rendered at the bottom of every page. */
export default function SiteFooter({
  active,
  heading = "Explore",
}: {
  active: SectionId;
  heading?: string;
}) {
  return (
    <div>
      <section className="mg-container" style={{ paddingTop: 26, paddingBottom: 84 }}>
        <div className="mg-cards-head">
          <span className="mg-eyebrow">{heading}</span>
          <div className="mg-cards-rule" />
        </div>
        <div className="mg-cards">
          {SECTION_CARDS.map((c) => (
            <Link key={c.id} href={c.href} className="mg-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="mg-card-kicker">{c.kicker}</span>
                <span className="mg-card-num">{c.num}</span>
              </div>
              <h3 className="mg-card-title">{c.title}</h3>
              <p className="mg-card-desc">{c.desc}</p>
              {c.id === active ? (
                <span className="mg-card-here">• You&rsquo;re here</span>
              ) : (
                <span className="mg-card-cta">{c.cta} →</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      <footer className="mg-footer">
        <div className="mg-footer-grid">
          <div className="mg-footer-col" style={{ gap: 16, minWidth: 220 }}>
            <Link href="/" className="mg-brand">
              <Monogram size={38} />
              <span className="mg-brand-name" style={{ fontSize: 22 }}>
                Mike Guerrero
              </span>
            </Link>
            <p className="mg-footer-blurb">
              An aspiring software engineer in San Diego <br></br> Developing impactful solutions, one
            frame at a time.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 4 }}>
              <SocialLink href={SOCIALS.github} icon="/github.svg">
                GitHub
              </SocialLink>
              <SocialLink href={SOCIALS.linkedin} icon="/linkedin.svg">
                LinkedIn
              </SocialLink>
              <ResumeMenu variant="social" />
            </div>
          </div>
          <div className="mg-footer-col">
            <span className="mg-footer-head">Sections</span>
            {NAV.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className={`mg-footer-link${n.id === active ? " is-active" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className="mg-footer-col">
            <span className="mg-footer-head">Elsewhere</span>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mg-footer-link"
            >
              GitHub ↗
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mg-footer-link"
            >
              LinkedIn ↗
            </a>
            <ResumeMenu variant="link" />
          </div>
        </div>
        <div className="mg-footer-bottom">
          <div className="mg-footer-bottom-inner">
            <span>© 2026 Mike Guerrero</span>
            <span>Shot on 35mm · Made in San Diego</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
