import type { User } from "@prisma/client";
import type { TStrategy, TRiskLevel } from "./strategy.server";
// TODO define TPortfolio type here, and export!

export type TRiskLevelOLD = {
  name: string;
  metric: "VaR";
  value: number;
};

export type TPortfolio = {
  userId: User["id"]; // primary key
  strategyId: TStrategy["id"]; // primary key
  riskLevelId: TRiskLevel["id"];
  // name: string;
  // slug: string;
};

export type TPortfolioPeriodPerformance = {
  periodStart: Date;
  periodEnd: Date;
  monetaryValue: {
    amount: number;
    currency: "EUR";
  };
};

// TODO for now remove the added fieldsLevel
// export type TPortfolioOverview = TPortfolio & {
//   markToMarketValue: { amount: 10000; currency: "EUR" };
//   riskLevel: TRiskLevelOLD;
//   performance: TPortfolioPeriodPerformance;
// };

// const portfolios: Array<TPortfolioOverview> = [
const portfoliosDB: Array<TPortfolio> = [
  {
    userId: "cl305plna000699t19aqezycd",
    strategyId: "strategy-001",
    riskLevelId: "riskLevel-001",
    // name: "G10 Momentum FTW",
    // riskLevel: {
    //   name: "High",
    //   metric: "VaR",
    //   value: 0.5,
    // },
    // markToMarketValue: { amount: 10000, currency: "EUR" },
    // performance: {
    //   periodStart: new Date(),
    //   periodEnd: new Date(),
    //   monetaryValue: { amount: 300, currency: "EUR" },
    // },
  },
  {
    userId: "cl305plna000699t19aqezycd",
    strategyId: "strategy-002",
    riskLevelId: "riskLevel-001",
    // name: "defi Rocks!",
    // riskLevel: {
    //   name: "Medium",
    //   metric: "VaR",
    //   value: 0.3,
    // },
    // markToMarketValue: { amount: 10000, currency: "EUR" },
    // performance: {
    //   periodStart: new Date(),
    //   periodEnd: new Date(),
    //   monetaryValue: { amount: 300, currency: "EUR" },
    // },
  },
];

export function getUserPortfolios({
  userId,
}: {
  userId: User["id"];
}): Promise<null | Array<TPortfolio>> {
  console.log(`Retrieving portfolio data for user: ${userId}...`);
  const portfolioPromise: Promise<null | Array<TPortfolio>> = new Promise(
    (resolve) => {
      setTimeout(() => {
        const userPortfolios = portfoliosDB.filter(
          (it) => it.userId === userId
        );
        if (!userPortfolios) {
          resolve(null);
        } else {
          resolve(userPortfolios);
        }
      }, 300);
    }
  );
  return portfolioPromise;
}

export function getUserPortfolioInfoFromStrategyId({
  strategyId,
  userId,
}: {
  strategyId: TPortfolio["strategyId"];
  userId: User["id"];
}): Promise<null | TPortfolio> {
  console.log(
    `Retrieving portfolio data for user: ${userId} and strategyId: ${strategyId}...`
  );
  const portfolioPromise: Promise<null | TPortfolio> = new Promise(
    (resolve) => {
      setTimeout(() => {
        const portfolio = portfoliosDB.find(
          (it) => it.strategyId === strategyId
        );
        if (!portfolio) {
          resolve(null);
        } else {
          resolve(portfolio);
        }
      }, 300);
    }
  );
  return portfolioPromise;
}
