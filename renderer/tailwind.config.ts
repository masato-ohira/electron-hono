import type { Config } from "tailwindcss";
import { fontSize } from "./styles/tailwind/fontSize";
import { classesPlugin } from "./styles/tailwind/classes-plugin";

export default {
  darkMode: ["class"],
  content: {
    files: [
      "./renderer/**/{**,.client,.server}/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}",
    ],
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      screens: {
        xs: "375px",
        nano: { max: "639px" },
        "aspect-v": { raw: "(max-aspect-ratio: 16/9)" },
      },
      fontSize: {
        ...fontSize,
      },
      fontFamily: {
        body: ["Noto Sans JP", "sans-serif"],
        display: ["Roboto", "sans-serif"],
      },
      zIndex: {
        sticky: "80",
        drawer: "90",
        header: "100",
        modal: "200",
        popover: "200",
        three: "300",
      },

      aspectRatio: {
        rect: "4/3",
        silver: "1.414/1",
        gold: "1.618/1",
      },

      spacing: () => ({
        computed: "calc((100% - 1080px) / 2)",
        "computed-wide": "calc((100vw - 1212px) / 2)",
      }),

      backgroundImage: () => ({
        "primary-gradient": "linear-gradient(90deg, #3ea1d4, #1072be)",
        "brand-gradient": "linear-gradient(90deg, #47b6ef, #1072be)",
        "secondary-gradient": "linear-gradient(90deg, #2785b5, #083f6a)",
        "cool-gradient": "linear-gradient(90deg, #40c5d4, #14a2eb)",
      }),
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        cool: {
          DEFAULT: "hsl(var(--cool))",
          foreground: "hsl(var(--cool-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textShadow: {
        xl: "3px 3px 6px rgb(0 0 0 / 40%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-clip-path"),
    require("tailwindcss-easing"),
    require("tailwindcss-textshadow"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/container-queries"),
    classesPlugin,
  ],
} satisfies Config;
