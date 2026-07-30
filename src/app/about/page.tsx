import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ButtonLink, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, what I care about, and how I got here.",
};

const FACTS = [
  { k: "Based in", v: "San Diego, CA" },
  { k: "Role", v: "Aspiring Software Engineer" },
  { k: "Focus", v: "Front-end, full-stack & mobile" },
  { k: "Currently", v: "Building, learning" },
];

const TAGS = ["TypeScript", "Javascript", "React", "React Native", "Next.js", "Node", "Design systems", "35mm film"];

export default function AboutPage() {
  return (
    <div className="mg-page">
      <SiteHeader active="about" />

      <div className="mg-container mg-rise" style={{ maxWidth: 1000, paddingTop: 56, paddingBottom: 40 }}>
        <span className="mg-eyebrow">01 · Profile</span>
        <h1 className="mg-page-h1" style={{ maxWidth: "12ch", marginBottom: 0 }}>
          Nice to meet you.
        </h1>
      </div>

      <div className="mg-container mg-about-grid" style={{ maxWidth: 1000, paddingBottom: 90 }}>
        <aside className="mg-about-aside">
          <div className="mg-portrait">
            <Image
              src="/images/site/mike.jpg"
              alt="Mike Guerrero"
              width={560}
              height={700}
              priority
            />
            <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.3 }} />
            <span className="mg-portrait-stamp">07 · 26</span>
          </div>
          <div className="mg-facts">
            {FACTS.map((f) => (
              <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="mg-fact-k">{f.k}</span>
                <span className="mg-fact-v">{f.v}</span>
              </div>
            ))}
          </div>
        </aside>

        <main style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 640 }}>
          <p className="mg-prose-lead">
            I&rsquo;m Mike — a software engineer from San Diego, fresh out of UC Berkeley,
            who likes building things that feel warm, honest, and a little handmade.
          </p>
          <p className="mg-prose">
            I studied computer science at Berkeley (with a French minor on the side),
            where I led Mobile Developers of Berkeley and spent my time shipping real
            products: admin dashboards and an MVP launch at Circuit, voice features for an
            AI companion used by thousands at Athena AI Ventures, and secure login flows
            for Salamati, an app serving 150k+ Afghan women.
          </p>
          <p className="mg-prose">
            These days I&rsquo;m focused on full-stack and mobile work — TypeScript,
            React and React Native, Next.js, SwiftUI — shipping interfaces that are
            simple to understand and pleasant to sit in. I care a lot about the small
            stuff: the timing of an animation, the weight of a typeface, the feeling you
            get in the first three seconds of a page.
          </p>
          <div className="mg-divider" />
          <h2 className="mg-h2">When I&rsquo;m not at a keyboard</h2>
          <p className="mg-prose">
            You&rsquo;ll find me shooting film around San Diego, digging through record
            crates and vintage shops, deep in a good film or series, or chasing a sunset
            from the Bay to the beach — probably switching between Spanish, French, and
            English along the way. A lot of what I make online is just an attempt to
            bottle a little of that feeling.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            {TAGS.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
            <ButtonLink href="/experience" variant="primary">
              See my experience
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Browse projects
            </ButtonLink>
          </div>
        </main>
      </div>

      <SiteFooter active="about" heading="Keep exploring" />
    </div>
  );
}
