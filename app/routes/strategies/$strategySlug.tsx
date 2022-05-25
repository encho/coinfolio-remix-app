import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CashIcon } from "@heroicons/react/outline";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import numeral from "numeral";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { Container, Header } from "~/components/NewPortfolio";
import { getStrategyFromSlug } from "~/models/strategy.server";
import { TRiskLevel } from "~/models/riskLevel.server";
import { createUserPortfolio } from "~/models/portfolio.server";

import { requireUserId } from "~/session.server";
import { PageTitle, SectionTitle } from "~/components/Typography";
import PeriodPicker from "~/components/PeriodPicker";
import StrategyAssetAllocationPieChart from "~/components/StrategyAssetAllocationPieChart";
import { MultiPerformanceChart } from "~/components/MultiPerformanceChart";

// TODO deprecate table for now?
// import StrategyAssetAllocationTable from "~/components/StrategyAssetAllocationTable";

import type { TStrategy } from "~/models/strategy.server";
import type { TCoinAllocation } from "~/components/StrategyAssetAllocationPieChart";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type LoaderData = {
  strategy: TStrategy;
};

const RETURNS_FIXTURE = [
  { date: new Date("2022-01-01"), value: 0 },
  { date: new Date("2022-01-02"), value: 0.02 },
  { date: new Date("2022-01-03"), value: -0.01 },
  { date: new Date("2022-01-04"), value: 0.023 },
  { date: new Date("2022-01-05"), value: -0.005 },
  { date: new Date("2022-01-06"), value: 0.002 },
  { date: new Date("2022-01-07"), value: 0.012 },
  { date: new Date("2022-01-08"), value: 0.02 },
  { date: new Date("2022-01-09"), value: -0.011 },
  { date: new Date("2022-01-10"), value: -0.005 },
  { date: new Date("2022-01-11"), value: 0.018 },
  { date: new Date("2022-01-12"), value: -0.022 },
];

const RISKY_ASSET_ALLOCATION_FIXTURE = [
  { symbol: "BTC", weight: 0.5, color: "var(--color-orange-500)" },
  { symbol: "ETH", weight: 0.25, color: "var(--color-cyan-500)" },
  { symbol: "XRP", weight: 0.25, color: "var(--color-yellow-500)" },
];

type TStrategyAssetAllocation = Array<TCoinAllocation>;

function getStrategyAssetAllocation({
  riskLevel,
}: {
  riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
}): TStrategyAssetAllocation {
  const theterWeight =
    riskLevel === "High Risk" ? 0.2 : riskLevel === "Medium Risk" ? 0.4 : 0.7;
  const theterAllocation = {
    symbol: "USDT",
    weight: theterWeight,
    color: "var(--color-blue-500)",
  };

  const weightedRiskyAllocation = RISKY_ASSET_ALLOCATION_FIXTURE.map((it) => ({
    ...it,
    weight: it.weight * (1 - theterWeight),
  }));

  return [...weightedRiskyAllocation, theterAllocation];
}

type TTimeseries = Array<{ date: Date; value: number }>;

function getStrategyPerformanceSeries({
  riskLevel,
}: {
  riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
}): TTimeseries {
  const startCapital = 1;
  const returnsMultiplicator =
    riskLevel === "High Risk" ? 3 : riskLevel === "Medium Risk" ? 2 : 1;

  const performanceSeries = RETURNS_FIXTURE.reduce<TTimeseries>(
    (memo, current, i) => {
      const strategyHPR = current.value * returnsMultiplicator + 1;

      if (i === 0) {
        return [{ ...current, value: strategyHPR * startCapital }];
      }
      return [
        ...memo,
        { ...current, value: strategyHPR * memo[memo.length - 1].value },
      ];
    },
    []
  );

  return performanceSeries;
}

const PERFORMANCE_SERIES_FIXTURE = getStrategyPerformanceSeries({
  riskLevel: "Low Risk",
});

type TStrategyPerfromanceItem = {
  date: Date;
  LOW_RISK: number;
  MEDIUM_RISK: number;
  HIGH_RISK: number;
};

type TStrategyPerformanceDataframe = Array<TStrategyPerfromanceItem>;

const LOW_RISK_SERIES = getStrategyPerformanceSeries({
  riskLevel: "Low Risk",
});
const MEDIUM_RISK_SERIES = getStrategyPerformanceSeries({
  riskLevel: "Medium Risk",
});
const HIGH_RISK_SERIES = getStrategyPerformanceSeries({
  riskLevel: "High Risk",
});

const PERFORMANCE_DATAFRAME: TStrategyPerformanceDataframe = [];

LOW_RISK_SERIES.forEach((it, i) => {
  const date = it.date;
  const LOW_RISK = it.value;
  const MEDIUM_RISK = MEDIUM_RISK_SERIES[i].value;
  const HIGH_RISK = HIGH_RISK_SERIES[i].value;
  PERFORMANCE_DATAFRAME.push({ date, LOW_RISK, MEDIUM_RISK, HIGH_RISK });
});

// const PERFORMANCE_SERIES_FIXTURE = [
//   { date: new Date("2022-01-01"), value: 100 },
//   { date: new Date("2022-01-02"), value: 110 },
//   { date: new Date("2022-01-03"), value: 105 },
//   { date: new Date("2022-01-04"), value: 120 },
//   { date: new Date("2022-01-05"), value: 110 },
//   { date: new Date("2022-01-06"), value: 130 },
//   { date: new Date("2022-01-07"), value: 120 },
// ];

// const ASSET_ALLOCATION_FIXTURE = [
//   {
//     ticker: "BTC",
//     name: "Bitcoin",
//     weight: 0.2,
//     performance: 0.03,
//   },
//   {
//     ticker: "XRP",
//     name: "Ripple",
//     weight: 0.1,
//     performance: 0.01,
//   },
//   {
//     ticker: "ETH",
//     name: "Ethereum",
//     weight: 0.1,
//     performance: -0.03,
//   },
//   {
//     ticker: "USDT",
//     name: "USD Theter",
//     weight: 0.6,
//     performance: 0.01,
//   },
// ];

function getCurrentPeriodPerformance(
  dataframe: TStrategyPerformanceDataframe,
  riskLevel: "Low Risk" | "Medium Risk" | "High Risk"
): { from: Date; to: Date; value: number } {
  const firstItem = dataframe[0];
  const lastItem = dataframe[dataframe.length - 1];

  invariant(firstItem.date);
  invariant(lastItem.date);

  const from = firstItem.date;
  const to = lastItem.date;

  const period = { from, to };

  // by default returns value accessor for Low Risk Performance
  const valueAccessor: (it: TStrategyPerfromanceItem) => number =
    riskLevel === "High Risk"
      ? (it) => it.HIGH_RISK
      : riskLevel === "Medium Risk"
      ? (it) => it.MEDIUM_RISK
      : (it) => it.LOW_RISK;

  const firstValue = valueAccessor(firstItem);
  const lastValue = valueAccessor(lastItem);

  const percentagePerformance = lastValue / firstValue - 1;

  return { ...period, value: percentagePerformance };
}

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.strategySlug, "strategySlug not found");
  const slug = params.strategySlug;

  const strategy = await getStrategyFromSlug({
    slug,
  });

  if (!strategy) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({
    strategy,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();

  const strategyId = form.get("strategyId");
  const riskLevelId = form.get("riskLevelId");
  const investmentAmount = Number(form.get("investmentAmount"));

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof strategyId !== "string" ||
    typeof riskLevelId !== "string" ||
    typeof investmentAmount !== "number"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const newUserPortfolio = createUserPortfolio({
    userId,
    strategyId,
    riskLevelId,
    investmentAmount,
  });
  // const userPortfolio = await db.userPortfolio.create({ data: fields });
  // return redirect(
  //   `/portal?newUserPortfolio=${userPortfolio.id}`
  // );

  return redirect(`/portal?newUserPortfolio=${newUserPortfolio.id}`);

  // return redirect(
  //   `/portal?newStrategy=${userId}----${strategyId}-${riskLevelId}-${investmentAmount}`
  // );
};

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

  const [currentRiskLevel, setCurrentRiskLevel] = useState(
    data.strategy.riskLevels[0].id
  );

  // TODO rename to hoveredRiskLevel
  const [hovered, setHovered] = useState<string | null>(null);

  // TODO useMemo
  const currentRiskLevelOverview = data.strategy.riskLevels.find(
    (it) => it.id === currentRiskLevel
  );

  // TODO useMemo
  const currentHoveredRiskLevelOverview = hovered
    ? data.strategy.riskLevels.find((it) => it.id === hovered)
    : null;

  // strategy confirmation modal state
  const [open, setOpen] = useState(true);

  // TODO do we need null check here?
  const currentPeriodPerformance = currentRiskLevelOverview
    ? getCurrentPeriodPerformance(
        PERFORMANCE_DATAFRAME,
        currentRiskLevelOverview.name
      )
    : null;

  return (
    <div>
      <div className="fixed bottom-10 right-10">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-full border border-transparent bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add to Portfolio
        </button>
      </div>

      <Header />
      <Container>
        <div className="inline-flex items-center rounded-md bg-gray-150 px-2.5 py-0.5 text-sm font-medium text-gray-550">
          Crypto Strategy
        </div>
        <div>
          <PageTitle>{data.strategy.name}</PageTitle>
        </div>

        {currentRiskLevelOverview && (
          <ModalExample
            open={open}
            setOpen={setOpen}
            strategy={{ name: data.strategy.name }}
            strategyRiskLevelOverview={currentRiskLevelOverview}
          />
        )}

        <div className="mb-14 grid w-full grid-flow-col grid-cols-[1fr_320px] grid-rows-[auto_auto] gap-x-24">
          <div>
            <SectionTitle>Strategy Risk Level</SectionTitle>
          </div>
          <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {data.strategy.riskLevels.map((riskLevel) => (
              <RiskLevelButton
                key={riskLevel.id}
                id={riskLevel.id}
                name={riskLevel.name}
                description={riskLevel.description}
                onClick={(id) => setCurrentRiskLevel(id)}
                onMouseOver={(id) => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                isActive={riskLevel.id === currentRiskLevel}
              />
            ))}
          </div>
          <div>
            <SectionTitle>Strategy Description</SectionTitle>
          </div>
          <div className="text-gray-900">{data.strategy.description}</div>
        </div>

        {/* grid based layout */}
        <div className="grid w-full grid-flow-col grid-cols-[1fr_320px] grid-rows-[auto_320px] gap-x-24">
          <div className="flex justify-between align-baseline">
            <SectionTitle>Historical Performance</SectionTitle>
            <PeriodPicker />
          </div>
          <div className="relative bg-gray-50">
            {currentRiskLevelOverview ? (
              <MultiPerformanceChart
                data={PERFORMANCE_DATAFRAME}
                activeStrategy={currentRiskLevelOverview.name}
                hoveredStrategy={
                  currentHoveredRiskLevelOverview
                    ? currentHoveredRiskLevelOverview.name
                    : null
                }
              />
            ) : null}
            {currentPeriodPerformance ? (
              <div className="absolute top-2 left-4">
                <PerformanceFigure {...currentPeriodPerformance} />
              </div>
            ) : null}
          </div>
          <div className="">
            <SectionTitle>Asset Allocation</SectionTitle>
          </div>
          <div className="">
            {currentRiskLevelOverview ? (
              <StrategyAssetAllocationPieChart
                allocation={getStrategyAssetAllocation({
                  riskLevel: currentRiskLevelOverview.name,
                })}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);

//   return <div>An unexpected error occurred: {error.message}</div>;
// }

// export function CatchBoundary() {
//   const caught = useCatch();

//   if (caught.status === 404) {
//     return <div>Portfolio not found</div>;
//   }

//   throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }

function RiskLevelButton({
  id,
  name,
  description,
  onClick,
  onMouseOver,
  onMouseLeave,
  isActive,
}: {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  onClick: (id: string) => void;
  onMouseOver: (id: string) => void;
  onMouseLeave: (id: string) => void;
}) {
  return (
    <button
      key={name}
      onClick={() => onClick(id)}
      onMouseOver={() => onMouseOver(id)}
      onMouseLeave={() => onMouseLeave(id)}
      className={classNames(
        isActive
          ? "border-2 border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-350 hover:bg-gray-50",
        "relative flex rounded border bg-white px-6 py-5 shadow-sm focus-within:ring-0 focus-within:ring-blue-200 focus-within:ring-offset-2 focus:outline-none"
      )}
    >
      <div className="text-left">
        <span className="absolute inset-0" aria-hidden="true" />
        <p
          className={classNames(
            isActive ? "" : "text-gray-900",
            "text-sm font-bold"
          )}
        >
          {name}
        </p>
        <p className={classNames(isActive ? "" : "text-gray-900", "text-sm")}>
          {description}
        </p>
      </div>
    </button>
  );
}

type TModalExampleProps = {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  strategy: Pick<TStrategy, "name">;
  strategyRiskLevelOverview: Pick<TRiskLevel, "id" | "name" | "description">;
};

function ModalExample({
  open,
  setOpen,
  strategy,
  strategyRiskLevelOverview,
}: TModalExampleProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded bg-white px-8 pt-8 pb-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <CashIcon
                      className="h-6 w-6 text-blue-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-2 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold leading-6 text-gray-900"
                    >
                      {/* Please set the Investment Amount */}
                      How much would you like to invest?
                    </Dialog.Title>
                  </div>
                </div>

                <div className="mt-10">
                  <form method="post">
                    <div>
                      <input
                        type="hidden"
                        name="strategyId"
                        value="MY_GREAT_STRATEGY_ID"
                      />
                      <input
                        type="hidden"
                        name="riskLevelId"
                        value="MY_GREAT_RISK_LEVEL_ID"
                      />

                      <div className="flex justify-center">
                        <div className="w-full">
                          <label
                            htmlFor="investmentAmountNumber"
                            className="mb-1 inline-block text-sm font-medium text-gray-900"
                          >
                            Investment Amount
                          </label>
                          <input
                            type="number"
                            name="investmentAmount"
                            className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
      "
                            id="investmentAmountNumber"
                            placeholder="Amount in Euro"
                          />

                          <div className="mt-1 text-xs text-gray-500">
                            max. 2,580.89 € available
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-gray-900">
                      I want to invest{" "}
                      <span className="font-semibold">1,000.00 €</span> in the{" "}
                      <span className="font-semibold">{strategy.name}</span>{" "}
                      strategy with a risk level of:{" "}
                      <span className="font-semibold">
                        {strategyRiskLevelOverview.name}
                      </span>
                      .
                    </div>

                    <div>
                      <div className="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                          // onClick={() => setOpen(false)}
                        >
                          Yes, Invest Now
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

type TPerformanceFigureProps = {
  from: Date;
  to: Date;
  value: number;
};

function PerformanceFigure({ from, to, value }: TPerformanceFigureProps) {
  const formattedPercentagePerformance = numeral(Math.abs(value)).format(
    "0.00%"
  );

  const sign = value === 0 ? "" : value < 0 ? "-" : "+";

  return (
    <div className="flex flex-col gap-0">
      <div className="text-3xl font-bold text-gray-900">
        {sign}
        {formattedPercentagePerformance}
      </div>
      <div className="text-sm text-gray-400">from 11.11.2022 to 12.05.2023</div>
    </div>
  );
}
