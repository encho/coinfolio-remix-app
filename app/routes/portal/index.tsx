import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";

// TODO deprecate
// import {
//   // getUserExpandedPortfolios,
//   // getUserPortfolios,
// } from "~/models/portfolio.server";

import { getUserPortfolios } from "~/models/portfolio2.server";
import { requireUserId } from "~/session.server";
import { PageTitle, Heading1, SectionTitle } from "~/components/Typography";
import PortfoliosCards from "~/components/PortfoliosCards";
import PeriodPicker from "~/components/PeriodPicker";
import { MonetaryValueLarge, MonetaryValueSmall } from "~/components/Money";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";
import PieChart from "~/components/PieFixtureChart";
import DashboardTabs from "~/components/DashboardTabs";
import {
  aggregatePerformanceSeries,
  getUserPortfolioPerformanceSeries,
  getCashFixture,
  getUserPortfolioAssetAllocation,
  aggregateAssetAllocations,
  percentageToRealAssetAllocation,
} from "~/fixtures/userPortfolioData";

import type { ExpandedPortfolio } from "~/models/portfolio2.server";

type ExpandedPortfolioWithPerformanceSeriesAndAssetAllocation =
  ExpandedPortfolio & {
    performanceSeries: Array<{ date: Date; value: number }>;
    // TODO this is a hack as the performance will be driven by absolute (not percentage) asset allocations!!
    assetAllocation: Array<{ currency: string; percentage: number }>;
  };

type TRealAssetAllocationItem = {
  symbol: string;
  color: string;
  amount: number;
  inUSD: number;
};

type LoaderData = {
  performanceSeries: Array<{ date: Date; value: number }>;
  assetAllocation: Array<{ currency: string; percentage: number }>;
  realAssetAllocation: Array<TRealAssetAllocationItem>;
  portfolios: Array<ExpandedPortfolioWithPerformanceSeriesAndAssetAllocation>;
  cashFixture: number;
  totalPortfolioValue: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const CASH_FIXTURE = getCashFixture();

  const url = new URL(request.url);
  const newPortfolioStrategy =
    url.searchParams.get("newPortfolioStrategy") || "";
  const investmentAmount = Number(
    url.searchParams.get("investmentAmount") || 0
  );

  const portfolios = await getUserPortfolios({ userId });

  if (!portfolios) {
    throw new Response("Not Found", { status: 404 });
  }

  const portfoliosWithPerformanceSeriesAndAssetAllocation = portfolios.map(
    (portfolio) => {
      const isNew = portfolio.strategyId === newPortfolioStrategy;
      const performanceSeries = isNew
        ? [{ date: new Date("2022-01-10"), value: investmentAmount }]
        : getUserPortfolioPerformanceSeries({
            userId,
            strategyId: portfolio.strategyId,
          });

      const assetAllocation = getUserPortfolioAssetAllocation({
        strategy: portfolio.strategy,
      });

      return {
        ...portfolio,
        performanceSeries,
        assetAllocation,
      };
    }
  );

  const allPerformanceSeries =
    portfoliosWithPerformanceSeriesAndAssetAllocation.map(
      ({ performanceSeries }) => performanceSeries
    );

  const allAssetAllocations =
    portfoliosWithPerformanceSeriesAndAssetAllocation.map(
      ({ assetAllocation }) => assetAllocation
    );

  const aggregatedPerformanceSeries = aggregatePerformanceSeries(
    allPerformanceSeries.filter((series) => series.length > 1)
  );

  const aggregatedAssetAllocation =
    aggregateAssetAllocations(allAssetAllocations);

  const lastValue =
    aggregatedPerformanceSeries[aggregatedPerformanceSeries.length - 1].value;

  return json<LoaderData>({
    portfolios: portfoliosWithPerformanceSeriesAndAssetAllocation,
    performanceSeries: aggregatedPerformanceSeries,
    cashFixture: CASH_FIXTURE - investmentAmount,
    totalPortfolioValue: lastValue + CASH_FIXTURE,
    assetAllocation: aggregatedAssetAllocation,
    realAssetAllocation: percentageToRealAssetAllocation(
      aggregatedAssetAllocation,
      lastValue + investmentAmount
    ),
  });
};

export default function PortalIndexPage() {
  const data = useLoaderData<LoaderData>();

  const [searchParams] = useSearchParams();
  const newPortfolioStrategy = searchParams.get("newPortfolioStrategy");

  const parsedPerformanceSeries = data.performanceSeries.map((it) => ({
    ...it,
    date: new Date(it.date),
  }));

  const parsedPortfolios = data.portfolios.map((portfolio) => {
    const parsedPerformanceSeries = portfolio.performanceSeries.map(
      (it: { date: Date; value: number }) => ({
        ...it,
        date: new Date(it.date),
      })
    );

    return { ...portfolio, performanceSeries: parsedPerformanceSeries };
  });

  const coins = data.realAssetAllocation;

  return (
    <div>
      <PageTitle>Good morning</PageTitle>

      {/* <div className="bg-orange-500">
        {JSON.stringify(data.assetAllocation, undefined, 2)}
      </div> */}

      <div className="mb-12">
        <DashboardTabs />
      </div>

      <div className="flex flex-col gap-10">
        <div>
          <SectionTitle>Total Portfolio Value</SectionTitle>
          {/* TODO remove this design white space hack once we have capsize trim */}
          <div className="-mt-1">
            <MonetaryValueLarge
              currency="EUR"
              amount={data.totalPortfolioValue}
            />
          </div>
          <div className="mt-3">
            <div className="flex gap-3">
              <div>
                <MonetaryValueSmall currency="EUR" amount={data.cashFixture} />{" "}
                available
              </div>
              {/* TODO make better layout this is a hack! */}
              <div className="-mt-[2px]">
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Payments
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* grid based layout */}
        <div className="grid w-full grid-flow-col grid-cols-[1fr_240px] grid-rows-[auto_240px_0px] gap-x-24">
          <div className="flex justify-between align-baseline">
            <SectionTitle>Performance</SectionTitle>
            <PeriodPicker />
          </div>
          <div className="bg-gray-50">
            <SmallPerformanceChart data={parsedPerformanceSeries} />
          </div>
          <div className="mt-2 text-right text-sm text-blue-500 underline hover:cursor-pointer">
            Performance
          </div>
          <div className="">
            <SectionTitle>Asset Allocation</SectionTitle>
          </div>
          <div className="">
            <PieChart coins={coins} />
          </div>
          <div className="mt-2 text-right text-sm text-blue-500 underline hover:cursor-pointer">
            Asset Allocation
          </div>
        </div>

        {/* Coinfolio Cards Section */}
        <div>
          <SectionTitle>Strategies</SectionTitle>
          <PortfoliosCards
            data={parsedPortfolios}
            newStrategyId={newPortfolioStrategy || ""}
          />
        </div>
      </div>
    </div>
  );
}
