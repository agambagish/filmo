import type { NextConfig } from "next";

import "./src/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ibb.co",
      },
    ],
  },
};

export default nextConfig;
