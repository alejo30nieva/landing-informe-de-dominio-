import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          950: "#0B1F3A",
          900: "#0E2A52",
          800: "#0E38B0",
          700: "#1246D6",
          600: "#1F56E2",
          500: "#3B73EE",
          100: "#E8EFFE",
          50: "#F2F6FF",
        },
        ink: {
          900: "#0B1220",
          700: "#1F2937",
          500: "#6B7280",
          300: "#D1D5DB",
          100: "#F5F7FA",
        },
        success: {
          DEFAULT: "#16A34A",
          50: "#ECFDF5",
        },
        warning: { DEFAULT: "#F59E0B" },
        danger: { DEFAULT: "#DC2626" },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,58,0.04), 0 8px 24px rgba(11,31,58,0.08)",
        elevate: "0 4px 12px rgba(11,31,58,0.06), 0 20px 60px rgba(11,31,58,0.12)",
        soft: "0 1px 0 rgba(11,31,58,0.06), 0 1px 2px rgba(11,31,58,0.04)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
