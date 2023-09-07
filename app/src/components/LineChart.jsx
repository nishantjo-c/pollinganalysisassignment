import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function LineChart({ chartData }) {
  const option = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            size: 13,
          },
        },
      },
      x: {
        ticks: {
          color: "black",
          font: {
            size: 13,
          },
        },
      },
    },
  };
  return (
    <>
      <Line data={chartData} options={option} />
    </>
  );
}
