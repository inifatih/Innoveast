import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["pdblqyhehxanszwbsevv.supabase.co"],
  },
  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
