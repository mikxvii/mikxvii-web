import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ResumeMenu from "@/components/ResumeMenu";
import { Avatar, SocialLink } from "@/components/ui";
import { SOCIALS } from "@/lib/site";

export default function Home() {
  return (
    <div className="mg-page">
      <SiteHeader active="home" />

      <section className="mg-hero">
        <div
          aria-hidden="true"
          className="mg-hero-photo"
          style={{ backgroundImage: "url(/images/site/IMG_0434.JPG)" }}
        />
        <div aria-hidden="true" className="mg-hero-ramp" />
        <div aria-hidden="true" className="mg-hero-radial" />
        <div aria-hidden="true" className="mg-grain" style={{ opacity: 0.35 }} />
        <div className="mg-hero-inner">
          <Avatar src="/images/site/IMG_9782.JPG" alt="Mike Guerrero" size={300} ring priority />
          <h1 className="mg-hero-h1">
            Welcome, I&rsquo;m
            <br />
            <span style={{ color: "var(--primary)" }}>Mike Guerrero</span>
          </h1>
          <p className="mg-hero-sub">
            An aspiring software engineer in San Diego <br></br> Developing impactful solutions, one
            frame at a time. Grab some coffee, and take a look.
          </p>
          <div
            style={{
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 6,
            }}
          >
            <SocialLink href={SOCIALS.github} icon="/github.svg">
              GitHub
            </SocialLink>
            <SocialLink href={SOCIALS.linkedin} icon="/linkedin.svg">
              LinkedIn
            </SocialLink>
            <ResumeMenu variant="social" />
          </div>
        </div>
      </section>

      <SiteFooter active="home" heading="Explore" />
    </div>
  );
}
