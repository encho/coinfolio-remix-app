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

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      keyframes: {
        newStrategy: {
          "0%": {
            borderColor: "var(--color-yellow-500)",
            backgroundColor: "var(--color-yellow-200)",
          },
          "40%": {
            borderColor: "var(--color-yellow-300)",
            backgroundColor: "var(--color-yellow-100)",
          },
          "100%": {
            borderColor: "var(--color-gray-200)",
            backgroundColor: "var(--color-white)",
          },
        },
      },
      animation: {
        newStrategy: "newStrategy 5s ease-out",
      },
    },
    colors: themeColors,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
  },
  plugins: [
    require("@tailwindcss/forms"),

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
