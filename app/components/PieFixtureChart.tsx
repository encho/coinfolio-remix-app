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
            // innerRadius={({ data }) => {
            //   const size = active && active.symbol == data.symbol ? 12 : 8;
            //   return half - size;
            // }}
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
                className="fill-black"
                fontSize={26}
                dy={-7}
              >
                {`${Math.floor(active.amount * active.inUSD)}$`}
              </Text>

              <Text
                textAnchor="middle"
                fill={active.color}
                fontSize={16}
                dy={20}
              >
                {`${active.amount} ${active.symbol} (20%)`}
              </Text>
            </>
          ) : (
            <>
              <Text
                textAnchor="middle"
                className="fill-black"
                fontSize={26}
                dy={-7}
              >
                {`${Math.floor(
                  coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                )}$`}
              </Text>

              <Text textAnchor="middle" fill="#aaa" fontSize={16} dy={20}>
                {`${coins.length} Cryptocurrencies`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
};

export default wrapComponent(PieChart);
