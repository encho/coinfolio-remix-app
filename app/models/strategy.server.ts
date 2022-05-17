export type TStrategy = {
  name: string;
  description: string;
  slug: string;
};

const strategiesDB: Array<TStrategy> = [
  {
    name: "Bitcoin",
    description:
      "The worlds first digital currency. Bitcoin is tamperproof and openly traded.",
    slug: "bitcoin",
  },
  {
    name: "Ethereum",
    description:
      "Ethereum is a global virtual machine powered by blockchain technology.",
    slug: "ethereum",
  },
  {
    name: "Ripple",
    description:
      "Ripple is both a cryptocurrency and a digital payment network for financial transactions.",
    slug: "ripple",
  },
  {
    name: "Cardano",
    description:
      "Cardano is a blockchain and smart contracts platform with a cryptocurrency called ada.",
    slug: "cardano",
  },
  {
    name: "Solana",
    description:
      "Solana is a blockchain platform designed to host decentralized applications.",
    slug: "solana",
  },
  {
    name: "G5 Equally Weighted Index",
    description:
      "Our equally weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
    slug: "G5-equally-weighted",
  },
  {
    name: "G5 Volatility Weighted Index",
    description:
      "Our volatility weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
    slug: "G5-vola-weighted",
  },
];

export function getStrategies(): Promise<null | Array<TStrategy>> {
  console.log(`Retrieving strategies data...`);
  const strategiesPromise: Promise<null | Array<TStrategy>> = new Promise(
    (resolve) => {
      setTimeout(() => {
        const foundStrategies = strategiesDB;
        if (!foundStrategies) {
          resolve(null);
        } else {
          resolve(foundStrategies);
        }
      }, 500);
    }
  );
  return strategiesPromise;
}

//     export function getStrategyFromSlug({
//   slug,
// }: {
//   slug: string;
// }): Promise<null | TStrategy> {
//   console.log(`Retrieving strategy data for slug: ${slug}...`);
//   const strategyPromise: Promise<null | TStrategy> = new Promise((resolve) => {
//     setTimeout(() => {
//       const strategy = strategiesDB.find((it) => it.slug === slug);
//       if (!strategy) {
//         resolve(null);
//       } else {
//         resolve(strategy);
//       }
//     }, 500);
//   });
//   return strategyPromise;
// }
