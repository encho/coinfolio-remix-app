import { Link } from "@remix-run/react";
import { PageTitle, SectionTitle } from "~/components/Typography";
import { SparklineChart } from "~/components/SparklineChart";

const performanceSeries = [
  { date: new Date("2022-01-01"), value: 100 },
  { date: new Date("2022-01-02"), value: 110 },
  { date: new Date("2022-01-03"), value: 105 },
  { date: new Date("2022-01-04"), value: 120 },
  { date: new Date("2022-01-05"), value: 110 },
  { date: new Date("2022-01-06"), value: 130 },
  { date: new Date("2022-01-07"), value: 120 },
];

export default function PortalStrategiesPage() {
  return (
    <div>
      <PageTitle>CoinFolios Library</PageTitle>
      <div className="flex flex-col gap-8">
        <div className="">
          <SectionTitle>Single Coin Indices</SectionTitle>
          <StrategyTiles
            data={[
              {
                name: "Bitcoin",
                description:
                  "The worlds first digital currency. Bitcoin is tamperproof and openly traded.",
                performanceSeries,
                slug: "bitcoin",
              },
              {
                name: "Ethereum",
                description:
                  "Ethereum is a global virtual machine powered by blockchain technology.",
                performanceSeries,
                slug: "ethereum",
              },
              {
                name: "Ripple",
                description:
                  "Ripple is both a cryptocurrency and a digital payment network for financial transactions.",
                performanceSeries,
                slug: "ripple",
              },
              {
                name: "Cardano",
                description:
                  "Cardano is a blockchain and smart contracts platform with a cryptocurrency called ada.",
                performanceSeries,
                slug: "cardano",
              },
              {
                name: "Solana",
                description:
                  "Solana is a blockchain platform designed to host decentralized applications.",
                performanceSeries,
                slug: "solana",
              },
            ]}
          />
        </div>
        <div className="">
          <SectionTitle>Broad Market Indices</SectionTitle>
          <StrategyTiles
            data={[
              {
                name: "G5 Equally Weighted Index",
                description:
                  "Our equally weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
                performanceSeries,
                slug: "G5-equally-weighted",
              },
              {
                name: "G5 Volatility Weighted Index",
                description:
                  "Our volatility weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
                performanceSeries,
                slug: "G5-vola-weighted",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */
type TStrategyOverview = {
  name: string;
  description: string;
  performanceSeries: Array<{ date: Date; value: number }>;
  slug: string;
};

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
          description={strategy.description}
          performanceSeries={strategy.performanceSeries}
          slug={strategy.slug}
        />
      ))}
    </div>
  );
}

type TStrategyTileProps = TStrategyOverview;

function StrategyTile({
  name,
  description,
  performanceSeries,
  slug,
}: TStrategyTileProps) {
  return (
    <div
      key={name}
      className="items-centerxxxx relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
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
