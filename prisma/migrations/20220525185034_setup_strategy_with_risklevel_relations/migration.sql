-- CreateEnum
CREATE TYPE "StrategyCategoryType" AS ENUM ('SINGLE_COIN', 'CRYPTO_MARKET_BETA');

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "StrategyCategoryType" NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskLevelsOnStrategies" (
    "strategyId" TEXT NOT NULL,
    "riskLevelId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskLevelsOnStrategies_pkey" PRIMARY KEY ("strategyId","riskLevelId")
);

-- AddForeignKey
ALTER TABLE "RiskLevelsOnStrategies" ADD CONSTRAINT "RiskLevelsOnStrategies_riskLevelId_fkey" FOREIGN KEY ("riskLevelId") REFERENCES "RiskLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskLevelsOnStrategies" ADD CONSTRAINT "RiskLevelsOnStrategies_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
