import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "pastel",
      {
        cupcakeDark: {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ...require("daisyui/src/theming/themes")["cupcake"], 
          "neutral": "#282a36",
          "base-100": "#1e1e2e", 
          "base-content": "#ffffff", 
        },
      },
    ],
  },
} satisfies Config;
