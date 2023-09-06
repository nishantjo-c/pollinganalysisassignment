import { useEffect, useState } from "react";
import PollAnalysisSCSS from "./PollAnalysisSCSS.module.scss";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Data from "./Data";

export default function PollAnalysis() {
  const [condition, setCondition] = useState("default");
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
      `http://localhost:3000/counts?voting_choice=${condition}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data.data);
    if (condition === "true" || condition === "false") {
      setLineData({
        labels: data.data.map((obj) => obj.date.split("T")[0]),
        datasets: [
          {
            label: condition === "true" ? "Voted" : "Not Voted",
            data: data.data.map((obj) => {
              return obj.count;
            }),
            borderColor: condition === "true" ? "green" : "red",
            tension: 0.1,
          },
        ],
      });
    } else if (condition === "default") {
      console.log(data);
      setLineData({
        labels: data.data.voted.map((obj) => obj.date.split("T")[0]),
        datasets: [
          {
            label: "Voted",
            data: data.data.voted.map((obj) => {
              return obj.count;
            }),
            borderColor: "green",
            tension: 0.1,
          },
          {
            label: "Not Voted",
            data: data.data.notvoted.map((obj) => {
              return obj.count;
            }),
            borderColor: "red",
            tension: 0.1,
          },
        ],
      });
    }
  };
  useEffect(() => {
    apiCallBar();
    apiCallLine();
  }, [condition]);
  return (
    <>
      <div className={PollAnalysisSCSS.container}>
        {/* <h1>sup!!</h1> */}
        <Data />
        <div className={PollAnalysisSCSS.container__charts}>
          <div className={PollAnalysisSCSS.barchart}>
            <BarChart chartData={barData} />
          </div>
          <div className={PollAnalysisSCSS.linechart}>
            <LineChart chartData={lineData} />
            {/* dropdown */}
            <div className={PollAnalysisSCSS.choice}>
              <a href="#" className={PollAnalysisSCSS.choice__value}>
                {condition}&#8628;
              </a>
              <div className={PollAnalysisSCSS.choice__dropdown}>
                <a
                  href="#"
                  className={`${PollAnalysisSCSS.choice__value} ${PollAnalysisSCSS.choice__style}`}
                  onClick={() => setCondition("true")}
                >
                  true
                </a>

                <a
                  href="#"
                  className={`${PollAnalysisSCSS.choice__value} ${PollAnalysisSCSS.choice__style}`}
                  onClick={() => setCondition("false")}
                >
                  false
                </a>
                <a
                  href="#"
                  className={`${PollAnalysisSCSS.choice__value} ${PollAnalysisSCSS.choice__style}`}
                  onClick={() => setCondition("default")}
                >
                  default
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
