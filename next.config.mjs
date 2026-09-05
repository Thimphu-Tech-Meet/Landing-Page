/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow next/image to optimize remote images referenced in contributed
  // markdown posts. Local images placed in /public need no configuration.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
