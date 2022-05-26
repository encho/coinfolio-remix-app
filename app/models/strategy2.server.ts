import type { Strategy } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Strategy } from "@prisma/client";

export function getStrategyFromSlug({ slug }: Pick<Strategy, "slug">) {
  return prisma.strategy.findFirst({
    where: { slug },
    include: { riskLevels: { include: { riskLevel: true } } },
  });
}

export function getStrategies() {
  return prisma.strategy.findMany({});
}
