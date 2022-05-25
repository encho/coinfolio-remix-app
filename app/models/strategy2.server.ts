import type { User, Strategy } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Strategy } from "@prisma/client";

export function getStrategy({ id }: Pick<Strategy, "id">) {
  return prisma.strategy.findFirst({
    where: { id },
  });
}

export function getStrategies() {
  return prisma.strategy.findMany({});
}
