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
        night: "#040B16",
        navy: "#091529",
        electric: "#2563FF",
        cyan: "#4AE7FF",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(74, 231, 255, 0.08), 0 20px 80px rgba(37, 99, 255, 0.22)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
