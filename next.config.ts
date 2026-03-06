import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "image.gramedia.net",
      },
      {
        protocol: "https",
        hostname: "cdn.gramedia.com",
      },
      {
        protocol: "https",
        hostname: "otimages.com"
      }
    ],
  },
};

export default nextConfig;