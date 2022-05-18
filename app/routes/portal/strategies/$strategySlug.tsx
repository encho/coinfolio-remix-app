import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
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

type LoaderData = {
  strategy: TStrategy;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // const userId = await requireUserId(request);
  invariant(params.strategySlug, "strategySlug not found");
  const slug = params.strategySlug;

  const strategy = await getStrategyFromSlug({
    slug,
  });

  if (!strategy) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ strategy });
};

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

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
            <RiskLevelButton name="Low" description="20% VaR" />
            <RiskLevelButton name="Medium" description="40% VaR" />
            <RiskLevelButton name="High" description="60% VaR" />
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
  name,
  description,
}: // slug,
{
  name: string;
  description: string;
}) {
  return (
    <div
      key={name}
      className="relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
    >
      <div className="min-w-0 flex-1">
        <Link
          to={`./${"heheheeh"}`}
          prefetch="intent"
          className="focus:outline-none"
        >
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
        </Link>
      </div>
    </div>
  );
}
