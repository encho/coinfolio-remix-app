import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import numeral from "numeral";

import wrapComponent from "./wrapComponent";

export type TCoinAllocation = {
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
                className="text-2xl font-normal"
                fill={active.color}
                dy={-14}
              >
                {`${active.symbol}`}
              </Text>

              <Text
                textAnchor="middle"
                className="text-base"
                fill={active.color}
                dy={16}
              >
                {`${numeral(active.weight).format("0.00%")}`}
              </Text>
            </>
          ) : (
            <>
              <Text
                textAnchor="middle"
                className="fill-black text-2xl font-normal"
                dy={-14}
              >
                {`${allocation.length} Currencies`}
              </Text>

              <Text
                textAnchor="middle"
                className="fill-black text-base"
                dy={16}
              >
                100%
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
};

export default wrapComponent(StrategyAssetAllocationPieChart);
