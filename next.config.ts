import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page imports from lib/content.ts, which also defines the
  // fs.readdirSync calls used for photos/project images. Next's file tracer
  // conservatively bundles the whole public/images library (300+ MB) into
  // *every* route's serverless function, even though all pages here are
  // fully static and never touch the filesystem at request time — only at
  // build time, when prerendering. Exclude both from every function.
  outputFileTracingExcludes: {
    "**": ["./public/**", "./src/content/**"],
  },
};

export default nextConfig;
