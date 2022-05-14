import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getPortfolioInfoFromSlug } from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";

import { PageTitle, SectionTitle } from "~/components/Typography";

type LoaderData = {
  portfolio: {
    slug: string;
    name: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.portfolioSlug, "portfolioSlug not found");

  const portfolio = await getPortfolioInfoFromSlug({
    userId,
    slug: params.portfolioSlug,
  });
  if (!portfolio) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ portfolio });
};

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <PageTitle>{data.portfolio.name}</PageTitle>
      <h3 className="text-gray-500">slug: {data.portfolio.slug}</h3>
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
