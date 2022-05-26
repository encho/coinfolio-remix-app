import { Link } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/solid";
// import { RefreshIcon } from "@heroicons/react/outline";

import {
  // getStrategyPerformanceSeries,
  getStrategyPerformanceSeriesFromIndex,
} from "~/fixtures/strategyPerformanceSeries";

import type { TExpandedPortfolio } from "~/models/portfolio.server";
import type { ExpandedPortfolio } from "~/models/portfolio2.server";
import { SparklineChart } from "./SparklineChart";
import { TRiskLevel } from "~/models/riskLevel.server";

type TPortfoliosCards = {
  data: Array<ExpandedPortfolio>;
};

export default function PortfoliosCards({ data }: TPortfoliosCards) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {data.map((portfolioItem) => (
        <PortfolioTile key={portfolioItem.strategyId} {...portfolioItem} />
      ))}
      <AddNewPortfolioTile />
    </div>
  );
}

function PortfolioTile({ strategy, riskLevel }: ExpandedPortfolio) {
  const cardStyles =
    "rounded border border-gray-200 transition bg-white shadow-sm px-6 py-5 hover:border-gray-350";
  // const focusStyles = "focus-within:ring-blue-500 focus-within:ring-offset-2";

  // const performanceSeries = getStrategyPerformanceSeries({
  //   strategyId: strategy.id,
  // });
  const performanceSeries = getStrategyPerformanceSeriesFromIndex(0);
  return (
    <Link
      to={`./portfolios/${strategy.id}`}
      prefetch="intent"
      className={`${cardStyles} min-w-0 flex-1`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between align-baseline">
          <div className="flex gap-2 align-middle">
            <div className="bg-gray-100x text-base font-bold text-gray-900">
              {strategy.name}
            </div>
            {/* TODO: discuss recurring payment and how it affects the whole account value too AND wheter it is possible with TradeCore */}
            {/* <div className="bg-green-200x self-center">
              <div className="flex gap-[1px]">
                <RefreshIcon
                  className="bg-yellow-200x h-3 w-3 self-center text-gray-400"
                  aria-hidden="true"
                />
                <div className="text-xs text-gray-400">300 $</div>
              </div>
            </div> */}
          </div>
          <RiskLevelBars {...riskLevel} />
        </div>

        <div className="flex justify-between">
          <div className="bg-yellow-300xxx">
            <div className="text-xl font-normal text-gray-900">2,300.43 €</div>
            <div className="text-sm text-gray-900">+300.88 €</div>
          </div>
          <div className="h-12 w-40 py-2">
            <div className="h-full bg-gray-50">
              <SparklineChart data={performanceSeries} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function AddNewPortfolioTile() {
  return (
    <Link
      to="/strategies"
      prefetch="render"
      className="relative block w-full rounded border border-gray-200 bg-gray-50 px-6 py-5 text-center shadow-inner transition hover:border-gray-350 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex h-full flex-col justify-center">
        <PlusIcon
          className="mx-auto h-8 w-8 text-gray-400"
          aria-hidden="true"
        />

        <span className="mt-1 block text-sm font-medium text-gray-400">
          Add Strategy
        </span>
      </div>
    </Link>
  );
}

function RiskLevelBars(props: TRiskLevel) {
  const firstBarColor = "bg-blue-500";
  const secondBarColor =
    props.type === "MEDIUM_RISK" || props.type === "HIGH_RISK"
      ? "bg-blue-500"
      : "bg-gray-200";
  const thirdBarColor =
    props.type === "HIGH_RISK" ? "bg-blue-500" : "bg-gray-200";
  return (
    <div className="bg-yellow-200x flex gap-[3px] align-middle">
      <div className={`h-[5px] w-4 self-center ${firstBarColor}`}></div>
      <div className={`h-[5px] w-4 self-center ${secondBarColor}`}></div>
      <div className={`h-[5px] w-4 self-center ${thirdBarColor}`}></div>
    </div>
  );
}
