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
            size: 13,
          },
        },
      },
      x: {
        ticks: {
          color: ["red", "green"],
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={option} />;
}
