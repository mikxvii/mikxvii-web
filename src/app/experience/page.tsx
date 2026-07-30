import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getExperience } from "@/lib/content";
import Reel from "./Reel";

export const metadata: Metadata = {
  title: "Experience",
  description: "My roles and projects, projected frame by frame.",
};

export default function ExperiencePage() {
  const roles = getExperience();

  return (
    <div className="mg-page">
      <SiteHeader active="experience" />

      <section
        className="mg-container mg-rise"
        style={{ maxWidth: 900, paddingTop: 64, paddingBottom: 30, textAlign: "center" }}
      >
        <span className="mg-eyebrow">02 · The Reel</span>
        <h1 className="mg-page-h1">Experience, projected</h1>
        <p className="mg-page-sub" style={{ maxWidth: 520, margin: "0 auto" }}>
          Every role is a scene. Scroll to roll the film — each one lights up on the
          screen as it passes the projector.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginTop: 24,
            color: "var(--text-faint)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
          }}
        >
          <span>SCROLL</span>
          <span style={{ fontSize: 18, animation: "mg-bounce 1.6s ease-in-out infinite" }}>
            ↓
          </span>
        </div>
      </section>

      <Reel roles={roles} />

      <SiteFooter active="experience" heading="Keep exploring" />
    </div>
  );
}
