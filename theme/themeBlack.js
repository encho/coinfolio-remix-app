const chroma = require("chroma-js");

const withTheme = function (colors) {
  return {
    header: colors.gray["100"],
    background: colors.gray["950"],
    footer: {
      background: colors.gray["950"],
      border: colors.gray["850"],
      text: colors.gray["650"],
    },
    text: colors.gray["100"],
    txt: {
      soft: colors.gray["600"],
      metricUnit: colors.gray["550"],
      superTitle: colors.red["500"],
    },
    divider: colors.gray["800"],
    typography: {
      subTitle: colors.gray["900"],
    },
    link: {
      default: {
        text: colors.blue["500"],
      },
      hover: {
        text: colors.blue["700"],
      },
    },
    badge: {
      neutral: {
        default: {
          text: colors.gray["400"],
          background: colors.gray["850"],
          border: colors.gray["600"],
        },
      },
      primary: {
        default: {
          text: colors.green["500"],
          background: colors.green["900"],
          border: colors.green["700"],
        },
      },
      action: {
        default: {
          text: colors.blue["500"],
          background: colors.blue["900"],
          border: colors.blue["700"],
        },
      },
      danger: {
        default: {
          text: colors.red["500"],
          background: colors.red["900"],
          border: colors.red["700"],
        },
      },
    },
    page: {
      header: colors.gray["100"],
      subHeader: colors.gray["700"],
    },
    tabs: {
      borderBottom: colors.gray["800"],
      default: {
        border: "transparent",
        text: colors.gray["600"],
      },
      hover: {
        border: colors.gray["600"],
        text: colors.gray["600"],
      },
      active: {
        border: colors.gray["300"],
        text: colors.gray["300"],
      },
    },
    button: {
      neutral: {
        default: {
          background: colors.gray["850"],
          border: colors.gray["700"],
          text: colors.gray["200"],
        },
        disabled: {
          background: colors.gray["800"],
          border: colors.gray["750"],
          text: colors.gray["650"],
        },
        hover: {
          background: colors.gray["800"],
          border: colors.gray["600"],
          text: colors.gray["100"],
        },
      },
      primary: {
        default: {
          background: colors.green["500"],
          border: colors.green["600"],
          text: colors.green["900"],
        },
        disabled: {
          background: chroma
            .mix(colors.green["600"], colors.gray["900"], 0.75, "rgb")
            .css(),
          border: colors.green["900"],
          text: chroma
            .mix(colors.green["500"], colors.gray["900"], 0.5, "rgb")
            .css(),
        },
        hover: {
          background: colors.green["400"],
          border: colors.green["500"],
          text: colors.green["900"],
        },
      },
      action: {
        default: {
          background: colors.blue["500"],
          border: colors.blue["700"],
          text: colors.blue["900"],
        },
        disabled: {
          background: chroma
            .mix(colors.blue["500"], colors.gray["900"], 0.8, "rgb")
            .css(),
          border: chroma
            .mix(colors.blue["500"], colors.gray["900"], 0.65, "rgb")
            .css(),
          text: chroma
            .mix(colors.blue["500"], colors.gray["900"], 0.5, "rgb")
            .css(),
        },
        hover: {
          background: colors.blue["400"],
          border: colors.blue["500"],
          text: colors.blue["900"],
        },
      },
      danger: {
        default: {
          background: colors.red["500"],
          border: colors.red["700"],
          text: colors.red["900"],
        },
        disabled: {
          background: chroma
            .mix(colors.red["500"], colors.gray["900"], 0.8, "rgb")
            .css(),
          border: chroma
            .mix(colors.red["500"], colors.gray["900"], 0.65, "rgb")
            .css(),
          text: chroma
            .mix(colors.red["500"], colors.gray["900"], 0.5, "rgb")
            .css(),
        },
        hover: {
          background: colors.red["400"],
          border: colors.red["500"],
          text: colors.red["900"],
        },
      },
    },
    table: {
      header: {
        text: colors.gray["600"],
        background: colors.gray["900"],
      },
      even: {
        background: "transparent",
      },
      odd: {
        background: "transparent",
      },
      text: colors.gray["400"],
      border: colors.gray["850"],
      divide: colors.gray["850"],
    },
    sidebar: {
      logo: colors.gray["100"],
      background: chroma
        .mix(colors.gray["850"], colors.gray["900"], 0.5, "rgb")
        .css(),
      separator: colors.gray["800"],
      link: {
        normal: {
          text: colors.gray["600"],
        },
        active: {
          text: colors.gray["300"],
          background: colors.gray["800"],
          border: colors.gray["200"],
        },
      },
    },
    topbar: {
      background: colors.gray["950"],
      border: colors.gray["700"],
      searchBoxBorder: colors.gray["700"],
    },
    card: {
      header: colors.gray["600"],
      title: colors.gray["500"],
      border: colors.gray["850"],
      background: chroma
        .mix(colors.gray["900"], colors.gray["950"], 0.5, "rgb")
        .css(),
    },
    charts: {
      positive: {
        text: colors.green["500"],
        text_soft: colors.green["600"],
      },
      negative: {
        text: colors.red["500"],
        text_soft: colors.red["600"],
      },
      bar: {
        positive: colors.green["700"],
        negative: colors.red["700"],
        rail: colors.gray["900"],
      },
      grid: colors.gray["850"],
      crosshair: colors.gray["500"],
      crosshairLabel: colors.gray["500"],
      text: colors.gray["500"],
      axis: colors.gray["600"],
      zeroLine: colors.gray["700"],
      candlestick: {
        up: {
          fill: colors.green["500"],
          border: colors.green["500"],
          wick: colors.gray["900"],
        },
        down: {
          fill: colors.red["500"],
          border: colors.red["500"],
          wick: colors.gray["900"],
        },
      },
      data: {
        volume: colors.gray["600"],
        "1of1": colors.blue["600"],
        "1of2": colors.blue["600"],
        "2of2": colors.orange["600"],
      },
    },
    performance: {
      total: colors.gray["100"],
      realized: colors.blue["500"],
      unrealized: colors.purple["500"],
      fees: colors.orange["500"],
      position: colors.orange["500"],
      funding: colors.yellow["500"],
    },
    clock: {
      dial: colors.gray["850"],
      marks: colors.gray["700"],
      hour: colors.gray["200"],
      minute: colors.gray["200"],
      second: colors.orange["600"],
    },
    input: {
      default: {
        placeholder: colors.gray["450"],
        text: colors.gray["350"],
        border: colors.gray["650"],
        background: chroma
          .mix(colors.gray["900"], colors.gray["850"], 0.5, "rgb")
          .css(),
      },
      focus: {
        border: colors.blue["500"],
      },
    },
    alert: {
      info: {
        background: colors.blue["300"],
        text: colors.blue["500"],
      },
      danger: {
        background: colors.red["300"],
        text: colors.red["500"],
      },
    },
  };
};

module.exports = withTheme;
