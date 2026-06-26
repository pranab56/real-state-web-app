import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Strict Mode double-invokes effects in dev, which disconnects/reconnects
  // framer-motion's whileInView IntersectionObservers and replays scroll
  // animations on first load. Disabled so animations only play once.
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: ['10.10.7.37', '192.168.1.202'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },

       {
        protocol: 'https',
        hostname: 'api.zilahomes.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mamp.one',
      },
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'api.oriencorapiddelivery.com',
      },

      {
        protocol: 'http',
        hostname: '10.10.26.206',
      },
    ],
  },
};

export default nextConfig;
