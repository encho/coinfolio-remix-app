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
}
