import { useMemo } from "react";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { max, min, extent, bisector } from "d3-array";
import { GridRows, GridColumns } from "@visx/grid";
import { curveMonotoneX } from "@visx/curve";
import wrapComponent from "./wrapComponent";

type TDataItem = {
  date: Date;
  value: number;
};

type TSmallPerformanceChartProps = {
  data: Array<TDataItem>;
  height?: number;
  width?: number;
};

const getDate = (it: TDataItem): Date => it.date;
const getValue = (it: TDataItem): number => it.value;

export const SparklineChart = wrapComponent(
  ({ data, width = 200, height = 100 }: TSmallPerformanceChartProps) => {
    console.log(data);

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          domain: extent(data, getDate) as [Date, Date],
          range: [0, width],
        }),
      [data, width]
    );

    const valueScale = useMemo(
      () =>
        scaleLinear({
          range: [height, 0],
          domain: [
            (min(data, getValue) as number) * 0.99,
            (max(data, getValue) as number) * 1.01,
          ],
          nice: true,
        }),
      [data, height]
    );

    const lastItem = data[data.length - 1];

    return (
      <svg width={width} height={height} className="overflow-visible">
        <g />

        <GridColumns
          top={0}
          scale={dateScale}
          height={height}
          stroke={"var(--color_charts_text)"}
          strokeOpacity={0.0}
          pointerEvents="none"
        />
        <GridRows
          left={0}
          scale={valueScale}
          width={width}
          stroke={"var(--color_charts_grid)"}
          numTicks={6}
          strokeOpacity={1}
          pointerEvents="none"
        />

        <LinePath
          stroke={"var(--color_charts_data_1of1)"}
          strokeWidth={2.5}
          data={data}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => valueScale(getValue(d)) ?? 0}
          curve={curveMonotoneX}
        />

        <circle
          cx={dateScale(getDate(lastItem))}
          cy={valueScale(getValue(lastItem))}
          r={6}
          fill={"var(--color_charts_data_1of1)"}
          fillOpacity={0.3}
          stroke="transparent"
        />
        <circle
          cx={dateScale(getDate(lastItem))}
          cy={valueScale(getValue(lastItem))}
          r={3}
          fill={"var(--color_charts_data_1of1)"}
          fillOpacity={1}
          stroke="transparent"
        />
      </svg>
    );
  }
);