import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#071220",
          800: "#0B192C",
          700: "#132A46",
          600: "#1E3E62",
          500: "#2B588B",
          100: "#E6EFF9",
          50: "#F3F7FC",
        },
        healing: {
          700: "#047857",
          600: "#059669",
          500: "#10B981",
          400: "#34D399",
          100: "#D1FAE5",
          50: "#ECFDF5",
        },
        urgent: {
          700: "#BE123C",
          600: "#E11D48",
          500: "#F43F5E",
          100: "#FFE4E6",
          50: "#FFF1F2",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(11, 25, 44, 0.08)",
        "glass-elevated": "0 20px 45px -10px rgba(11, 25, 44, 0.14)",
        glow: "0 0 25px -5px rgba(16, 185, 129, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
