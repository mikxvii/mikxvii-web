import type { SectionId } from "./types";

export const SOCIALS = {
  github: "https://github.com/mikxvii",
  linkedin: "https://www.linkedin.com/in/mikxvii/",
};

export interface ResumeOption {
  id: "swe" | "it" | "general";
  label: string;
  href: string;
}

export const RESUMES: ResumeOption[] = [
  { id: "swe", label: "SWE Résumé", href: "/resume_swe.pdf" },
  { id: "it", label: "IT Résumé", href: "/resume_it.pdf" },
  { id: "general", label: "General Résumé", href: "/resume_general.pdf" },
];

export interface SectionCard {
  id: Exclude<SectionId, "home">;
  num: string;
  kicker: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

export const SECTION_CARDS: SectionCard[] = [
  {
    id: "about",
    num: "01",
    kicker: "Profile",
    title: "About",
    desc: "Who I am, and what I care about.",
    cta: "Read on",
    href: "/about",
  },
  {
    id: "experience",
    num: "02",
    kicker: "The Reel",
    title: "Experience",
    desc: "My roles, projected frame by frame.",
    cta: "Roll the film",
    href: "/experience",
  },
  {
    id: "projects",
    num: "03",
    kicker: "The Crate",
    title: "Projects",
    desc: "A crate of work, in live code",
    cta: "Dig in",
    href: "/projects",
  },
  {
    id: "photography",
    num: "04",
    kicker: "35mm",
    title: "Photography",
    desc: "The world through 35mm lenses - my way.",
    cta: "View strip",
    href: "/photography",
  },
  {
    id: "writings",
    num: "05",
    kicker: "Journal",
    title: "Writings",
    desc: "Reflections and thoughts, materialized",
    cta: "Flip through them",
    href: "/writings",
  },
];

export const NAV: { id: SectionId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/" },
  ...SECTION_CARDS.map((c) => ({ id: c.id, label: c.title, href: c.href })),
];
