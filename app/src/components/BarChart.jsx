import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, plugins } from "chart.js/auto";

export default function BarChart({ chartData }) {
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
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          color: ["#4F709C", "#E5D283"],
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={option} />;
}
