import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The studio API route is dev-only (404s in production) but its fs calls
  // make Next's file tracer bundle the whole photo library and content dir
  // into the serverless function. Exclude them to keep the function tiny.
  outputFileTracingExcludes: {
    "/api/studio": ["./public/**", "./src/content/**"],
  },
};

export default nextConfig;
