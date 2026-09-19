import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "https://europebridge.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
