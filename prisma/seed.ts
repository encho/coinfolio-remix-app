import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database
  // await prisma.user.delete({ where: { email } }).catch(() => {
  //   // no worries if it doesn't exist yet
  // });
  await prisma.user.deleteMany({}).catch(() => {
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
  await prisma.portfolio.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  });

  const email = "max@mustermann.de";
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
      name: "Low Risk",
      description: "10% VaR",
    },
  });
  const mediumRiskLevel = await prisma.riskLevel.create({
    data: {
      type: "MEDIUM_RISK",
      name: "Medium Risk",
      description: "30% VaR",
    },
  });
  const highRiskLevel = await prisma.riskLevel.create({
    data: {
      type: "HIGH_RISK",
      name: "High Risk",
      description: "50% VaR",
    },
  });

  // strategies
  const strategyBitcoin = await prisma.strategy.create({
    data: {
      name: "Bitcoin",
      description:
        "The worlds first digital currency. Bitcoin is tamperproof and openly traded.",
      slug: "bitcoin",
      category: "SINGLE_COIN",
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
      description:
        "Ethereum is a global virtual machine powered by blockchain technology.",
      slug: "ethereum",
      category: "SINGLE_COIN",
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

  const strategyRipple = await prisma.strategy.create({
    data: {
      name: "Ripple",
      description:
        "Ripple is both a cryptocurrency and a digital payment network for financial transactions.",
      slug: "ripple",
      category: "SINGLE_COIN",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategyRipple.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategyRipple.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategyRipple.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  const strategyCardano = await prisma.strategy.create({
    data: {
      name: "Cardano",
      description:
        "Cardano is a blockchain and smart contracts platform with a cryptocurrency called ada.",
      slug: "cardano",
      category: "SINGLE_COIN",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategyCardano.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategyCardano.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategyCardano.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  const strategySolana = await prisma.strategy.create({
    data: {
      name: "Solana",
      description:
        "Solana is a blockchain platform designed to host decentralized applications.",
      slug: "solana",
      category: "SINGLE_COIN",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategySolana.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategySolana.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategySolana.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  const strategyG10Equal = await prisma.strategy.create({
    data: {
      name: "G10 Equal Weighted",
      description:
        "Equally weighted Cryptocurrency Index composed of the 10 largest cryptocurrencies.",
      slug: "G10-vola-weighted",
      category: "CRYPTO_MARKET_BETA",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategyG10Equal.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategyG10Equal.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategyG10Equal.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  const strategyG10Vola = await prisma.strategy.create({
    data: {
      name: "G10 Volatility Weighted",
      description:
        "Volatility weighted Cryptocurrency Index composed of the 10 largest cryptocurrencies.",
      slug: "G10-vola-weighted",
      category: "CRYPTO_MARKET_BETA",
    },
  });

  await prisma.riskLevelsOnStrategies.createMany({
    data: [
      {
        strategyId: strategyG10Vola.id,
        riskLevelId: lowRiskLevel.id,
      },
      {
        strategyId: strategyG10Vola.id,
        riskLevelId: mediumRiskLevel.id,
      },
      {
        strategyId: strategyG10Vola.id,
        riskLevelId: highRiskLevel.id,
      },
    ],
  });

  await prisma.portfolio.createMany({
    data: [
      {
        userId: user.id,
        strategyId: strategyBitcoin.id,
        riskLevelId: highRiskLevel.id,
      },
      {
        userId: user.id,
        strategyId: strategyRipple.id,
        riskLevelId: lowRiskLevel.id,
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
