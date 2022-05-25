import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getStrategies } from "~/models/strategy.server";

const prisma = new PrismaClient();

async function seed() {
  const email = "max@mustermann.de";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.riskLevelsOnStrategies.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.strategy.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  });
  // cleanup the existing database table
  await prisma.riskLevel.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("coinfolio", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const lowRiskLevel = await prisma.riskLevel.create({
    data: {
      type: "LOW_RISK",
      name: "Basso Rischio",
      description: "10% VaR",
    },
  });
  const mediumRiskLevel = await prisma.riskLevel.create({
    data: {
      type: "MEDIUM_RISK",
      name: "Medio Rischio",
      description: "30% VaR",
    },
  });
  const highRiskLevel = await prisma.riskLevel.create({
    data: {
      type: "HIGH_RISK",
      name: "Alto Rischio",
      description: "50% VaR",
    },
  });

  // strategies
  const strategyBitcoin = await prisma.strategy.create({
    data: {
      name: "Bitcoin Single",
      description: "Bitcoin Single",
      slug: "bitcoin",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategyBitcoin.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategyBitcoin.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategyBitcoin.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  const strategyEthereum = await prisma.strategy.create({
    data: {
      name: "Ethereum",
      description: "Ethereum Single",
      slug: "ethereum",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategyEthereum.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategyEthereum.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategyEthereum.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  // notes
  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
