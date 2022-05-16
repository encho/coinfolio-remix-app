import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getUserPortfoliosOverview } from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";
import { PageTitle, SectionTitle } from "~/components/Typography";
import PortfoliosTable from "~/components/PortfoliosTable";
import { MonetaryValueLarge, MonetaryValueSmall } from "~/components/Money";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";

import type { TPortfolioOverview } from "~/models/portfolio.server";

type LoaderData = {
  portfoliosOverview: Array<TPortfolioOverview>;
  performanceSeries: Array<{ date: Date; value: number }>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const portfoliosOverview = await getUserPortfoliosOverview({ userId });

  const performanceSeries = [
    { date: new Date(), value: 100 },
    { date: new Date(), value: 120 },
    { date: new Date(), value: 130 },
    { date: new Date(), value: 140 },
    { date: new Date(), value: 150 },
    { date: new Date(), value: 160 },
    { date: new Date(), value: 120 },
    { date: new Date(), value: 100 },
    { date: new Date(), value: 120 },
    { date: new Date(), value: 140 },
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
          <div className="mb-4 text-right">
            <PeriodPicker />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-28 w-60 overflow-hidden bg-gray-100">
              <SmallPerformanceChart data={data.performanceSeries} />
            </div>
            <div className="h-20 w-40 bg-gray-100">
              <MonetaryValueSmall currency="EUR" amount={23.11} />
              Absolute Return
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
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        1 D
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        1 W
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        1 M
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        1 Y
      </button>
    </span>
  );
}
