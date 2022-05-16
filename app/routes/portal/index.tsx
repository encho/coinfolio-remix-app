import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import numeral from "numeral";

import { getUserPortfoliosOverview } from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";
import { PageTitle, SectionTitle } from "~/components/Typography";
import PortfoliosTable from "~/components/PortfoliosTable";
import { MonetaryValueLarge, MonetaryValueSmall } from "~/components/Money";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";

import type { TPortfolioOverview } from "~/models/portfolio.server";
import { parse } from "path";

type LoaderData = {
  portfoliosOverview: Array<TPortfolioOverview>;
  performanceSeries: Array<{ date: Date; value: number }>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const portfoliosOverview = await getUserPortfoliosOverview({ userId });

  const performanceSeries = [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ];

  if (!portfoliosOverview) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({
    portfoliosOverview,
    performanceSeries,
  });
};

export default function PortalIndexPage() {
  const data = useLoaderData<LoaderData>();

  // data.forEach(it => {...it, date: new Date(it.date)})
  const parsedPerformanceSeries = data.performanceSeries.map((it) => ({
    ...it,
    date: new Date(it.date),
  }));

  return (
    <div>
      <PageTitle>Good morning</PageTitle>
      <div className="flex justify-between">
        <div>
          <SectionTitle>Account Value</SectionTitle>
          <MonetaryValueLarge currency="EUR" amount={123.33} />
          <div className="mt-1">
            <MonetaryValueSmall currency="EUR" amount={23.11} /> available.
          </div>
        </div>
        <div className="">
          <div className="mb-6 text-right">
            <PeriodPicker />
          </div>
          <div className="flex items-center gap-8">
            {/* <div className="h-28 w-60 overflow-visible"> */}
            <div className="h-[200px] w-[400px] overflow-visible">
              <SmallPerformanceChart data={parsedPerformanceSeries} />
            </div>
            <div>
              <PortfolioAbsoluteReturn currency="EUR" amount={23.11} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <SectionTitle>Portfolio</SectionTitle>
        <PortfoliosTable data={data.portfoliosOverview} />
      </div>
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */
function PeriodPicker() {
  return (
    <span className="relative z-0 inline-flex rounded shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 D
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 W
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 M
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 Y
      </button>
    </span>
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
