const chroma = require("chroma-js");

const withTheme = function (colors) {
  return {
    page: {
      header: colors.gray["700"],
      subHeader: colors.gray["350"],
    },
    header: colors.gray["900"],
    // background: colors.gray["50"],
    background: colors.white,
    footer: {
      // background: colors.gray["50"],
      background: colors.white,
      border: colors.gray["150"],
      text: colors.gray["350"],
    },
    text: colors.gray["900"],
    txt: {
      soft: colors.gray["350"],
      metricUnit: colors.gray["350"],
      superTitle: colors.gray["450"],
    },
    divider: colors.gray["150"],
    typography: {
      subTitle: colors.gray["400"],
    },
    link: {
      default: {
        text: colors.blue["500"],
      },
    },
    badge: {
      neutral: {
        default: {
          text: colors.gray["700"],
          background: colors.white,
          border: colors.gray["200"],
        },
      },
      primary: {
        default: {
          text: colors.green["800"],
          background: colors.green["200"],
          border: colors.green["300"],
        },
      },
      action: {
        default: {
          text: colors.blue["800"],
          background: colors.blue["200"],
          border: colors.blue["300"],
        },
      },
      danger: {
        default: {
          text: colors.red["800"],
          background: colors.red["200"],
          border: colors.red["300"],
        },
      },
      warning: {
        default: {
          text: colors.yellow["800"],
          background: colors.yellow["200"],
          border: colors.yellow["300"],
        },
      },
    },
    tabs: {
      borderBottom: colors.gray["200"],
      default: {
        border: "transparent",
        text: colors.gray["350"],
      },
      hover: {
        border: colors.gray["500"],
        text: colors.gray["500"],
      },
      active: {
        border: colors.gray["900"],
        text: colors.gray["900"],
      },
    },
    button: {
      neutral: {
        default: {
          background: colors.white,
          border: colors.gray["300"],
          text: colors.gray["850"],
        },
        disabled: {
          background: colors.gray["150"],
          border: colors.gray["200"],
          text: colors.gray["350"],
        },
        hover: {
          background: colors.gray["150"],
          border: colors.gray["250"],
          text: colors.gray["900"],
        },
      },
      action: {
        default: {
          background: colors.blue["400"],
          border: colors.blue["500"],
          text: colors.blue["900"],
        },
        disabled: {
          background: chroma
            .mix(colors.blue["600"], colors.white, 0.75, "rgb")
            .css(),
          border: colors.blue["200"],
          text: chroma.mix(colors.blue["500"], colors.white, 0.1, "rgb").css(),
        },
        hover: {
          background: colors.blue["500"],
          border: colors.blue["600"],
          text: colors.blue["900"],
        },
      },
      primary: {
        default: {
          background: colors.green["400"],
          border: colors.green["500"],
          text: colors.green["900"],
        },
        disabled: {
          background: chroma
            .mix(colors.green["600"], colors.white, 0.75, "rgb")
            .css(),
          border: colors.green["200"],
          text: chroma.mix(colors.green["500"], colors.white, 0.1, "rgb").css(),
        },
        hover: {
          background: colors.green["500"],
          border: colors.green["600"],
          text: colors.green["900"],
        },
      },
      danger: {
        default: {
          background: colors.red["400"],
          border: colors.red["500"],
          text: colors.yellow["900"],
        },
        disabled: {
          background: chroma
            .mix(colors.red["400"], colors.white, 0.6, "rgb")
            .css(),
          border: colors.red["200"],
          text: chroma.mix(colors.red["400"], colors.white, 0.25, "rgb").css(),
        },
        hover: {
          background: colors.red["500"],
          border: colors.red["600"],
          text: colors.red["900"],
        },
      },
    },
    table: {
      header: {
        text: colors.gray["400"],
        background: colors.white,
      },
      odd: {
        background: colors.white,
      },
      even: {
        background: colors.white,
      },
      text: colors.gray["900"],
      border: colors.gray["200"],
      divide: colors.gray["200"],
    },
    login: {
      background: colors.white,
      heading: colors.gray["900"],
      text: colors.gray["800"],
      link: {
        normal: colors.gray["600"],
        hover: colors.gray["700"],
      },
    },
    sidebar: {
      logo: colors.gray["900"],
      // background: colors.white,
      background: colors.gray["50"],
      separator: colors.gray["150"],
      link: {
        normal: {
          text: colors.gray["350"],
        },
        active: {
          text: colors.gray["900"],
          background: colors.gray["100"],
          border: colors.gray["900"],
        },
      },
    },
    topbar: {
      background: colors.white,
      border: colors.gray["200"],
      searchBoxBorder: colors.gray["200"],
    },
    card: {
      header: colors.gray["400"],
      title: colors.gray["500"],
      border: colors.gray["100"],
      background: colors.white,
    },
    charts: {
      bar: {
        positive: colors.green["500"],
        negative: colors.red["500"],
        rail: "transparent",
      },
      grid: colors.gray["150"],
      crosshair: colors.gray["500"],
      crosshairLabel: colors.gray["500"],
      text: colors.gray["400"],
      positive: {
        text: colors.green["500"],
        text_soft: colors.green["600"],
      },
      negative: {
        text: colors.red["500"],
        text_soft: colors.red["600"],
      },
      axis: colors.gray["300"],
      zeroLine: colors.gray["400"],
      legend: {
        text: colors.gray["450"],
      },
      candlestick: {
        up: {
          fill: colors.green["500"],
          border: colors.green["500"],
          // TODO deprecate wick?
          wick: colors.gray["900"],
        },
        down: {
          fill: colors.red["500"],
          border: colors.red["500"],
          wick: colors.gray["900"],
        },
      },
      data: {
        volume: colors.gray["300"],
        "1of1": colors.blue["400"],
        "1of2": colors.blue["400"],
        "2of2": colors.orange["400"],
      },
    },
    performance: {
      total: colors.gray["800"],
      realized: colors.purple["400"],
      unrealized: colors.purple["600"],
      fees: colors.orange["600"],
      position: colors.blue["400"],
      funding: colors.orange["400"],
    },
    clock: {
      dial: colors.white,
      marks: colors.gray["300"],
      hour: colors.gray["700"],
      minute: colors.gray["700"],
      second: colors.orange["500"],
    },
    input: {
      default: {
        placeholder: colors.gray["450"],
        text: colors.gray["550"],
        border: colors.gray["200"],
        background: chroma
          .mix(colors.white, colors.gray["50"], 0.5, "rgb")
          .css(),
      },
      focus: {
        border: colors.blue["500"],
      },
    },
    alert: {
      info: {
        background: colors.blue["200"],
        text: colors.blue["500"],
        border: colors.blue["300"],
      },
      danger: {
        background: colors.red["100"],
        text: colors.red["500"],
        border: colors.red["200"],
      },
    },
  };
};

module.exports = withTheme;
