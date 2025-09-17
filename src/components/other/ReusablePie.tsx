import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

type PieData = {
  id: number | string;
  value: number;
  label: string;
};

type ReusablePieProps = {
  data: PieData[];
  width?: number;
  height?: number;
  title?: string;
};

export default function ReusablePie({
  data,
  width = 300,
  height = 300,
  title,
}: ReusablePieProps) {
  return (
    <div style={{ textAlign: "center" }}>
      {title && <h3>{title}</h3>}
      <PieChart series={[{ data }]} width={width} height={height} />
    </div>
  );
}
