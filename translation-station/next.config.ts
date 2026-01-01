import type { NextConfig } from "next";

const isMobileBuild = process.env.BUILD_TARGET === "mobile";

const nextConfig: NextConfig = {
  // Enable static export only for mobile/Capacitor builds
  ...(isMobileBuild && { output: "export" }),

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for better compatibility with native apps
  trailingSlash: true,
};

export default nextConfig;
