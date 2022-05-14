import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { Heading1, Heading2 } from "~/components/Typography";
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
      <Heading1>Portfolio</Heading1>
      <div className="mb-8 mt-16">
        <Heading2>Your Performance</Heading2>
        <div>{JSON.stringify(data.performance, undefined, 2)}</div>
      </div>
      <div>
        <Heading2>Your Portfolios</Heading2>
        <PortfoliosTable data={data.portfolios} />
      </div>
    </div>
  );
}
