import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { PageTitle, SectionTitle } from "~/components/Typography";
import {
  default as PortfoliosTable,
  TPortfolioInfo,
} from "~/components/PortfoliosTable";
// TODO deprecate
// import { Card } from "~/components/Card";

type PerformanceOverviewData = {
  data: Array<{ date: Date; value: number }>;
};

type LoaderData = {
  portfolios: Array<TPortfolioInfo>;
  performance: {
    "1M": PerformanceOverviewData;
    YTD: PerformanceOverviewData;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    portfolios: [
      {
        name: "G10 Momentum",
        slug: "g10-momentum",
        value: { amount: 10000, currency: "EUR" },
        performance: 0.05,
        riskLevel: {
          name: "Low",
          metric: "VaR",
          value: 0.1,
        },
      },
      {
        name: "DeFi",
        slug: "defi",
        value: { amount: 10000, currency: "EUR" },
        performance: 0.05,
        riskLevel: {
          name: "Low",
          metric: "VaR",
          value: 0.1,
        },
      },
      {
        name: "Bitcoin",
        slug: "bitcoin",
        value: { amount: 10000, currency: "EUR" },
        performance: 0.05,
        riskLevel: {
          name: "Low",
          metric: "VaR",
          value: 0.1,
        },
      },
    ],
    performance: {
      "1M": {
        data: [{ date: new Date(), value: 100 }],
      },
      YTD: {
        data: [{ date: new Date(), value: 100 }],
      },
    },
  };

  return json(data);
};

export default function PortalIndexPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <PageTitle>Portfolio</PageTitle>
      {/* <div className="mb-8 mt-16">
        <SectionTitle>Your Performance</SectionTitle>
        <div>{JSON.stringify(data.performance, undefined, 2)}</div>
      </div> */}
      <div>
        <SectionTitle>Your Portfolios</SectionTitle>
        <PortfoliosTable data={data.portfolios} />
      </div>
    </div>
  );
}
