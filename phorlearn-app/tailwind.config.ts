import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D0F1A",
        ink2: "#2D3150",
        muted: "#6B7280",
        faint: "#F4F5F9",
        line: "#E4E6EF",
        brand: {
          DEFAULT: "#1B4FD8",
          mid: "#3B6EF5",
          lt: "#EEF2FF",
        },
        gold: {
          DEFAULT: "#D4A017",
          lt: "#FFF8E1",
        },
        success: {
          DEFAULT: "#16A34A",
          lt: "#F0FDF4",
        },
        danger: {
          DEFAULT: "#DC2626",
          lt: "#FEF2F2",
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(13,15,26,0.08)",
        lg: "0 8px 40px rgba(13,15,26,0.14)",
      },
      borderRadius: {
        xl: "14px",
      },
      keyframes: {
        up: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        up: "up 0.3s ease",
      },
    },
  },
  plugins: [],
};

export default config;
