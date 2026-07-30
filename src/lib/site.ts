import type { SectionId } from "./types";

export const SOCIALS = {
  github: "https://github.com/mikxvii",
  linkedin: "https://www.linkedin.com/in/mikxvii/",
  resume: "/mike_resume.pdf",
};

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
    desc: "Who I am, what I care about, and how I got here.",
    cta: "Read on",
    href: "/about",
  },
  {
    id: "experience",
    num: "02",
    kicker: "The Reel",
    title: "Experience",
    desc: "My roles and projects, projected frame by frame.",
    cta: "Roll the film",
    href: "/experience",
  },
  {
    id: "projects",
    num: "03",
    kicker: "The Crate",
    title: "Projects",
    desc: "A crate of work — flip a record to hear its story.",
    cta: "Dig in",
    href: "/projects",
  },
  {
    id: "photography",
    num: "04",
    kicker: "35mm",
    title: "Photography",
    desc: "Film frames from the Bay to the beach.",
    cta: "View strip",
    href: "/photography",
  },
  {
    id: "writings",
    num: "05",
    kicker: "Journal",
    title: "Writings",
    desc: "Notes and entries, kept like a paper journal.",
    cta: "Open the book",
    href: "/writings",
  },
];

export const NAV: { id: SectionId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/" },
  ...SECTION_CARDS.map((c) => ({ id: c.id, label: c.title, href: c.href })),
];
