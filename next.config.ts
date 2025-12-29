import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elecsud-energies.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
