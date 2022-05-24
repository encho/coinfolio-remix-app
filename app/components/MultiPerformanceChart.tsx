import { useMemo } from "react";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { max, min, extent, bisector } from "d3-array";
import { GridRows, GridColumns } from "@visx/grid";
import { curveMonotoneX } from "@visx/curve";
import wrapComponent from "./wrapComponent";

type TDataItem = {
  date: Date;
  // value: number;
  LOW_RISK: number;
  MEDIUM_RISK: number;
  HIGH_RISK: number;
};

type TSmallPerformanceChartProps = {
  data: Array<TDataItem>;
  activeStrategy: "Low Risk" | "Medium Risk" | "High Risk";
  hoveredStrategy: "Low Risk" | "Medium Risk" | "High Risk" | null;
  height?: number;
  width?: number;
};

const getDate = (it: TDataItem): Date => it.date;
const getLowRiskValue = (it: TDataItem): number => it.LOW_RISK;
const getMediumRiskValue = (it: TDataItem): number => it.MEDIUM_RISK;
const getHighRiskValue = (it: TDataItem): number => it.HIGH_RISK;

export const MultiPerformanceChart = wrapComponent(
  ({
    data,
    activeStrategy,
    hoveredStrategy,
    width = 200,
    height = 100,
  }: TSmallPerformanceChartProps) => {
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

    const minLowRiskValue = min(data, getLowRiskValue) as number;
    const minMediumRiskValue = min(data, getMediumRiskValue) as number;
    const minHighRiskValue = min(data, getHighRiskValue) as number;

    const maxLowRiskValue = max(data, getLowRiskValue) as number;
    const maxMediumRiskValue = max(data, getMediumRiskValue) as number;
    const maxHighRiskValue = max(data, getHighRiskValue) as number;

    const lowRiskColor =
      activeStrategy === "Low Risk"
        ? "var(--color-blue-500)"
        : hoveredStrategy === "Low Risk"
        ? "var(--color-gray-350)"
        : "var(--color-gray-200)";

    const mediumRiskColor =
      activeStrategy === "Medium Risk"
        ? "var(--color-blue-500)"
        : hoveredStrategy === "Medium Risk"
        ? "var(--color-gray-350)"
        : "var(--color-gray-200)";

    const highRiskColor =
      activeStrategy === "High Risk"
        ? "var(--color-blue-500)"
        : hoveredStrategy === "High Risk"
        ? "var(--color-gray-350)"
        : "var(--color-gray-200)";

    const valueScale = useMemo(
      () =>
        scaleLinear({
          range: [height, 0],
          domain: [
            (min([
              minLowRiskValue,
              minMediumRiskValue,
              minHighRiskValue,
            ]) as number) * 0.99,
            (max([
              maxLowRiskValue,
              maxMediumRiskValue,
              maxHighRiskValue,
            ]) as number) * 1.01,
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
          // stroke={"var(--color_charts_data_1of1)"}
          stroke={lowRiskColor}
          strokeWidth={2.5}
          data={data}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => valueScale(getLowRiskValue(d)) ?? 0}
          curve={curveMonotoneX}
        />

        <LinePath
          // stroke={"#f05122"}
          stroke={mediumRiskColor}
          strokeWidth={2.5}
          data={data}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => valueScale(getMediumRiskValue(d)) ?? 0}
          curve={curveMonotoneX}
        />

        <LinePath
          // stroke={"#00ff00"}
          stroke={highRiskColor}
          strokeWidth={2.5}
          data={data}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => valueScale(getHighRiskValue(d)) ?? 0}
          curve={curveMonotoneX}
        />

        {/* <circle
          cx={dateScale(getDate(lastItem))}
          cy={valueScale(getValue(lastItem))}
          r={10}
          // fill={"#ff0000"}
          fill={"var(--color_charts_data_1of1)"}
          fillOpacity={0.3}
          // fill="rgba(0,100,255,0.2)"
          stroke="transparent"
        /> */}
        {/* <circle
          cx={dateScale(getDate(lastItem))}
          cy={valueScale(getValue(lastItem))}
          r={4}
          // fill={"var(--color_charts_data_1of1)"}
          fill={"var(--color_charts_data_1of1)"}
          fillOpacity={1}
          // fill="rgba(0,100,255,0.6)"
          stroke="transparent"
        /> */}
      </svg>
    );
  }
);
