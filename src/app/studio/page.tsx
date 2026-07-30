import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import StudioClient from "./StudioClient";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false },
};

/**
 * Dev-only content admin. Create journal entries, experience roles and
 * projects, and upload photos — everything is written into src/content and
 * public/images for you to review and commit. Not available in production.
 */
export default function StudioPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <div className="mg-page">
      <SiteHeader active="home" />
      <div className="mg-container mg-rise" style={{ maxWidth: 760, paddingTop: 56, paddingBottom: 96 }}>
        <span className="mg-eyebrow">Dev only · not deployed</span>
        <h1 className="mg-page-h1">Studio</h1>
        <p className="mg-page-sub" style={{ marginBottom: 28 }}>
          Add content without touching code. Everything you save here lands in{" "}
          <code>src/content</code> and <code>public/images</code> — review it with git and
          commit when happy.
        </p>
        <StudioClient />
      </div>
    </div>
  );
}
