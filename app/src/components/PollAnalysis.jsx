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
    const response = await fetch(
      "https://pollinganalysisassignment.vercel.app/results",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
          backgroundColor: ["#4F709C", "#E5D283"],
        },
      ],
    });
  };
  // line chart data
  const apiCallLine = async () => {
    const response = await fetch(
      `https://pollinganalysisassignment.vercel.app/counts?voting_choice=${condition}`,
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
            borderColor: condition === "true" ? "#E5D283" : "#4F709C",
            tension: 0.1,
          },
        ],
      });
    } else if (condition === "default") {
      const votedDates = [];
      data.data.voted.map((obj) => votedDates.push(obj.date.split("T")[0]));
      const notVotedDates = [];
      data.data.notvoted.map((obj) =>
        notVotedDates.push(obj.date.split("T")[0])
      );
      const allDates = [...new Set([...votedDates, ...notVotedDates])];
      // console.log(allDates);

      setLineData({
        labels: allDates.map((date) => date.split("T")[0]),
        datasets: [
          {
            label: "Voted",
            data: allDates.map((date) => {
              const index = votedDates.indexOf(date);
              if (index !== -1) {
                return data.data.voted[index].count;
              } else {
                return 0;
              }
            }),
            borderColor: "#E5D283",
            tension: 0.1,
          },
          {
            label: "Not Voted",
            data: allDates.map((date) => {
              const index = notVotedDates.indexOf(date);
              if (index !== -1) {
                return data.data.notvoted[index].count;
              } else {
                return 0;
              }
            }),
            borderColor: "#4F709C",
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
        <h1 className={PollAnalysisSCSS.about}>Voters</h1>
        <Data />
        <h1 className={PollAnalysisSCSS.about}>
          Left shows the bar graph with the total no of <i>vote choices</i> &
          Right shows the Line chart with total <i>vote choices by date</i>{" "}
        </h1>
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
