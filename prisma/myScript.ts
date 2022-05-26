// Run with:
// npx ts-node ./prisma/myScript.ts

import { PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

async function runThis() {
  const email = "max@mustermann.de";

  const user = await prisma.user.findUnique({ where: { email } });

  const lowRiskLevel = await prisma.riskLevel.findFirst({
    where: { type: "LOW_RISK" },
  });

  console.log("user: " + JSON.stringify(user));
  console.log("low risk level: " + JSON.stringify(lowRiskLevel));

  const strategy = await prisma.strategy.create({
    data: {
      name: "heheheh",
      description: "heheheheh ehehhe eheheh",
      slug: "heheheheeeee-eeeee",
    },
  });

  invariant(lowRiskLevel);

  await prisma.riskLevelsOnStrategies.create({
    data: {
      strategyId: strategy.id,
      riskLevelId: lowRiskLevel.id,
    },
  });

  const foundStrategy = await prisma.strategy.findMany({
    where: {
      name: "heheheh",
    },
    include: { riskLevels: { include: { riskLevel: true } } },
  });

  // console.log(foundStrategy);

  console.log("foiund strats" + JSON.stringify(foundStrategy));
}

runThis()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
