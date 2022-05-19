import { Link } from "@remix-run/react";
// import numeral from "numeral";

import type { TPortfolio } from "~/models/portfolio.server";

type TPortfoliosCards = {
  data: Array<TPortfolio>;
};

export default function PortfoliosCards({ data }: TPortfoliosCards) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {data.map((portfolioItem) => (
        <div
          key={portfolioItem.strategyId}
          className="relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
        >
          <div className="min-w-0 flex-1">
            <Link
              to={`./portfolios/${portfolioItem.strategyId}`}
              prefetch="intent"
              className="focus:outline-none"
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="mb-1 text-base font-bold text-gray-900">
                    {portfolioItem.strategyId}
                  </p>
                  <p className="text-sm text-gray-900">
                    {portfolioItem.riskLevelId}
                  </p>
                </div>
                <div>
                  {/* <div className="h-16 w-full bg-gray-50">
                <SparklineChart data={performanceSeries} />
              </div> */}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
      <AddNewPortfolioTile />
    </div>
  );
}

function AddNewPortfolioTile() {
  return (
    <div
      key="add-card"
      className="relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
    >
      <div className="min-w-0 flex-1">
        <Link
          to={`./strategies`}
          prefetch="render"
          className="focus:outline-none"
        >
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="mb-1 text-base font-bold text-gray-900">
                {/* {portfolioItem.strategyId} */}
                test
              </p>
              <p className="text-sm text-gray-900">
                {/* {portfolioItem.riskLevelId} */}
                test
              </p>
            </div>
            <div>
              {/* <div className="h-16 w-full bg-gray-50">
                <SparklineChart data={performanceSeries} />
              </div> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// type TRiskLevelCell = {
//   name: string;
//   value: number;
//   metric: "VaR";
// };

// function RiskLevelCell({ name, value, metric }: TRiskLevelCell) {
//   const formattedValue = numeral(value).format("0%");
//   return (
//     <div>
//       {name} ({formattedValue} {metric})
//     </div>
//   );
// }

// type TCurrencyValueCell = {
//   amount: number;
//   currency: "EUR";
// };

// function CurrencyValueCell({ amount, currency }: TCurrencyValueCell) {
//   const formattedAmount = numeral(amount).format("0,0.00");
//   const currencySymbols = {
//     EUR: "€",
//   };

//   const currencySymbol = currencySymbols[currency];

//   return (
//     <div>
//       {formattedAmount} {currencySymbol}
//     </div>
//   );
// }

// type TPerformanceCell = {
//   amount: number;
//   currency: "EUR";
// };

// function PerformanceCell({ amount, currency }: TPerformanceCell) {
//   const formattedAbsoluteAmount = numeral(Math.abs(amount)).format("0,0.00");
//   const currencySymbols = {
//     EUR: "€",
//   };

//   const currencySymbol = currencySymbols[currency];

//   const sign = amount === 0 ? "" : amount < 0 ? "-" : "+";

//   return (
//     <div>
//       {sign}
//       {formattedAbsoluteAmount} {currencySymbol}
//     </div>
//   );
// }
