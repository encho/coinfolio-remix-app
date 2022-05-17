import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  // useCatch,
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getStrategyFromSlug } from "~/models/strategy.server";
// import { requireUserId } from "~/session.server";

import { PageTitle } from "~/components/Typography";

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
      {/* <h3 className="text-gray-500">
        description: {data.strategy.description}
      </h3> */}
      <h3 className="max-w-xl text-gray-900">
        {data.strategy.longDescription}
      </h3>
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
