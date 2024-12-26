import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["eu-west-2.graphassets.com"],
  },
};

export default nextConfig;
