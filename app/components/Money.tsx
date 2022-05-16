import numeral from "numeral";

type TMonetaryValue = {
  amount: number;
  currency: "EUR";
};

// TODO component for available small cash badge (e.g. like scalable broker)
export function MonetaryValueSmall({ amount, currency }: TMonetaryValue) {
  const formattedAmount = numeral(amount).format("0,0.00");
  const currencySymbols = {
    EUR: "€",
  };

  const currencySymbol = currencySymbols[currency];

  return (
    <div className="text-normal inline-block">
      {formattedAmount} {currencySymbol}
    </div>
  );
}

export function MonetaryValueLarge({ amount, currency }: TMonetaryValue) {
  const formattedAmount = numeral(amount).format("0,0.00");
  const currencySymbols = {
    EUR: "€",
  };

  const currencySymbol = currencySymbols[currency];

  return (
    <div className="mt-0 text-5xl font-bold leading-none">
      {formattedAmount} {currencySymbol}
    </div>
  );

  //     <h3 className={"#{colors} #{typography} #{margins} #{class}"}>
  // <div className={"flex #{unit_flex_gap}"}>
  //   <span className={"#{unit_font_size} self-end text-neue-txt-metricUnit dark:text-neuedark-txt-metricUnit font-light"}><%= if unit == nil, do: "", else: unit %></span>
  //   <div className={"flex #{number_flex_gap}"}>
  //     <div className="">
  //       <%= whole_number_string %>
  //     </div>
  //     <div className={"#{decimal_number_font_size} font-medium"}>
  //       .<%= decimal_number_string %>
  //     </div>
  //   </div>
  // </div>
  // </h3>
}
