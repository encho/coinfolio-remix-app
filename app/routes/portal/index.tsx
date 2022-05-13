import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, Link, Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { Heading1, Heading2 } from "~/components/Typography";

type PerformanceOverviewData = {
  data: Array<{ date: Date; value: number }>;
};

type LoaderData = {
  // user: Awaited<ReturnType<typeof getUser>>;
  // jokeListItems: Array<{ id: string; name: string }>;
  portfolios: Array<{ name: string }>;
  performance: {
    "1M": PerformanceOverviewData;
    YTD: PerformanceOverviewData;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  // const jokeListItems = await db.joke.findMany({
  //   take: 5,
  //   select: { id: true, name: true },
  //   orderBy: { createdAt: "desc" },
  // });

  // const user = await getUser(request);

  const data: LoaderData = {
    // jokeListItems,
    portfolios: [
      { name: "G10 Momentum" },
      { name: "DeFi" },
      { name: "Bitcoin" },
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
      <Heading2>Your Performance</Heading2>
      <div>{JSON.stringify(data.performance, undefined, 2)}</div>
      <Heading2>Your Portfolios</Heading2>
      <div>{JSON.stringify(data.portfolios, undefined, 2)}</div>
    </div>
  );
}
