import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import newsRedirects from "./src/lib/legacy-news-redirects.json";
import { EXACT, PREFIX, prefixToNextSource } from "./src/lib/legacy-redirects";

const mediaEndpoint = process.env.S3_ENDPOINT
  ? new URL(process.env.S3_ENDPOINT)
  : null;

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: mediaEndpoint
      ? [
          {
            protocol: mediaEndpoint.protocol.slice(0, -1) as "http" | "https",
            hostname: mediaEndpoint.hostname,
            port: mediaEndpoint.port,
            pathname: "/**",
          },
        ]
      : [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    const exact = Object.entries(EXACT).map(([source, destination]) => ({ source, destination, permanent: true }));
    const prefix = PREFIX.map(([p, destination]) => ({ source: prefixToNextSource(p), destination, permanent: true }));
    return [...exact, ...prefix, ...newsRedirects];
  },
  turbopack: {
    resolveAlias: {
      "@": "./src",
      "@payload-config": "./src/payload.config.ts",
    },
  },
};

export default withPayload(nextConfig);
