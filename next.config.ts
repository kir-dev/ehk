import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@": "./src",
      "@payload-config": "./src/payload.config.ts",
    },
  },
};

export default withPayload(nextConfig);
