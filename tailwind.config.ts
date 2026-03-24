import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#030a14",
        navy: "#070f1c",
        electric: "#2563FF",
        cyan: "#4AE7FF",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(74, 231, 255, 0.06), 0 8px 40px -8px rgba(37, 99, 255, 0.15)",
        "glow-lg":
          "0 0 0 1px rgba(74, 231, 255, 0.08), 0 20px 80px -16px rgba(37, 99, 255, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
