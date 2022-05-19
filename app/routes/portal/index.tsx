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
          <div className="flex items-center gap-10">
            <div className="h-[200px] w-[600px] overflow-visible bg-gray-50">
              <SmallPerformanceChart data={parsedPerformanceSeries} />
            </div>
            <div>
              <PortfolioAbsoluteReturn currency="EUR" amount={23.11} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <SectionTitle>My CoinFolios</SectionTitle>
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
