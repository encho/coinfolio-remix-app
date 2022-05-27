import { CurrencyBangladeshiIcon } from "@heroicons/react/outline";
import seedrandom from "seedrandom";
import invariant from "tiny-invariant";

import type { Strategy } from "~/models/strategy2.server";

export function getUserPortfolioReturnsSeries({
  strategyId,
  userId,
}: {
  strategyId: string;
  userId: string;
}): Array<{ date: Date; value: number }> {
  var rng = seedrandom(`${userId}-${strategyId}`);

  const generateReturn = () => {
    // return (rng() - 0.5) / 50;
    return (rng() - 0.4) / 50;
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
    { date: new Date("2022-01-11"), value: generateReturn() },
    { date: new Date("2022-01-12"), value: generateReturn() },
    { date: new Date("2022-01-13"), value: generateReturn() },
    { date: new Date("2022-01-14"), value: generateReturn() },
    { date: new Date("2022-01-15"), value: generateReturn() },
    { date: new Date("2022-01-16"), value: generateReturn() },
    { date: new Date("2022-01-17"), value: generateReturn() },
    { date: new Date("2022-01-18"), value: generateReturn() },
    { date: new Date("2022-01-19"), value: generateReturn() },
    { date: new Date("2022-01-20"), value: generateReturn() },
    { date: new Date("2022-01-21"), value: generateReturn() },
    { date: new Date("2022-01-22"), value: generateReturn() },
    { date: new Date("2022-01-23"), value: generateReturn() },
    { date: new Date("2022-01-24"), value: generateReturn() },
    { date: new Date("2022-01-25"), value: generateReturn() },
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

export function getUserPortfolioAssetAllocation({
  strategy,
}: {
  strategy: Strategy;
}): Array<{ currency: string; percentage: number }> {
  if (strategy.slug === "bitcoin") {
    return [
      {
        currency: "BTC",
        percentage: 0.6,
      },
      { currency: "USDT", percentage: 0.4 },
    ];
  }
  return [
    { currency: "BTC", percentage: 0.25 * 0.4 },
    { currency: "ETH", percentage: 0.25 * 0.4 },
    { currency: "BNB", percentage: 0.25 * 0.4 },
    { currency: "XRP", percentage: 0.25 * 0.4 },
    { currency: "USDT", percentage: 0.6 },
  ];
}

export function getCurrencyMetaInfo(currency: string) {
  // const currencyDB = [
  //   { currency: "BTC", color: "var(--color-orange-500)", currentPrice: 27228 },
  //   { currency: "USDT", color: "var(--color-blue-500)", currentPrice: 0.93 },
  //   { currency: "ETH", color: "var(--color-cyan-500)", currentPrice: 27228 },
  //   { currency: "BNB", color: "var(--color-yellow-500)", currentPrice: 0.93 },
  //   { currency: "XRP", color: "var(--color-purple-500)", currentPrice: 0.93 },
  // ];
  const currencyDB = [
    { currency: "BTC", color: "var(--color-orange-500)", currentPrice: 1 },
    { currency: "USDT", color: "var(--color-blue-500)", currentPrice: 1 },
    { currency: "ETH", color: "var(--color-cyan-500)", currentPrice: 1 },
    { currency: "BNB", color: "var(--color-yellow-500)", currentPrice: 1 },
    { currency: "XRP", color: "var(--color-purple-500)", currentPrice: 1 },
  ];

  const currencyMetaInfo = currencyDB.find((it) => it.currency === currency);

  invariant(currencyMetaInfo);

  return currencyMetaInfo;
}

type TRealAssetAllocationItem = {
  symbol: string;
  color: string;
  amount: number;
  inUSD: number;
};

export function percentageToRealAssetAllocation(
  percentageAssetAllocation: Array<{ currency: string; percentage: number }>,
  portfolioValue: number
): Array<TRealAssetAllocationItem> {
  console.log(portfolioValue);
  console.log(percentageAssetAllocation);

  const realAssetAllocation = percentageAssetAllocation.map((percAAItem) => {
    const { color, currentPrice } = getCurrencyMetaInfo(percAAItem.currency);
    return {
      symbol: percAAItem.currency,
      color,
      inUSD: currentPrice,
      amount: (percAAItem.percentage * portfolioValue) / currentPrice,
    };
  });

  return realAssetAllocation;
}

export function aggregateAssetAllocations(
  assetAllocationsArray: Array<{ currency: string; percentage: number }>[]
): Array<{ currency: string; percentage: number }> {
  // 1. all dates
  const arrayOfCurrencies = assetAllocationsArray.map((assetAllocation) => {
    const currencies = assetAllocation.map((it) => it.currency);
    return currencies;
  });

  const allCurrencies: string[] = (arrayOfCurrencies as string[][]).reduce(
    (memo, current) => {
      return [...(memo as string[]), ...current];
    },
    []
  );

  // 2. set of dates
  const uniqueCurrencies = new Set<string>(allCurrencies);

  // 3 sorted array of dates
  // const sortedUnique = Array.from(uniqueDates).sort((a, b) => {
  //   return a.getTime() - b.getTime();
  // });

  const theAssetAllocation = Array.from(uniqueCurrencies).map((currency) => {
    const allCurrencyPercentages = assetAllocationsArray.map(
      (assetAllocation) => {
        return (
          assetAllocation.find((it) => it.currency === currency)?.percentage ||
          0
        );
      }
    );

    const summedCurrencyPercentages = allCurrencyPercentages.reduce(
      (memo, current) => memo + current,
      0
    );

    return { currency, percentage: summedCurrencyPercentages };
  });

  const summedPercentages = theAssetAllocation.reduce(
    (memo, current) => memo + current.percentage,
    0
  );

  const normalizedAssetAllocation = theAssetAllocation.map((it) => ({
    ...it,
    percentage: it.percentage / summedPercentages,
  }));

  return normalizedAssetAllocation;
}
