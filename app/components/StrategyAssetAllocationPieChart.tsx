import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import wrapComponent from "./wrapComponent";

type TCoinAllocation = {
  symbol: string;
  weight: number;
  color: string;
};

type TPieChartProps = {
  width?: number;
  height?: number;
  allocation: Array<TCoinAllocation>;
};

const StrategyAssetAllocationPieChart = ({
  height = 200,
  allocation,
}: TPieChartProps) => {
  const [active, setActive] = useState<TCoinAllocation | null>(null);
  const width = height;
  const half = width / 2;

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={allocation}
            pieValue={(data) => data.weight}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.symbol == data.symbol ? 14 : 10;
              return half - size;
            }}
            padAngle={0.015}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path
                      d={pie.path(arc) as string}
                      fill={arc.data.color}
                    ></path>
                  </g>
                );
              });
            }}
          </Pie>

          {active ? (
            <>
              <Text
                textAnchor="middle"
                className="fill-black text-2xl font-normal"
                dy={-7}
              >
                {`${Math.floor(active.weight)} €`}
              </Text>

              <Text
                textAnchor="middle"
                className="text-sm"
                fill={active.color}
                dy={20}
              >
                {`${active.weight} ${active.symbol} (20%)`}
              </Text>
            </>
          ) : (
            <>
              <Text
                textAnchor="middle"
                className="fill-black text-2xl font-normal"
                dy={-7}
              >
                {`${Math.floor(
                  allocation.reduce(
                    (acc, allocation) => acc + allocation.weight,
                    0
                  )
                )} €`}
              </Text>

              <Text textAnchor="middle" className="fill-black text-sm" dy={20}>
                {`${allocation.length} Cryptocurrencies`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
};

export default wrapComponent(StrategyAssetAllocationPieChart);
