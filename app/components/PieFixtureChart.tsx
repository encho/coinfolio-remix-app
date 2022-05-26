import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { formatMoney, formatPercentage } from "./Money";

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

const PieChart = ({ height = 200, coins }: TPieChartProps) => {
  const [active, setActive] = useState<TCoin | null>(null);
  const width = height;
  const half = width / 2;

  const totalAmount = coins.reduce(
    (acc, coin) => acc + coin.amount * coin.inUSD,
    0
  );

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={coins}
            pieValue={(data) => data.amount * data.inUSD}
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
                dy={-7}
              >
                {formatMoney({
                  amount: active.amount * active.inUSD,
                  currency: "EUR",
                })}
              </Text>

              <Text
                textAnchor="middle"
                className="text-sm"
                fill={active.color}
                dy={20}
              >
                {`${formatPercentage({
                  amount: (active.amount * active.inUSD) / totalAmount,
                })} ${active.symbol} `}
              </Text>
            </>
          ) : (
            <>
              <Text
                textAnchor="middle"
                className="fill-black text-2xl font-normal"
                dy={-7}
              >
                {formatMoney({
                  amount: totalAmount,
                  currency: "EUR",
                })}
              </Text>

              <Text textAnchor="middle" className="fill-black text-sm" dy={20}>
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
