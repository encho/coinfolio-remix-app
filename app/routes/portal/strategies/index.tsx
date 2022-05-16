import { Link } from "@remix-run/react";
import { PageTitle, SectionTitle } from "~/components/Typography";

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
                performanceSeries: [],
              },
              {
                name: "Ethereum",
                description:
                  "Ethereum is a global virtual machine powered by blockchain technology.",
                performanceSeries: [],
              },
              {
                name: "Ripple",
                description:
                  "Ripple is both a cryptocurrency and a digital payment network for financial transactions.",
                performanceSeries: [],
              },
              {
                name: "Cardano",
                description:
                  "Cardano is a blockchain and smart contracts platform with a cryptocurrency called ada.",
                performanceSeries: [],
              },
              {
                name: "Solana",
                description:
                  "Solana is a blockchain platform designed to host decentralized applications.",
                performanceSeries: [],
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
                performanceSeries: [],
              },
              {
                name: "G5 Volatility Weighted Index",
                description:
                  "Our volatility weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
                performanceSeries: [],
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
}: TStrategyTileProps) {
  return (
    <div
      key={name}
      className="items-centerxxxx relative flex space-x-3 rounded border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-gray-350"
    >
      {/* <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
      </div> */}
      <div className="min-w-0 flex-1">
        <Link
          to={"./bitcoin"}
          prefetch="intent"
          //   className="hover:text-neue-link-hover-text text-neue-link-default-text"
          className="focus:outline-none"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="mb-2">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-900">{name}</p>
              {/* <p className="truncate text-sm text-gray-500">{description}</p> */}
              {/* <p className="text-sm text-gray-500">{description}</p> */}
              <p className="text-sm text-gray-900">{description}</p>
            </div>
            <div>
              <p className="h-20 w-full bg-gray-100"></p>
            </div>
          </div>
        </Link>

        {/* <a href="#" className="focus:outline-none">
        </a> */}
      </div>
    </div>
  );
}
