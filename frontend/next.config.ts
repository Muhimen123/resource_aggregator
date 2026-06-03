import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Reduce dev-server memory footprint */
  devIndicators: false,
  productionBrowserSourceMaps: false,
  images: {
    /* Allow Next Image optimisation for local assets */
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/v1/api/:path*',
      },
    ];
  },
};

export default nextConfig;
