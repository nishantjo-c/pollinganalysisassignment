import { useEffect, useState } from "react";
import PollAnalysisSCSS from "./PollAnalysisSCSS.module.scss";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

export default function PollAnalysis() {
  const [condition, setCondition] = useState("true");
  // declared states
  const [barData, setBarData] = useState({
    labels: null,
    datasets: [],
  });
  const [lineData, setLineData] = useState({
    labels: null,
    datasets: [],
  });
  // barchart data
  const apiCallBar = async () => {
    const response = await fetch("http://localhost:3000/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    setBarData({
      labels: data.data.map((obj) => obj.vote_choice),
      datasets: [
        {
          label: "Votes",
          data: data.data.map((obj) => {
            return obj.count;
          }),
          backgroundColor: ["red", "green"],
        },
      ],
    });
  };
  // line chart data
  const apiCallLine = async () => {
    const response = await fetch(
      "http://localhost:3000/counts?voting_choice=default",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.data);
    if (condition === "true") {
    } else if (condition === "false") {
    } else if (condition === "default") {
    }
    // data.data.map((obj) => console.log(obj.date));
    // by true and false
    // setLineData({
    //   labels: data.data.map((obj) => obj.date),
    //   datasets: [
    //     {
    //       label: "Voted",
    //       data: data.data.map((obj) => {
    //         return obj.count;
    //       }),
    //       backgroundColor: "red",
    //     },
    //   ],
    // });
    // by default
    setLineData({
      labels: data.data.voted.map((obj) => obj.date),
      datasets: [
        {
          label: "Voted",
          data: data.data.voted.map((obj) => {
            return obj.count;
          }),
          backgroundColor: "red",
        },
        {
          label: "Not Voted",
          data: data.data.notvoted.map((obj) => {
            return obj.count;
          }),
          backgroundColor: "green",
        },
      ],
    });
  };
  useEffect(() => {
    apiCallBar();
    apiCallLine();
  }, []);
  return (
    <>
      <div className={PollAnalysisSCSS.container}>
        {/* <h1>sup!!</h1> */}
        <div className={PollAnalysisSCSS.barchart}>
          <BarChart chartData={barData} />
          <LineChart chartData={lineData} />
          <button
            onClick={() =>
              setCondition(condition === "true" ? "false" : "true")
            }
          >
            {condition}
          </button>
        </div>
      </div>
    </>
  );
}
