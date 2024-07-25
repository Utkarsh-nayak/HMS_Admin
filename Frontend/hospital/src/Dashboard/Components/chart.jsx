import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Patient", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Hospital Performance",
    subtitle: "Patient, Expenses, and Profit: 2014-2017",
    
  },
};

export function MyChart() {
  return (
    <Chart
      chartType="BarChart" // Correct chart type
      width="672px"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default MyChart;
