import Link from "next/link";
import Image from "next/image";

/** "M" set in the display serif on a terracotta disc — type, not an image. */
export function Monogram({ size = 36 }: { size?: number }) {
  return (
    <span
      className="mg-monogram"
      style={{ width: size, height: size, fontSize: size * 0.55 }}
      aria-hidden="true"
    >
      M
    </span>
  );
}

/** Glowing ember mono date-stamp label. */
export function MonoStamp({
  children,
  size = 13,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <span className="mg-stamp" style={{ fontSize: size }}>
      {children}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="mg-tag">{children}</span>;
}

/** Icon + label external link. */
export function SocialLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="mg-social">
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny local svg marks */}
      <img src={icon} alt="" />
      {children}
    </a>
  );
}

/** Round portrait with optional accent ring. */
export function Avatar({
  src,
  alt,
  size = 150,
  ring = false,
  priority = false,
}: {
  src: string;
  alt: string;
  size?: number;
  ring?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={`mg-avatar${ring ? " mg-avatar--ring" : ""}`}
      style={{ width: size, height: size }}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`mg-btn mg-btn--${variant}`}>
      {children}
    </Link>
  );
}
