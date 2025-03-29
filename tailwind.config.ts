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
         brand: "#1c70f0"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "lofi"
    ],
  },
} satisfies Config;
