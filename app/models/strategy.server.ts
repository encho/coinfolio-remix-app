const bitcoinLongDescripton = `
Bitcoin is a cryptocurrency, a virtual currency designed to act as money and a form of payment outside the control of any one person, group, or entity, and thus removing the need for third-party involvement in financial transactions. It is rewarded to blockchain miners for the work done to verify transactions and can be purchased on several exchanges.
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

export type TRiskLevel = {
  id: string;
  name: string;
  description: string;
  metricType: "VaR";
  metricValue: number;
};

const riskLevelsDB: Array<TRiskLevel> = [
  {
    id: "riskLevel-001",
    name: "Low Risk",
    description: "hehe",
    metricType: "VaR",
    metricValue: 0.1,
  },
  {
    id: "riskLevel-002",
    name: "Medium Risk",
    description: "hehe",
    metricType: "VaR",
    metricValue: 0.2,
  },
  {
    id: "riskLevel-003",
    name: "High Risk",
    description: "hehe",
    metricType: "VaR",
    metricValue: 0.3,
  },
  {
    id: "riskLevel-004",
    name: "Highestttt Risk",
    description: "hehe",
    metricType: "VaR",
    metricValue: 0.4,
  },
];

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
    name: "G5 Equally Weighted Index",
    description:
      "Our equally weighted Cryptocurrency Index composed of the 5 largest cryptocurrencies.",
    longDescription: bitcoinLongDescripton,
    slug: "G5-equally-weighted",
    category: "CRYPTO_MARKET_BETA",
    riskLevels: [riskLevelsDB[0], riskLevelsDB[1], riskLevelsDB[2]],
  },
  {
    id: "strategy-007",
    name: "G5 Volatility Weighted Index",
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
      }, 500);
    }
  );
  return strategiesPromise;
}

export function getStrategyFromId({
  id,
}: {
  id: string;
}): Promise<null | TStrategy> {
  console.log(`Retrieving strategy data for slug: ${id}...`);
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

export function getStrategyFromSlug({
  slug,
}: {
  slug: string;
}): Promise<null | TStrategy> {
  console.log(`Retrieving strategy data for slug: ${slug}...`);
  const strategyPromise: Promise<null | TStrategy> = new Promise((resolve) => {
    setTimeout(() => {
      const strategy = strategiesDB.find((it) => it.slug === slug);
      if (!strategy) {
        resolve(null);
      } else {
        resolve(strategy);
      }
    }, 500);
  });
  return strategyPromise;
}
