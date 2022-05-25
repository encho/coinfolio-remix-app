import type { User } from "@prisma/client";
import type { TStrategy } from "./strategy.server";
import type { TRiskLevel } from "./riskLevel.server";
import { getRiskLevels } from "./riskLevel.server";
import { getStrategies } from "./strategy.server";
import invariant from "tiny-invariant";

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
};

export type TExpandedPortfolio = {
  userId: User["id"]; // primary key
  strategyId: TStrategy["id"]; // primary key
  riskLevelId: TRiskLevel["id"];
  strategy: TStrategy;
  riskLevel: TRiskLevel;
};

export type TPortfolioPeriodPerformance = {
  periodStart: Date;
  periodEnd: Date;
  monetaryValue: {
    amount: number;
    currency: "EUR";
  };
};

const portfoliosDB: Array<TPortfolio> = [
  {
    userId: "cl305plna000699t19aqezycd",
    strategyId: "strategy-001",
    riskLevelId: "riskLevel-001",
  },
  {
    userId: "cl305plna000699t19aqezycd",
    strategyId: "strategy-007",
    riskLevelId: "riskLevel-003",
  },
];

// TODO into own module?
export type TPortfolioPerformanceSeries = Array<{ date: Date; value: number }>;

const portfolioPerformanceSeriesDB: Array<{
  userId: string;
  strategyId: string;
  performanceSeries: TPortfolioPerformanceSeries;
}> = [
  {
    userId: "cl305plna000699t19aqezycd",
    strategyId: "strategy-001",
    performanceSeries: [
      { date: new Date(), value: 100 },
      { date: new Date(), value: 200 },
    ],
  },
  {
    userId: "cl305plna000699t19aqezycd",
    strategyId: "strategy-007",
    performanceSeries: [
      { date: new Date(), value: 20000 },
      { date: new Date(), value: 30000 },
    ],
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

export async function getUserExpandedPortfolios({
  userId,
}: {
  userId: User["id"];
}): Promise<null | Array<TExpandedPortfolio>> {
  console.log(`Retrieving expanded portfolio data for user: ${userId}...`);

  console.log(`LENGTH NOW: ${portfoliosDB.length}`);

  // get the data to join
  const riskLevels = await getRiskLevels();
  const strategies = await getStrategies();

  if (!riskLevels || !strategies) {
    throw Error();
  }

  const portfolioPromise: Promise<null | Array<TExpandedPortfolio>> =
    new Promise((resolve) => {
      setTimeout(() => {
        const userPortfolios = portfoliosDB.filter(
          (it) => it.userId === userId
        );

        const userExpandedPortfolios = userPortfolios.map((it) => {
          const strategy = strategies.find((s) => s.id === it.strategyId);
          const riskLevel = riskLevels.find((rl) => rl.id === it.riskLevelId);

          invariant(strategy);
          invariant(riskLevel);

          return { ...it, strategy, riskLevel };
        });

        if (!userExpandedPortfolios) {
          resolve(null);
        } else {
          resolve(userExpandedPortfolios);
        }
      }, 300);
    });
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
        // TODO filter for user too
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

export function getUserPortfolioPerformanceSeriesFromStrategyId({
  strategyId,
  userId,
}: {
  strategyId: TPortfolio["strategyId"];
  userId: User["id"];
}): Promise<null | TPortfolioPerformanceSeries> {
  console.log(
    `Retrieving portfolio performance series for user: ${userId} and strategyId: ${strategyId}...`
  );
  const performanceSeriesPromise: Promise<null | TPortfolioPerformanceSeries> =
    new Promise((resolve) => {
      setTimeout(() => {
        const { performanceSeries } = portfolioPerformanceSeriesDB.find(
          (it) => it.strategyId === strategyId && it.userId === userId
        ) as { performanceSeries: TPortfolioPerformanceSeries };
        if (!performanceSeries) {
          resolve(null);
        } else {
          resolve(performanceSeries);
        }
      }, 300);
    });
  return performanceSeriesPromise;
}

type TCreateUserPortfolioArgs = {
  strategyId: TStrategy["id"];
  riskLevelId: TRiskLevel["id"];
  investmentAmount: number;
  userId: User["id"];
};

export function createUserPortfolio({
  strategyId,
  riskLevelId,
  investmentAmount,
  userId,
}: TCreateUserPortfolioArgs) {
  console.log(
    `creating user portfolio with userId: ${userId}, riskLevelId: ${riskLevelId}, strategyId: ${strategyId}, investment amount: ${investmentAmount} `
  );

  // const portfoliosDB: Array<TPortfolio> = [
  //   {
  //     userId: "cl305plna000699t19aqezycd",
  //     strategyId: "strategy-001",
  //     riskLevelId: "riskLevel-001",
  //   },
  //   {
  //     userId: "cl305plna000699t19aqezycd",
  //     strategyId: "strategy-007",
  //     riskLevelId: "riskLevel-003",
  //   },
  // ];

  console.log(`LENGTH BEFORE: ${portfoliosDB.length}`);

  portfoliosDB.push({ userId, strategyId, riskLevelId });

  console.log(`LENGTH AFTER: ${portfoliosDB.length}`);

  // TODO return promise to be more realistic
  return { id: "new-portfolio-id" };
  // return prisma.note.create({
  //   data: {
  //     title,
  //     body,
  //     user: {
  //       connect: {
  //         id: userId,
  //       },
  //     },
  //   },
  // });
}
