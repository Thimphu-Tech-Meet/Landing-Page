/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page on this site is pre-rendered from markdown at build time —
  // there is no server-side runtime. Static export emits plain HTML/CSS/JS
  // into /out, so hosts never run the serverless build pipeline
  // (build traces, function creation) at all.
  output: "export",

  images: {
    // The on-the-fly Image Optimization API needs a server, which static
    // export does not have. next/image still provides lazy loading and
    // fixed dimensions (no layout shift); files are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
