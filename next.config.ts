import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["eu-west-2.graphassets.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
