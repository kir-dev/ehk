import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
