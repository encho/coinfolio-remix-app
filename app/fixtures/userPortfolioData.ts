import seedrandom from "seedrandom";

export function getUserPortfolioReturnsSeries({
  strategyId,
  userId,
}: {
  strategyId: string;
  userId: string;
}): Array<{ date: Date; value: number }> {
  var rng = seedrandom(`${userId}-${strategyId}`);

  const generateReturn = () => {
    return (rng() - 0.5) / 50;
  };

  return [
    { date: new Date("2022-01-01"), value: generateReturn() },
    { date: new Date("2022-01-02"), value: generateReturn() },
    { date: new Date("2022-01-03"), value: generateReturn() },
    { date: new Date("2022-01-04"), value: generateReturn() },
    { date: new Date("2022-01-05"), value: generateReturn() },
    { date: new Date("2022-01-06"), value: generateReturn() },
    { date: new Date("2022-01-07"), value: generateReturn() },
    { date: new Date("2022-01-08"), value: generateReturn() },
    { date: new Date("2022-01-09"), value: generateReturn() },
    { date: new Date("2022-01-10"), value: generateReturn() },
  ];
}

export function getUserPortfolioPerformanceSeries({
  strategyId,
  userId,
}: {
  strategyId: string;
  userId: string;
}): Array<{ date: Date; value: number }> {
  const rng = seedrandom(`${userId}-${strategyId}`);
  const startCapital = rng() * 20000;

  const returnsSeries = getUserPortfolioReturnsSeries({ strategyId, userId });

  const performanceSeries = returnsSeries.reduce(
    (acc: { date: Date; value: number }[], it, i) => {
      if (i === 0) {
        return [...acc, { ...it, value: (1 + it.value) * startCapital }];
      }

      return [
        ...acc,
        { ...it, value: (1 + it.value) * acc[acc.length - 1].value },
      ];
    },
    []
  );

  return performanceSeries;
}

export function aggregatePerformanceSeries(
  seriesArray: Array<{ date: Date; value: number }>[]
): Array<{ date: Date; value: number }> {
  // 1. all dates
  const arrayOfDatesArrays = seriesArray.map((series) => {
    const seriesDates = series.map((it) => it.date);
    return seriesDates;
  });

  const allDates: Date[] = (arrayOfDatesArrays as Date[][]).reduce(
    (memo, current) => {
      return [...(memo as Date[]), ...current];
    },
    []
  );

  // 2. set of dates
  const uniqueDates = new Set<Date>(allDates);

  // 3 sorted array of dates
  const sortedUniqueDates = Array.from(uniqueDates).sort((a, b) => {
    return a.getTime() - b.getTime();
  });

  // console.log(sortedUniqueDates);

  // loop through... and crate new aggregated series

  const theSeries = sortedUniqueDates.map((d) => {
    const allValues = seriesArray.map((series) => {
      return series.find((it) => it.date.getTime() === d.getTime())?.value || 0;
    });

    const summedValues = allValues.reduce((memo, current) => memo + current, 0);

    return { date: d, value: summedValues };
  });

  return theSeries;
}

export function getCashFixture() {
  return 5000;
}
