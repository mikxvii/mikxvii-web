import type { Metadata } from "next";
import { DM_Serif_Display, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const display = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mike Guerrero",
    template: "%s · Mike Guerrero",
  },
  description:
    "Aspiring software engineer in San Diego — building thoughtful things, one frame at a time.",
};

// Applies the persisted theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('mg-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
