// import { Link } from "@remix-run/react";
import numeral from "numeral";

// import type { TPortfolioOverview } from "~/models/portfolio.server";

// type TPortfoliosTable = {
//   data: Array<TPortfolioOverview>;
// };

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

type TPercentageWeightCell = {
  weight: number;
};

function PercentageWeightCell({ weight }: TPercentageWeightCell) {
  const formattedAmount = numeral(weight).format("0.00%");

  return <div>{formattedAmount}</div>;
}

type TPerformanceCell = {
  performance: number;
};

function PerformanceCell({ performance }: TPerformanceCell) {
  const formattedPercentagePerformance = numeral(Math.abs(performance)).format(
    "0.00%"
  );

  const sign = performance === 0 ? "" : performance < 0 ? "-" : "+";

  return (
    <div>
      {sign}
      {formattedPercentagePerformance}
    </div>
  );
}

type TStrategyAssetAllocationTableProps = {
  data: Array<{
    ticker: string;
    name: string;
    weight: number;
    performance: number;
  }>;
};

export default function PortfoliosTable({
  data,
}: TStrategyAssetAllocationTableProps) {
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
                  Currency
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900"
                >
                  Ticker
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-900"
                >
                  Weight
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-900"
                >
                  Performance
                </th>
                {/* <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((assetAllocationItem) => (
                <tr key={assetAllocationItem.ticker}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {assetAllocationItem.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {assetAllocationItem.ticker}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                    <PercentageWeightCell weight={assetAllocationItem.weight} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                    <PerformanceCell
                      performance={assetAllocationItem.performance}
                    />
                  </td>
                  {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      to={`./portfolios/${assetAllocationItem.slug}`}
                      prefetch="intent"
                      className="hover:text-neue-link-hover-text text-neue-link-default-text"
                    >
                      Select
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
