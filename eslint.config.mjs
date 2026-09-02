import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", "out/**", "coverage/**", "next-env.d.ts"],
  },
  {
    rules: {
      // App Router loads fonts in the root layout; this rule targets pages/_document.
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default config;
