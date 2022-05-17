import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getStrategies } from "~/models/strategy.server";
import { PageTitle, SectionTitle } from "~/components/Typography";
import { SparklineChart } from "~/components/SparklineChart";

import type { TStrategy } from "~/models/strategy.server";

const performanceSeries = [
  { date: new Date("2022-01-01"), value: 100 },
  { date: new Date("2022-01-02"), value: 110 },
  { date: new Date("2022-01-03"), value: 105 },
  { date: new Date("2022-01-04"), value: 120 },
  { date: new Date("2022-01-05"), value: 110 },
  { date: new Date("2022-01-06"), value: 130 },
  { date: new Date("2022-01-07"), value: 120 },
];

type TStrategyOverview = TStrategy & {
  performanceSeries: Array<{ date: Date; value: number }>;
};

type LoaderData = {
  strategies: {
    SINGLE_COIN: Array<TStrategyOverview>;
    CRYPTO_MARKET_BETA: Array<TStrategyOverview>;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const strategies = await getStrategies();

  const performanceSeriesFixture = [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ];

  if (!strategies) {
    throw new Response("Not Found", { status: 404 });
  }

  const strategiesOverview = strategies.map((strategy) => ({
    ...strategy,
    performanceSeries: performanceSeriesFixture,
  }));

  const singleCoinStrategies = strategiesOverview.filter(
    (it) => it.category === "SINGLE_COIN"
  );
  const cryptoMarketBetaStrategies = strategiesOverview.filter(
    (it) => it.category === "CRYPTO_MARKET_BETA"
  );

  return json<LoaderData>({
    strategies: {
      SINGLE_COIN: singleCoinStrategies,
      CRYPTO_MARKET_BETA: cryptoMarketBetaStrategies,
    },
  });
};

export default function PortalStrategiesPage() {
  const data = useLoaderData<LoaderData>();

  const singleCoinStrategiesOverview = data.strategies.SINGLE_COIN.map(
    (strategyOverview) => ({
      ...strategyOverview,
      performanceSeries: strategyOverview.performanceSeries.map((it) => ({
        ...it,
        date: new Date(it.date),
      })),
    })
  );

  const cryptoMarketBetaStrategiesOverview =
    data.strategies.CRYPTO_MARKET_BETA.map((strategyOverview) => ({
      ...strategyOverview,
      performanceSeries: strategyOverview.performanceSeries.map((it) => ({
        ...it,
        date: new Date(it.date),
      })),
    }));

  return (
    <div>
      <PageTitle>CoinFolios Library</PageTitle>
      <div className="flex flex-col gap-8">
        <div className="">
          <SectionTitle>Single Coin Indices</SectionTitle>
          <StrategyTiles data={singleCoinStrategiesOverview} />
        </div>
        <div className="">
          <SectionTitle>Broad Market Indices</SectionTitle>
          <StrategyTiles data={cryptoMarketBetaStrategiesOverview} />
        </div>
      </div>
    </div>
  );
}

type TStrategyTilesProps = {
  data: Array<TStrategyOverview>;
};

function StrategyTiles({ data }: TStrategyTilesProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {data.map((strategy) => (
        <StrategyTile
          key={strategy.name}
          name={strategy.name}
          category={strategy.category}
          description={strategy.description}
          performanceSeries={strategy.performanceSeries}
          slug={strategy.slug}
        />
      ))}
    </div>
  );
}

type TStrategyTileProps = Pick<
  TStrategyOverview,
  "name" | "category" | "description" | "performanceSeries" | "slug"
>;

function StrategyTile({
  name,
  description,
  performanceSeries,
  slug,
}: TStrategyTileProps) {
  return (
    <div
      key={name}
      className="relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
    >
      <div className="min-w-0 flex-1">
        <Link to={`./${slug}`} prefetch="intent" className="focus:outline-none">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-900">{name}</p>
              <p className="text-sm text-gray-900">{description}</p>
            </div>
            <div>
              <div className="h-16 w-full">
                <SparklineChart data={performanceSeries} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
