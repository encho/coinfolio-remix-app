import { Link } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/solid";

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
    <Link
      to="/strategies"
      prefetch="render"
      className="relative block w-full rounded border border-gray-200 bg-gray-50 px-6 py-5 text-center shadow-inner hover:border-gray-350 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex h-full flex-col justify-center">
        <PlusIcon
          className="mx-auto h-8 w-8 text-gray-400"
          aria-hidden="true"
        />

        <span className="mt-1 block text-sm font-medium text-gray-400">
          Add CoinFolio
        </span>
      </div>
    </Link>
  );
}
