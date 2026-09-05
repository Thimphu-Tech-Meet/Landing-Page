import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // Scan markdown too so contributors' inline HTML classes are never purged.
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
