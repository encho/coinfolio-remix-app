import invariant from "tiny-invariant";

export type TStrategyPerformanceSeriesItem = {
  date: Date;
  value: number;
};

export type TStrategyPerformanceSeries = Array<TStrategyPerformanceSeriesItem>;

const performanceSeriesDB: { [key: string]: TStrategyPerformanceSeries } = {
  "strategy-001": [
    { date: new Date("2022-01-01"), value: 200 },
    { date: new Date("2022-01-02"), value: 190 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 200 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ],
  "strategy-002": [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ],
  "strategy-003": [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 130 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 100 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 90 },
  ],
  "strategy-004": [
    { date: new Date("2022-01-01"), value: 80 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 180 },
    { date: new Date("2022-01-07"), value: 190 },
  ],
  "strategy-005": [
    { date: new Date("2022-01-01"), value: 100 },
    { date: new Date("2022-01-02"), value: 130 },
    { date: new Date("2022-01-03"), value: 175 },
    { date: new Date("2022-01-04"), value: 120 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 120 },
  ],
  "strategy-006": [
    { date: new Date("2022-01-01"), value: 180 },
    { date: new Date("2022-01-02"), value: 110 },
    { date: new Date("2022-01-03"), value: 105 },
    { date: new Date("2022-01-04"), value: 180 },
    { date: new Date("2022-01-05"), value: 110 },
    { date: new Date("2022-01-06"), value: 130 },
    { date: new Date("2022-01-07"), value: 170 },
  ],
  "strategy-007": [
    { date: new Date("2022-01-01"), value: 90 },
    { date: new Date("2022-01-02"), value: 80 },
    { date: new Date("2022-01-03"), value: 55 },
    { date: new Date("2022-01-04"), value: 80 },
    { date: new Date("2022-01-05"), value: 70 },
    { date: new Date("2022-01-06"), value: 60 },
    { date: new Date("2022-01-07"), value: 75 },
  ],
};

export function getStrategyPerformanceSeries({
  strategyId,
}: {
  strategyId: string;
}): TStrategyPerformanceSeries {
  invariant(performanceSeriesDB[strategyId]);
  return performanceSeriesDB[strategyId];
}

export function getStrategyPerformanceSeries2({}: // strategyId,
{
  strategyId: string;
}): TStrategyPerformanceSeries {
  // invariant(performanceSeriesDB[strategyId]);
  return performanceSeriesDB["strategy-002"];
}

export function getStrategyPerformanceSeriesFromIndex(
  i: number
): TStrategyPerformanceSeries {
  const performanceSeries = Object.values(performanceSeriesDB)[i];
  invariant(performanceSeries);

  return performanceSeries;
}
