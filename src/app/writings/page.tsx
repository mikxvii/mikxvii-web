import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getWritings } from "@/lib/content";
import Notebook from "./Notebook";

export const metadata: Metadata = {
  title: "Writings",
  description: "Notes and entries, kept like a paper journal.",
};

export default function WritingsPage() {
  const entries = getWritings();

  return (
    <div className="mg-page">
      <SiteHeader active="writings" />

      <section className="mg-container mg-rise" style={{ maxWidth: 1000, paddingTop: 56, paddingBottom: 8 }}>
        <span className="mg-eyebrow">05 · Journal</span>
        <h1 className="mg-page-h1" style={{ marginBottom: 12 }}>
          The notebook
        </h1>
        <p className="mg-page-sub" style={{ maxWidth: 520 }}>
          Raw entries kept like a paper journal. Pick a chapter from the contents and read
          straight through.
        </p>
      </section>

      <section className="mg-container" style={{ maxWidth: 1000, paddingTop: 26, paddingBottom: 96 }}>
        <Notebook entries={entries} />
      </section>

      <SiteFooter active="writings" heading="Keep exploring" />
    </div>
  );
}
