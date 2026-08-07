export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "photography"
  | "writings";

export interface ExperienceRole {
  /** ISO-ish sort key, e.g. "2025-06" — newest first on the page */
  date: string;
  /** Display stamp, e.g. "06 · 25" (derived from date when omitted) */
  stamp?: string;
  role: string;
  org: string;
  /** Optional external link for the organization */
  url?: string;
  location: string;
  points: string[];
  tags: string[];
}

export interface ProjectData {
  /** Folder name under public/images/projects/<slug>/ for cover + shots */
  slug: string;
  title: string;
  /** Short name printed on the spinning record label (defaults to title) */
  short?: string;
  year: string;
  role: string;
  /** Record-label color — one of the signature raw hues */
  color: string;
  blurb: string;
  tech: string[];
  live?: string;
  github?: string;
}

export interface Project extends ProjectData {
  /** Resolved from public/images/projects/<slug>/cover.* (null → placeholder) */
  cover: string | null;
  /** Resolved from public/images/projects/<slug>/shot-*.* */
  shots: string[];
}

export interface PhotoData {
  /** File name inside public/images/photos/ */
  file: string;
  caption: string;
  place: string;
  /** Display date stamp, e.g. "07 · 25" */
  date: string;
}

export interface Photo extends PhotoData {
  src: string;
  /** Frame number, e.g. "01" */
  no: string;
  /** Read at build time — sizes the lightbox border to hug the photo exactly */
  width: number;
  height: number;
}

export interface WritingEntry {
  slug: string;
  title: string;
  /** ISO date used for sorting, e.g. "2026-07-12" */
  date: string;
  /** Display date, e.g. "07 · 2026" */
  dateLabel: string;
  paragraphs: string[];
}
