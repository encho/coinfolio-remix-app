import type { User } from "@prisma/client";

// TODO define TPortfolio type here, and export!

export type TRiskLevel = {
  name: string;
  metric: "VaR";
  value: number;
};

export type TPortfolio = {
  userId: User["id"];
  name: string;
  slug: string;
};

export type TPortfolioPeriodPerformance = {
  periodStart: Date;
  periodEnd: Date;
  monetaryValue: {
    amount: number;
    currency: "EUR";
  };
};

export type TPortfolioOverview = TPortfolio & {
  markToMarketValue: { amount: 10000; currency: "EUR" };
  riskLevel: TRiskLevel;
  performance: TPortfolioPeriodPerformance;
};

const portfolios: Array<TPortfolioOverview> = [
  {
    userId: "cl305plna000699t19aqezycd",
    name: "G10 Momentum FTW",
    slug: "g10-momentum",
    riskLevel: {
      name: "High",
      metric: "VaR",
      value: 0.5,
    },
    markToMarketValue: { amount: 10000, currency: "EUR" },
    performance: {
      periodStart: new Date(),
      periodEnd: new Date(),
      monetaryValue: { amount: 300, currency: "EUR" },
    },
  },
  {
    userId: "cl305plna000699t19aqezycd",
    name: "defi Rocks!",
    slug: "defi",
    riskLevel: {
      name: "Medium",
      metric: "VaR",
      value: 0.3,
    },
    markToMarketValue: { amount: 10000, currency: "EUR" },
    performance: {
      periodStart: new Date(),
      periodEnd: new Date(),
      monetaryValue: { amount: 300, currency: "EUR" },
    },
  },
];

export function getUserPortfoliosOverview({
  userId,
}: {
  userId: User["id"];
}): Promise<null | Array<TPortfolioOverview>> {
  console.log(`Retrieving portfolio data for user: ${userId}...`);
  const portfolioPromise: Promise<null | Array<TPortfolioOverview>> =
    new Promise((resolve) => {
      setTimeout(() => {
        const userPortfolios = portfolios.filter((it) => it.userId === userId);
        if (!userPortfolios) {
          resolve(null);
        } else {
          resolve(userPortfolios);
        }
      }, 300);
    });
  return portfolioPromise;
}

export function getUserPortfolioInfoFromSlug({
  slug,
  userId,
}: {
  slug: string;
  userId: User["id"];
}): Promise<null | { name: string; slug: string }> {
  console.log(
    `Retrieving portfolio data for user: ${userId} and slug: ${slug}...`
  );
  const portfolioPromise: Promise<null | { name: string; slug: string }> =
    new Promise((resolve) => {
      setTimeout(() => {
        const portfolio = portfolios.find((it) => it.slug === slug);
        if (!portfolio) {
          resolve(null);
        } else {
          resolve(portfolio);
        }
      }, 300);
    });
  return portfolioPromise;
}
