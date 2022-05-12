const colors = require("tailwindcss/colors");
const withTheme = require("./theme/withTheme");

const themeColors = withTheme({
  ...colors,
  transparent: "transparent",
  current: "currentColor",
  green: colors.emerald,
  yellow: colors.amber,
  purple: colors.violet,
});

console.log(themeColors);

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
    colors: themeColors,
  },
  plugins: [],
};
