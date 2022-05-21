import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import wrapComponent from "./wrapComponent";

type TCoin = {
  symbol: string;
  amount: number;
  color: string;
  inUSD: number;
};

type TPieChartProps = {
  width?: number;
  height?: number;
  coins: Array<TCoin>;
};

const PieChart = ({
  //  width,
  height = 200,
  coins,
}: TPieChartProps) => {
  const [active, setActive] = useState<TCoin | null>(null);
  const width = height;
  const half = width / 2;

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={coins}
            pieValue={(data) => data.amount * data.inUSD}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.symbol == data.symbol ? 12 : 8;
              return half - size;
            }}
            padAngle={0.01}
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
                className="fill-red-500"
                // fill="#000000"
                fontSize={40}
                dy={-20}
              >
                {`$${Math.floor(active.amount * active.inUSD)}`}
              </Text>

              <Text
                textAnchor="middle"
                fill={active.color}
                fontSize={20}
                dy={20}
              >
                {`${active.amount} ${active.symbol}`}
              </Text>
            </>
          ) : (
            <>
              <Text
                textAnchor="middle"
                className="fill-green-500"
                // fill="#ff0000"
                fontSize={40}
                dy={-20}
              >
                {`$${Math.floor(
                  coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                )}`}
              </Text>

              <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                {`${coins.length} Assets`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
};

export default wrapComponent(PieChart);
