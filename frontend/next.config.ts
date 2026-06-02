import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Reduce dev-server memory footprint */
  devIndicators: false,
  productionBrowserSourceMaps: false,
  images: {
    /* Allow Next Image optimisation for local assets */
    unoptimized: false,
  },
};

export default nextConfig;
