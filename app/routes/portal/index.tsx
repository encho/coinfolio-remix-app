import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import numeral from "numeral";

import {
  getUserExpandedPortfolios,
  getUserPortfolios,
} from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";
import { PageTitle, Heading1, SectionTitle } from "~/components/Typography";
import PortfoliosCards from "~/components/PortfoliosCards";
import PeriodPicker from "~/components/PeriodPicker";
import { MonetaryValueLarge, MonetaryValueSmall } from "~/components/Money";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";
import PieChart from "~/components/PieFixtureChart";
import DashboardTabs from "~/components/DashboardTabs";

import type { TExpandedPortfolio } from "~/models/portfolio.server";

type LoaderData = {
  portfolios: Array<TExpandedPortfolio>;
  performanceSeries: Array<{ date: Date; value: number }>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const portfolios = await getUserExpandedPortfolios({ userId });

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
      <PageTitle>Good morning</PageTitle>
      {/* TODO layout PageTitle better? better layout page better and use capsize on PageTitle */}
      {/* <div className="flex align-middle">
        <div>
          <PageTitle>Good morning</PageTitle>
        </div>
        <div className="self-center">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Button text
          </button>
        </div>
      </div> */}

      {/* <div className="mt-4 mb-12 flex justify-between align-middle">
        <div className="self-center bg-green-200x">
          <Heading1>Good morning</Heading1>
        </div>
        <div className="">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Button text
          </button>
        </div>
      </div> */}

      <div className="bg-gray-150x mb-12">
        <DashboardTabs />
      </div>

      {/* <div className="mb-10">
        <SectionTitle>Account Value</SectionTitle>
        <MonetaryValueLarge currency="EUR" amount={123.33} />
        <div className="mt-2">
          <MonetaryValueSmall currency="EUR" amount={23.11} /> available.
        </div>
      </div> */}

      <div className="flex flex-col gap-10">
        <div className="mb-10xxx">
          <SectionTitle>Account Value</SectionTitle>
          {/* TODO remove this design white space hack once we have capsize trim */}
          <div className="-mt-1">
            <MonetaryValueLarge currency="EUR" amount={123.33} />
          </div>
          <div className="mt-3">
            <div className="flex gap-3">
              <div>
                <MonetaryValueSmall currency="EUR" amount={23.11} /> available
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

        {/* <div className="bg-gray-150x -mt-2 mb-10">
        <DashboardTabs />
      </div> */}

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
        <div className="mt-10xxxx">
          <SectionTitle>Strategies</SectionTitle>
          <PortfoliosCards data={data.portfolios} />
        </div>
      </div>
    </div>
  );
}
// type TPortfolioAbsoluteReturnProps = {
//   currency: "EUR";
//   amount: number;
// };

// function PortfolioAbsoluteReturn({
//   currency,
//   amount,
// }: TPortfolioAbsoluteReturnProps) {
//   const formattedAbsoluteAmount = numeral(Math.abs(amount)).format("0,0.00");
//   const currencySymbols = {
//     EUR: "€",
//   };

//   const currencySymbol = currencySymbols[currency];

//   const sign = amount === 0 ? "" : amount < 0 ? "-" : "+";
//   // const colorClass =
//   //   amount === 0
//   //     ? "text-neue-charts-neutral-text"
//   //     : amount < 0
//   //     ? "text-neue-charts-negative-text"
//   //     : "text-neue-charts-positive-text";

//   return (
//     <div>
//       {/* <div className={`text-xl font-bold leading-none ${colorClass}`}> */}
//       <div className={"mb-1 text-xl font-bold leading-none"}>
//         {sign}
//         {formattedAbsoluteAmount} {currencySymbol}
//       </div>
//       <div>Absolute Return</div>
//     </div>
//   );
// }
