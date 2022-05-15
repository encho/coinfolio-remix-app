import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getUserPortfoliosOverview } from "~/models/portfolio.server";
import { requireUserId } from "~/session.server";
import { PageTitle, SectionTitle } from "~/components/Typography";
import PortfoliosTable from "~/components/PortfoliosTable";

import type { TPortfolioOverview } from "~/models/portfolio.server";

type LoaderData = {
  portfoliosOverview: Array<TPortfolioOverview>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const portfoliosOverview = await getUserPortfoliosOverview({ userId });

  if (!portfoliosOverview) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({
    portfoliosOverview,
  });
};

export default function PortalIndexPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <PageTitle>Portfolios</PageTitle>
      <div>
        <SectionTitle>Your Portfolios</SectionTitle>
        <PortfoliosTable data={data.portfoliosOverview} />
      </div>
    </div>
  );
}
