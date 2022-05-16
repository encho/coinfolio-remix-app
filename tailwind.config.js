const colors = require("tailwindcss/colors");
const withTheme = require("./theme/withTheme");
const { fontFamily, fontWeight } = require("./theme/typography");

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
    fontFamily: fontFamily,
    fontWeight: fontWeight,
  },
  plugins: [
    // Export Tailwind Colors as CSS Custom Properties
    // adapted from: https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574
    // just to add some clarity to this otherwise amazing snippet, the colors
    // are exposed as var(--color-color_name-intensity)
    // for example : var(--color-secondary-900)
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `${colorGroup}-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
