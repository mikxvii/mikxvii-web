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

const TAGS = [
  "TypeScript",
  "React",
  "React Three Fiber",
  "Vite",
  "Node",
  "Python",
  "Azure",
  "Linux",
  "AI agents",
  "3D generation",
  "35mm film",
  "French cinema",
  "Vinyl",
  "Translation",
];

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
              src="/images/site/IMG_0435.jpg"
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
          <div
            className="mg-facts"
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <span className="mg-cal-logo" role="img" aria-label="Cal — UC Berkeley" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span className="mg-fact-v">UC Berkeley</span>
              <span className="mg-fact-k">B.A. Computer Science Minor in French &rsquo;26</span>
            </div>
          </div>
        </aside>

        <main style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 640 }}>
          <p className="mg-prose-lead">
            My name is Mike, software engineer based in San Diego, UC
            Berkeley alumnus.
          </p>
          <p className="mg-prose">
            I graduated from the University of California, Berkeley with a B.A. in Computer Science (and French minor on the side),
            where I was President of the Mobile Developers of Berkeley. I spent my time with MDB shipping real
            products: managed the deployment of Circuit Speed Dating&rsquo;s MVP, voice features for an
            AI companion used by thousands at Athena AI Ventures, secure login flows
            for Salamati, an app serving 150k+ Afghan women, etc.
          </p>
          <p className="mg-prose">
            Recently I&rsquo;ve been focused on full-stack development — TypeScript,
            React, Vite, Claude Code — shipping interfaces that are
            simple to understand and satisfying to use. I have an eye for noticing the little
            things: the timing of an animation, the weight of a typeface, the feeling that landing on a page produces.
          </p>
          <div className="mg-divider" />
          <h2 className="mg-h2">When I&rsquo;m AFK...</h2>
          <p className="mg-prose">
            You can find me shooting film on my point and shoot, digging through record
            stores and vintage shops, trying out new matcha flavors and exploring new films or shows. Whether I&rsquo;m chasing a sunset
            from Diego to the Bay, switching between English, Spanish, and
            French along the way, a lot of what I leave behind online is just my way of
            bottling how I&rsquo;m feeling now.
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
