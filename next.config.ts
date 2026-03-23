import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.10.7.37'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
