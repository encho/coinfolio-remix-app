import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getUserPortfolioInfoFromStrategyId } from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";
import { getStrategyFromId } from "~/models/strategy.server";
import { getRiskLevelFromId } from "~/models/riskLevel.server";
import { PageTitle, SectionTitle } from "~/components/Typography";

import type { TPortfolio } from "~/models/portfolio.server";
import type { TStrategy } from "~/models/strategy.server";
import type { TRiskLevel } from "~/models/riskLevel.server";

type LoaderData = {
  portfolio: TPortfolio;
  strategy: TStrategy;
  riskLevel: TRiskLevel;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.strategyId, "strategyId not found");

  const strategyId = params.strategyId;

  const portfolio = await getUserPortfolioInfoFromStrategyId({
    userId,
    strategyId,
  });
  if (!portfolio) {
    throw new Response("Not Found", { status: 404 });
  }

  const strategy = await getStrategyFromId({ id: strategyId });
  if (!strategy) {
    throw new Response("Not Found", { status: 404 });
  }

  const riskLevel = await getRiskLevelFromId({ id: portfolio.riskLevelId });
  if (!riskLevel) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({
    portfolio,
    strategy,
    riskLevel,
  });
};

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <PageTitle>{data.strategy.name}</PageTitle>
      <div>
        <SectionTitle>Risk Level</SectionTitle>
        <h3 className="text-gray-900">{data.riskLevel.name}</h3>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Change Risk Level
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Portfolio not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
