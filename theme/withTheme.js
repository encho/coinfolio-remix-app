const chroma = require("chroma-js");
const colors = require("tailwindcss/colors");
const withWhiteColors = require("./themeWhite");
const withDarkColors = require("./themeBlack");

let gray = colors.zinc; // gray;
// let gray = colors.stone; // warmGray;
// let gray = colors.neutral; // trueGray;
// let gray = colors.gray; // coolGray;
// let gray = colors.slate; // blueGray;

gray = {
  ...gray,
  50: chroma.average([colors.white, gray["100"]]).css(),
  150: chroma.average([gray["100"], gray["200"]]).css(),
  250: chroma.average([gray["200"], gray["300"]]).css(),
  350: chroma.average([gray["300"], gray["400"]]).css(),
  450: chroma.average([gray["400"], gray["500"]]).css(),
  550: chroma.average([gray["500"], gray["600"]]).css(),
  650: chroma.average([gray["600"], gray["700"]]).css(),
  750: chroma.average([gray["700"], gray["800"]]).css(),
  850: chroma.average([gray["800"], gray["900"]]).css(),
  950: chroma.average([gray["900"], colors.black]).css(),
};

const withTheme = function (defaultColors) {
  const colors = { ...defaultColors, gray };

  const whiteThemeColors = withWhiteColors(colors);
  const darkThemeColors = withDarkColors(colors);

  return {
    ...colors,
    neue: whiteThemeColors,
    neuedark: darkThemeColors,
  };
};

module.exports = withTheme;
