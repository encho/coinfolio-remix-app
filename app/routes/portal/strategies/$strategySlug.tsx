import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Fragment, useState } from "react";

import {
  // useCatch,
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getStrategyFromSlug } from "~/models/strategy.server";
// import { requireUserId } from "~/session.server";

import { PageTitle, SectionTitle } from "~/components/Typography";
import PeriodPicker from "~/components/PeriodPicker";

import type { TStrategy } from "~/models/strategy.server";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TStrategyRiskLevelOverview = {
  id: string;
  name: string;
  description: string;
};

type LoaderData = {
  strategy: TStrategy;
  riskLevelsOverview: Array<TStrategyRiskLevelOverview>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // const userId = await requireUserId(request);
  invariant(params.strategySlug, "strategySlug not found");
  const slug = params.strategySlug;

  const strategy = await getStrategyFromSlug({
    slug,
  });

  const riskLevelsOverviewFixture = [
    { id: "001", name: "Low", description: "10% VaR" },
    { id: "002", name: "Med", description: "30% VaR" },
    { id: "003", name: "High", description: "50% VaR" },
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
            <div className="h-[400px] w-full bg-gray-100"></div>
          </div>
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
    <div
      key={name}
      // className="relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
      className={classNames(
        isActive ? "bg-blue-100" : "bg-white",
        "relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
      )}
    >
      <div className="min-w-0 flex-1">
        <button className="focus:outline-none" onClick={() => onClick(id)}>
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-900">{name}</p>
              <p className="text-sm text-gray-900">{description}</p>
            </div>
            <div>
              {/* <div className="h-16 w-full">
                <SparklineChart data={performanceSeries} />
              </div> */}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
