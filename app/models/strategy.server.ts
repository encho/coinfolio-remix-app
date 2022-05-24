import { getRiskLevels, riskLevelsDB } from "./riskLevel.server";

import type { TRiskLevel } from "./riskLevel.server";

// const bitcoinLongDescripton = `
// Bitcoin is a cryptocurrency, a virtual currency designed to act as money and a form of payment outside the control of any one person, group, or entity, and thus removing the need for third-party involvement in financial transactions. It is rewarded to blockchain miners for the work done to verify transactions and can be purchased on several exchanges.
// `;

const bitcoinLongDescripton = `
Bitcoin is a cryptocurrency, a virtual currency designed to act as money and a form of payment outside the control of any one person, group, or entity, and thus removing the need for third-party involvement in financial transactions.
`;

export type TStrategy = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  slug: string;
  category: "SINGLE_COIN" | "CRYPTO_MARKET_BETA";
  riskLevels: Array<TRiskLevel>;
};

// TODO: risklevels should be id's to risklevels as these will in any case be expanded
const strategiesDB: Array<TStrategy> = [
  {
    id: "strategy-001",
    name: "Bitcoin",
    description:
      "The worlds first digital currency. Bitcoin is tamperproof and openly traded.",
    longDescription: bitcoinLongDescripton,
    slug: "bitcoin",
    category: "SINGLE_COIN",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-002",
    name: "Ethereum",
    description:
      "Ethereum is a global virtual machine powered by blockchain technology.",
    longDescription: bitcoinLongDescripton,
    slug: "ethereum",
    category: "SINGLE_COIN",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-003",
    name: "Ripple",
    description:
      "Ripple is both a cryptocurrency and a digital payment network for financial transactions.",
    longDescription: bitcoinLongDescripton,
    slug: "ripple",
    category: "SINGLE_COIN",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-004",
    name: "Cardano",
    description:
      "Cardano is a blockchain and smart contracts platform with a cryptocurrency called ada.",
    longDescription: bitcoinLongDescripton,
    slug: "cardano",
    category: "SINGLE_COIN",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-005",
    name: "Solana",
    description:
      "Solana is a blockchain platform designed to host decentralized applications.",
    longDescription: bitcoinLongDescripton,
    slug: "solana",
    category: "SINGLE_COIN",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-006",
    name: "G10 Equal Weighted",
    description:
      "Our equally weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
    longDescription: bitcoinLongDescripton,
    slug: "G5-equally-weighted",
    category: "CRYPTO_MARKET_BETA",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-007",
    name: "G10 Volatility Weighted",
    description:
      "Our volatility weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
    longDescription: bitcoinLongDescripton,
    slug: "G5-vola-weighted",
    category: "CRYPTO_MARKET_BETA",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
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
      }, 300);
    }
  );
  return strategiesPromise;
}

export function getStrategyFromId({
  id,
}: {
  id: string;
}): Promise<null | TStrategy> {
  console.log(`Retrieving strategy data for id: ${id}...`);
  const strategyPromise: Promise<null | TStrategy> = new Promise((resolve) => {
    setTimeout(() => {
      const strategy = strategiesDB.find((it) => it.id === id);
      if (!strategy) {
        resolve(null);
      } else {
        resolve(strategy);
      }
    }, 500);
  });
  return strategyPromise;
}

export async function getStrategyFromSlug({
  slug,
}: {
  slug: string;
}): Promise<null | TStrategy> {
  console.log(`Retrieving strategy data for slug: ${slug}...`);

  const riskLevels = await getRiskLevels();

  if (!riskLevels) {
    throw Error();
  }

  console.log(riskLevels);
  const strategyPromise: Promise<null | TStrategy> = new Promise((resolve) => {
    setTimeout(() => {
      const strategy = strategiesDB.find((it) => it.slug === slug);
      if (!strategy) {
        resolve(null);
      } else {
        const expandedStrategy = {
          ...strategy,
          riskLevels: strategy.riskLevels.map((it) =>
            riskLevels.find((rl) => rl.id === it.id)
          ),
        } as TStrategy;
        resolve(expandedStrategy);
      }
    }, 500);
  });
  return strategyPromise;
}
