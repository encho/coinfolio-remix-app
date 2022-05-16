// import numeral from "numeral";

type TSmallPerformanceChartProps = {
  data: Array<{ date: Date; value: number }>;
};

export function SmallPerformanceChart({ data }: TSmallPerformanceChartProps) {
  return (
    <div className="bg-blue-200">{JSON.stringify(data, undefined, 2)}</div>
  );
}
