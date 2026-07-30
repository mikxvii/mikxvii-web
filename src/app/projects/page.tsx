import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getProjects } from "@/lib/content";
import Crate from "./Crate";

export const metadata: Metadata = {
  title: "Projects",
  description: "A crate of work — flip a record to hear its story.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mg-page">
      <SiteHeader active="projects" />

      <section className="mg-container mg-rise" style={{ paddingTop: 64, paddingBottom: 20 }}>
        <span className="mg-eyebrow">03 · The Crate</span>
        <h1 className="mg-page-h1">Flip through the crate</h1>
        <p className="mg-page-sub">
          Each project is an album. Drop a cover of your own onto the sleeve, then hit
          play to spin it up and read the story printed on the back.
        </p>
      </section>

      <section className="mg-container" style={{ paddingTop: 20, paddingBottom: 96 }}>
        <Crate projects={projects} />
      </section>

      <SiteFooter active="projects" heading="Keep exploring" />
    </div>
  );
}
