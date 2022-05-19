import { Link } from "@remix-run/react";
import numeral from "numeral";

import type { TPortfolio } from "~/models/portfolio.server";

type TPortfoliosTable = {
  data: Array<TPortfolio>;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TRiskLevelCell = {
  name: string;
  value: number;
  metric: "VaR";
};

function RiskLevelCell({ name, value, metric }: TRiskLevelCell) {
  const formattedValue = numeral(value).format("0%");
  return (
    <div>
      {name} ({formattedValue} {metric})
    </div>
  );
}

type TCurrencyValueCell = {
  amount: number;
  currency: "EUR";
};

function CurrencyValueCell({ amount, currency }: TCurrencyValueCell) {
  const formattedAmount = numeral(amount).format("0,0.00");
  const currencySymbols = {
    EUR: "€",
  };

  const currencySymbol = currencySymbols[currency];

  return (
    <div>
      {formattedAmount} {currencySymbol}
    </div>
  );
}

type TPerformanceCell = {
  amount: number;
  currency: "EUR";
};

function PerformanceCell({ amount, currency }: TPerformanceCell) {
  const formattedAbsoluteAmount = numeral(Math.abs(amount)).format("0,0.00");
  const currencySymbols = {
    EUR: "€",
  };

  const currencySymbol = currencySymbols[currency];

  const sign = amount === 0 ? "" : amount < 0 ? "-" : "+";

  return (
    <div>
      {sign}
      {formattedAbsoluteAmount} {currencySymbol}
    </div>
  );
}

export default function PortfoliosTable({ data }: TPortfoliosTable) {
  return (
    <div className="bg-orange-400">
      {data.map((portfolioItem) => (
        <div className="m-2 bg-orange-600 p-2">
          <div>{portfolioItem.strategyId}</div>
          <div>{portfolioItem.riskLevelId}</div>

          <Link
            to={`./portfolios/${portfolioItem.strategyId}`}
            prefetch="intent"
            className="hover:text-neue-link-hover-text text-neue-link-default-text"
          >
            Select
          </Link>
        </div>
      ))}
    </div>
  );
}
