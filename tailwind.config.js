/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/pages/*/*.jsx",
    "./src/components/*/*.jsx",
    "./src/setting/*/*.jsx",
    "./src/setting/*.jsx",
    "./src/App.jsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        "abel-reg": "abel-reg",
        "inter-reg": "inter-reg",
        "inter-sem": "inter-sem",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
