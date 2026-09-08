import type { NextConfig } from "next";
const preview = process.env.SITES_STATIC_PREVIEW === "1";
const nextConfig: NextConfig = preview ? {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // The static review has no server middleware. Normal dev/build retains proxy.ts.
  pageExtensions: ["tsx"],
  env: { NEXT_PUBLIC_SITE_PREVIEW: "1" },
} : {};
export default nextConfig;

