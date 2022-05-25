-- CreateEnum
CREATE TYPE "RiskLevelType" AS ENUM ('LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK');

-- CreateTable
CREATE TABLE "RiskLevel" (
    "id" TEXT NOT NULL,
    "type" "RiskLevelType" NOT NULL DEFAULT E'LOW_RISK',

    CONSTRAINT "RiskLevel_pkey" PRIMARY KEY ("id")
);
