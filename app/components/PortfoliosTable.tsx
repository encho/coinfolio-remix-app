import { Link } from "@remix-run/react";
import numeral from "numeral";

import type { TPortfolioOverview } from "~/models/portfolio.server";

type TPortfoliosTable = {
  data: Array<TPortfolioOverview>;
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
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900"
                >
                  Risk Level
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-900"
                >
                  Position Value
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-900"
                >
                  Performance
                </th>
                <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((portfolioItem) => (
                <tr key={portfolioItem.name}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {portfolioItem.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    <RiskLevelCell {...portfolioItem.riskLevel} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                    <CurrencyValueCell {...portfolioItem.markToMarketValue} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                    <PerformanceCell
                      {...portfolioItem.performance.monetaryValue}
                    />
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      to={`./portfolios/${portfolioItem.slug}`}
                      prefetch="intent"
                      className="hover:text-neue-link-hover-text text-neue-link-default-text"
                    >
                      Select
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
