import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  // useCatch,
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";

// import { getUserPortfolioInfoFromSlug } from "~/models/portfolio.server";
// import { requireUserId } from "~/session.server";

import { PageTitle } from "~/components/Typography";

type LoaderData = {
  strategy: {
    slug: string;
    name: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // const userId = await requireUserId(request);
  invariant(params.strategySlug, "strategySlug not found");
  const slug = params.strategySlug;

  // const portfolio = await getUserPortfolioInfoFromSlug({
  //   userId,
  //   slug: params.portfolioSlug,
  // });

  // if (!portfolio) {
  //   throw new Response("Not Found", { status: 404 });
  // }
  // return json<LoaderData>({ portfolio });

  const strategy = {
    name: `${slug} ${slug} ${slug}`,
    slug,
  };

  return json<LoaderData>({ strategy });
};

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <PageTitle>{data.strategy.name}</PageTitle>
      <h3 className="text-gray-500">slug: {data.strategy.slug}</h3>
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
