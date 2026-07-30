import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPhotos } from "@/lib/content";
import Filmstrip from "./Filmstrip";

export const metadata: Metadata = {
  title: "Photography",
  description: "Film frames from the Bay to the beach.",
};

export default function PhotographyPage() {
  const photos = getPhotos();

  return (
    <div className="mg-page">
      <SiteHeader active="photography" />

      <Filmstrip photos={photos} />

      <section
        className="mg-container"
        style={{ paddingTop: 40, paddingBottom: 90, textAlign: "center" }}
      >
        <span className="mg-eyebrow" style={{ fontSize: 11 }}>
          Kodak Gold 200 · Canon AE-1 · San Diego
        </span>
      </section>

      <SiteFooter active="photography" heading="Keep exploring" />
    </div>
  );
}
