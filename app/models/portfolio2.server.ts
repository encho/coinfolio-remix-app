import type { User, Strategy, RiskLevel, Portfolio } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Portfolio } from "@prisma/client";

export type ExpandedPortfolio = Portfolio & {
  riskLevel: RiskLevel;
  strategy: Strategy;
};

export function getUserPortfolios({ userId }: { userId: User["id"] }) {
  return prisma.portfolio.findMany({
    where: { userId },
    include: { riskLevel: {}, strategy: {} },
  });
}

type TCreateUserPortfolioArgs = {
  strategyId: Strategy["id"];
  riskLevelId: RiskLevel["id"];
  userId: User["id"];
  investmentAmount: number;
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

  return prisma.portfolio.create({
    data: {
      userId,
      strategyId,
      riskLevelId,
    },
  });
}
