export type TRiskLevel = {
  id: string;
  type: "LOW_RISK" | "MEDIUM_RISK" | "HIGH_RISK";
  name: string;
  description: string;
  metricType: "VaR";
  metricValue: number;
};

export const riskLevelsDB: Array<TRiskLevel> = [
  {
    id: "riskLevel-001",
    type: "LOW_RISK",
    name: "Lowyy Risk",
    description: "10% VaR",
    metricType: "VaR",
    metricValue: 0.1,
  },
  {
    id: "riskLevel-002",
    type: "MEDIUM_RISK",
    name: "Mediumyyy Risk",
    description: "20% VaR",
    metricType: "VaR",
    metricValue: 0.2,
  },
  {
    id: "riskLevel-003",
    type: "HIGH_RISK",
    name: "High Riskoskyjyy",
    description: "30% VaR",
    metricType: "VaR",
    metricValue: 0.3,
  },
];

export function getRiskLevels(): Promise<null | Array<TRiskLevel>> {
  console.log(`Retrieving riskLevels data...`);
  const riskLevelsPromise: Promise<null | Array<TRiskLevel>> = new Promise(
    (resolve) => {
      setTimeout(() => {
        const foundRiskLevels = riskLevelsDB;
        if (!foundRiskLevels) {
          resolve(null);
        } else {
          resolve(foundRiskLevels);
        }
      }, 300);
    }
  );
  return riskLevelsPromise;
}

export function getRiskLevelFromId({
  id,
}: {
  id: string;
}): Promise<null | TRiskLevel> {
  console.log(`Retrieving strategy data for slug: ${id}...`);
  const riskLevelPromise: Promise<null | TRiskLevel> = new Promise(
    (resolve) => {
      setTimeout(() => {
        const riskLevel = riskLevelsDB.find((it) => it.id === id);
        if (!riskLevel) {
          resolve(null);
        } else {
          resolve(riskLevel);
        }
      }, 500);
    }
  );
  return riskLevelPromise;
}
