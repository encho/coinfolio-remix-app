import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import numeral from "numeral";

import { getUserPortfolios } from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";
import { PageTitle, SectionTitle } from "~/components/Typography";
import PortfoliosCards from "~/components/PortfoliosCards";
import PeriodPicker from "~/components/PeriodPicker";
import { MonetaryValueLarge, MonetaryValueSmall } from "~/components/Money";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";
import PieChart from "~/components/PieFixtureChart";

import type { TPortfolio } from "~/models/portfolio.server";

type LoaderData = {
  portfolios: Array<TPortfolio>;
  performanceSeries: Array<{ date: Date; value: number }>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const portfolios = await getUserPortfolios({ userId });

  const performanceSeries = [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ];

  if (!portfolios) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({
    portfolios,
    performanceSeries,
  });
};

export default function PortalIndexPage() {
  const data = useLoaderData<LoaderData>();

  const parsedPerformanceSeries = data.performanceSeries.map((it) => ({
    ...it,
    date: new Date(it.date),
  }));

  const coins = [
    {
      symbol: "ADA",
      amount: 200,
      color: "var(--color-cyan-500)",
      inUSD: 1.48,
    },
    {
      symbol: "SOL",
      amount: 5,
      color: "var(--color-yellow-500)",
      inUSD: 37.6,
    },
    {
      symbol: "BTC",
      amount: 0.005,
      color: "var(--color-violet-500)",
      inUSD: 37363,
    },
    {
      symbol: "QQQ",
      amount: 0.005,
      color: "var(--color-orange-500)",
      inUSD: 37363,
    },
    {
      symbol: "AAA",
      amount: 0.005,
      color: "var(--color-fuchsia-500)",
      inUSD: 37363,
    },
    {
      symbol: "DEI",
      amount: 12.3,
      color: "var(--color-blue-500)",
      inUSD: 40,
    },
  ];

  return (
    <div>
      {/* TODO layout PageTitle better? better layout page better and use capsize on PageTitle */}
      <PageTitle>Good morning</PageTitle>
      <div className="mb-14">
        <SectionTitle>Account Value</SectionTitle>
        <MonetaryValueLarge currency="EUR" amount={123.33} />
        <div className="mt-1">
          <MonetaryValueSmall currency="EUR" amount={23.11} /> available.
        </div>
      </div>

      {/* grid based layout */}
      <div className="grid w-full grid-flow-col grid-cols-[1fr_250px] grid-rows-[auto_250px] gap-x-24">
        <div className="flex justify-between align-baseline">
          <SectionTitle>Performance</SectionTitle>
          <PeriodPicker />
        </div>
        <div className="bg-gray-50">
          <SmallPerformanceChart data={parsedPerformanceSeries} />
        </div>
        <div className="">
          <SectionTitle>Asset Allocation</SectionTitle>
        </div>
        <div className="">
          <PieChart coins={coins} />
        </div>
      </div>

      {/* Coinfolio Cards Section */}
      <div className="mt-12">
        <SectionTitle>Strategies</SectionTitle>
        <PortfoliosCards data={data.portfolios} />
      </div>
    </div>
  );
}
type TPortfolioAbsoluteReturnProps = {
  currency: "EUR";
  amount: number;
};

function PortfolioAbsoluteReturn({
  currency,
  amount,
}: TPortfolioAbsoluteReturnProps) {
  const formattedAbsoluteAmount = numeral(Math.abs(amount)).format("0,0.00");
  const currencySymbols = {
    EUR: "€",
  };

  const currencySymbol = currencySymbols[currency];

  const sign = amount === 0 ? "" : amount < 0 ? "-" : "+";
  // const colorClass =
  //   amount === 0
  //     ? "text-neue-charts-neutral-text"
  //     : amount < 0
  //     ? "text-neue-charts-negative-text"
  //     : "text-neue-charts-positive-text";

  return (
    <div>
      {/* <div className={`text-xl font-bold leading-none ${colorClass}`}> */}
      <div className={"mb-1 text-xl font-bold leading-none"}>
        {sign}
        {formattedAbsoluteAmount} {currencySymbol}
      </div>
      <div>Absolute Return</div>
    </div>
  );
}
