import { Link } from "@remix-run/react";
import numeral from "numeral";

// TODO export from better, more generic file

type TCurrencyValue = {
  currency: "EUR";
  amount: number;
};

export type TPortfolioInfo = {
  name: string;
  value: TCurrencyValue;
  performance: TCurrencyValue;
  riskLevel: {
    name: string;
    metric: "VaR";
    value: number;
  };
  slug: string;
};

type TPortfoliosTable = {
  data: Array<TPortfolioInfo>;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PortfoliosTable({ data }: TPortfoliosTable) {
  return (
    <div className="-mx-4 mt-0 ring-1 ring-gray-200 sm:-mx-6 md:mx-0 md:rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Portfolio
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Risk Level
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Value
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Performance
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Select</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((portfolioItem, portfolioItemIdx) => (
            <tr key={portfolioItem.name}>
              <td
                className={classNames(
                  portfolioItemIdx === 0 ? "" : "border-t border-transparent",
                  "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                )}
              >
                <div className="font-medium text-gray-900">
                  {portfolioItem.name}
                </div>
                <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                  <span>hello</span>
                  <span className="hidden sm:inline"> · </span>
                  <span>hello</span>
                </div>
                {portfolioItemIdx !== 0 ? (
                  <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                ) : null}
              </td>
              <td
                className={classNames(
                  portfolioItemIdx === 0 ? "" : "border-t border-gray-200",
                  "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                )}
              >
                <RiskLevelCell {...portfolioItem.riskLevel} />
              </td>
              <td
                className={classNames(
                  portfolioItemIdx === 0 ? "" : "border-t border-gray-200",
                  "hidden px-3 py-3.5 text-right text-sm text-gray-500 lg:table-cell"
                )}
              >
                <CurrencyValueCell {...portfolioItem.value} />
              </td>
              <td
                className={classNames(
                  portfolioItemIdx === 0 ? "" : "border-t border-gray-200",
                  "hidden px-3 py-3.5 text-right text-sm text-gray-500 lg:table-cell"
                )}
              >
                <PerformanceCell {...portfolioItem.performance} />
              </td>
              <td
                className={classNames(
                  portfolioItemIdx === 0 ? "" : "border-t border-transparent",
                  "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                )}
              >
                <Link
                  to={`./portfolios/${portfolioItem.slug}`}
                  prefetch="intent"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Select
                </Link>

                {portfolioItemIdx !== 0 ? (
                  <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
