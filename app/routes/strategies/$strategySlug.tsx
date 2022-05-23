import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Container, Header } from "~/components/NewPortfolio";
import { getStrategyFromSlug, TRiskLevel } from "~/models/strategy.server";

import { PageTitle, SectionTitle } from "~/components/Typography";
import PeriodPicker from "~/components/PeriodPicker";
import { SmallPerformanceChart } from "~/components/SmallPerformanceChart";
import StrategyAssetAllocationTable from "~/components/StrategyAssetAllocationTable";

import type { TStrategy } from "~/models/strategy.server";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type LoaderData = {
  strategy: TStrategy;
};

const PERFORMANCE_SERIES_FIXTURE = [
  { date: new Date("2022-01-01"), value: 100 },
  { date: new Date("2022-01-02"), value: 110 },
  { date: new Date("2022-01-03"), value: 105 },
  { date: new Date("2022-01-04"), value: 120 },
  { date: new Date("2022-01-05"), value: 110 },
  { date: new Date("2022-01-06"), value: 130 },
  { date: new Date("2022-01-07"), value: 120 },
];

const ASSET_ALLOCATION_FIXTURE = [
  {
    ticker: "BTC",
    name: "Bitcoin",
    weight: 0.2,
    performance: 0.03,
  },
  {
    ticker: "XRP",
    name: "Ripple",
    weight: 0.1,
    performance: 0.01,
  },
  {
    ticker: "ETH",
    name: "Ethereum",
    weight: 0.1,
    performance: -0.03,
  },
  {
    ticker: "USDT",
    name: "USD Theter",
    weight: 0.6,
    performance: 0.01,
  },
];

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

export default function PortfolioDetailsPage() {
  const data = useLoaderData() as LoaderData;

  const [currentRiskLevel, setCurrentRiskLevel] = useState(
    data.strategy.riskLevels[0].id
  );

  // TODO useMemo
  const currentRiskLevelOverview = data.strategy.riskLevels.find(
    (it) => it.id === currentRiskLevel
  );

  // strategy confirmation modal state
  const [open, setOpen] = useState(false);

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
        <div className="-mt-1">
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
        <div className="flex flex-row-reverse gap-16">
          <div className="w-1/3">
            <SectionTitle>Strategy Description</SectionTitle>
            <div className="text-gray-900">{data.strategy.longDescription}</div>
          </div>
          {/* TODO make VStack */}
          <div className="flex w-2/3 flex-col gap-10">
            <div>
              <SectionTitle>Risk Level</SectionTitle>
              <p className="mb-4">
                Select the target risk level for the strategy.
              </p>
              <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {data.strategy.riskLevels.map((riskLevel) => (
                  <RiskLevelButton
                    key={riskLevel.id}
                    id={riskLevel.id}
                    name={riskLevel.name}
                    description={riskLevel.description}
                    onClick={(id) => setCurrentRiskLevel(id)}
                    isActive={riskLevel.id === currentRiskLevel}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between align-baseline">
                <SectionTitle>Performance</SectionTitle>
                <PeriodPicker />
              </div>
              <div className="w-full">
                <div className="h-[250px] w-full bg-gray-50">
                  <SmallPerformanceChart data={PERFORMANCE_SERIES_FIXTURE} />
                </div>
              </div>
            </div>
            <div>
              <SectionTitle>Asset Allocation</SectionTitle>
              <StrategyAssetAllocationTable data={ASSET_ALLOCATION_FIXTURE} />
            </div>
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
  isActive,
}: {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <button
      key={name}
      onClick={() => onClick(id)}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Investing in {strategy.name} -{" "}
                      {strategyRiskLevelOverview.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-900">
                        Select investment amount here...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
