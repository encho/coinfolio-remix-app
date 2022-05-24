export type TRiskLevel = {
  id: string;
  name: "Low Risk" | "Medium Risk" | "High Risk";
  description: string;
  metricType: "VaR";
  metricValue: number;
};

export const riskLevelsDB: Array<TRiskLevel> = [
  {
    id: "riskLevel-001",
    name: "Low Risk",
    description: "10% VaR",
    metricType: "VaR",
    metricValue: 0.1,
  },
  {
    id: "riskLevel-002",
    name: "Medium Risk",
    description: "20% VaR",
    metricType: "VaR",
    metricValue: 0.2,
  },
  {
    id: "riskLevel-003",
    name: "High Risk",
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
