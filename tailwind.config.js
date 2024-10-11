/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1 : "#0D0D0D",
primary2 : "#808080",
primary3 : "#8D9091",
primary4 : "#44A2FF",
primary5 : "#1E90FF",
primary6 : "#24292E",
primary7 : "#CCCCCC",
primary8 : "#292D32",
primary9 : "#191919",
primary10 : "#FAFAFA",
primary11 : "#D2E9FF",
      },
    },
  },
  plugins: [],
};
