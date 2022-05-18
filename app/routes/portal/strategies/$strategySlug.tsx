import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Fragment, useState } from "react";

import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getStrategyFromSlug } from "~/models/strategy.server";

import { PageTitle, SectionTitle } from "~/components/Typography";
import PeriodPicker from "~/components/PeriodPicker";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";
import StrategyAssetAllocationTable from "~/components/StrategyAssetAllocationTable";

import type { TStrategy } from "~/models/strategy.server";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// TODOS:

//               {/* TODO multiline chart */}
//               {/* TODO parse dates before */}
//               {/* TODO plot area color from theme */}
//               {/* TODO fix button layout */}
//               {/* TODO add add strategy button */}

type TStrategyRiskLevelOverview = {
  id: string;
  name: string;
  description: string;
  // TODO the following are dependent on the active period (1d | 1w | 1m | 1y...)
  performanceSeries: Array<{ date: Date; value: number }>;
  assetAllocation: Array<{
    ticker: string;
    name: string;
    weight: number;
    performance: number;
  }>;
};

type LoaderData = {
  strategy: TStrategy;
  riskLevelsOverview: Array<TStrategyRiskLevelOverview>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.strategySlug, "strategySlug not found");
  const slug = params.strategySlug;

  const strategy = await getStrategyFromSlug({
    slug,
  });

  const lowRiskPerformanceSeriesFixture = [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ];

  const lowRiskAssetAllocationFixture = [
    {
      ticker: "AAA",
      name: "hello coin",
      weight: 0.2,
      performance: 0.03,
    },
    {
      ticker: "QQQ",
      name: "bitcoin",
      weight: 0.1,
      performance: 0.01,
    },
    {
      ticker: "DJX",
      name: "Ethereum",
      weight: 0.1,
      performance: -0.03,
    },
    {
      ticker: "USDT",
      name: "USD Theter",
      weight: 0.6,
      performance: 0.01,
    },
  ];

  const riskLevelsOverviewFixture = [
    {
      id: "001",
      name: "Low",
      description: "10% VaR",
      performanceSeries: lowRiskPerformanceSeriesFixture,
      assetAllocation: lowRiskAssetAllocationFixture,
    },
    {
      id: "002",
      name: "Med",
      description: "30% VaR",
      performanceSeries: lowRiskPerformanceSeriesFixture.map((it) => ({
        ...it,
        value: it.value * 2,
      })),
      assetAllocation: lowRiskAssetAllocationFixture,
    },
    {
      id: "003",
      name: "High",
      description: "50% VaR",
      performanceSeries: lowRiskPerformanceSeriesFixture.map((it) => ({
        ...it,
        value: it.value * 3,
      })),
      assetAllocation: lowRiskAssetAllocationFixture,
    },
  ];

  if (!strategy) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({
    strategy,
    riskLevelsOverview: riskLevelsOverviewFixture,
  });
};

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

  const [currentRiskLevel, setCurrentRiskLevel] = useState(
    data.riskLevelsOverview[0].id
  );

  return (
    <div>
      <PageTitle>{data.strategy.name}</PageTitle>
      {/* TODO make VStack */}
      <div className="flex flex-col gap-12">
        <div>
          <h3 className="max-w-xl text-gray-900">
            {data.strategy.longDescription}
          </h3>
        </div>
        <div>
          <SectionTitle>Risk Level</SectionTitle>
          <p className="mb-2">Select the target risk level for the strategy.</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {data.riskLevelsOverview.map((riskLevelOverview) => (
              <RiskLevelButton
                key={riskLevelOverview.id}
                id={riskLevelOverview.id}
                name={riskLevelOverview.name}
                description={riskLevelOverview.description}
                onClick={(id) => setCurrentRiskLevel(id)}
                isActive={riskLevelOverview.id === currentRiskLevel}
              />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Performance</SectionTitle>
          <div className="w-[900px]">
            <div className="mb-3 text-right">
              <PeriodPicker />
            </div>
            <div className="h-[400px] w-full bg-gray-50">
              <SmallPerformanceChart
                data={data.riskLevelsOverview[0].performanceSeries.map(
                  (it) => ({ ...it, date: new Date(it.date) })
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <SectionTitle>Asset Allocation</SectionTitle>
          <StrategyAssetAllocationTable
            data={data.riskLevelsOverview[0].assetAllocation}
          />
        </div>
      </div>
    </div>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);

//   return <div>An unexpected error occurred: {error.message}</div>;
// }

// export function CatchBoundary() {
//   const caught = useCatch();

//   if (caught.status === 404) {
//     return <div>Portfolio not found</div>;
//   }

//   throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }

function RiskLevelButton({
  id,
  name,
  description,
  onClick,
  isActive,
}: {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <button
      key={name}
      onClick={() => onClick(id)}
      className={classNames(
        isActive ? "bg-blue-500" : "bg-white",
        "relative flex rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350 focus:outline-none"
      )}
    >
      <div className="text-left">
        <span className="absolute inset-0" aria-hidden="true" />
        <p
          className={classNames(
            isActive ? "text-white" : "text-gray-900",
            "text-sm font-bold"
          )}
        >
          {name}
        </p>
        <p
          className={classNames(
            isActive ? "text-white" : "text-gray-900",
            "text-sm"
          )}
        >
          {description}
        </p>
      </div>
    </button>
  );
}

function RiskLevelButtonOLD({
  id,
  name,
  description,
  onClick,
  isActive,
}: {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <div
      key={name}
      className={classNames(
        isActive ? "bg-blue-500" : "bg-white",
        "relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
      )}
    >
      <div className="min-w-0 flex-1">
        <button className="focus:outline-none" onClick={() => onClick(id)}>
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="">
              <span className="absolute inset-0" aria-hidden="true" />
              <p
                className={classNames(
                  isActive ? "text-white" : "text-gray-900",
                  "text-sm font-bold"
                )}
              >
                {name}
              </p>
              <p
                className={classNames(
                  isActive ? "text-white" : "text-gray-900",
                  "text-sm"
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
