import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const mediaEndpoint = process.env.S3_ENDPOINT
  ? new URL(process.env.S3_ENDPOINT)
  : null;

const nextConfig: NextConfig = {
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
  turbopack: {
    resolveAlias: {
      "@": "./src",
      "@payload-config": "./src/payload.config.ts",
    },
  },
};

export default withPayload(nextConfig);
