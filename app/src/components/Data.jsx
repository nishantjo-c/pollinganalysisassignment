import { useEffect, useState } from "react";
import dataSCSS from "./Data.module.scss";

export default function Data() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function alldata() {
      const response = await fetch(
        "https://pollinganalysisassignment.vercel.app/data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.json();
      console.log(data);
      setData(data);
    }
    alldata();
  }, []);
  const DisplayData = data.map((obj) => {
    return (
      <tr
        key={obj.voter_id}
        style={{
          backgroundColor: obj.vote_choice === true ? "#E5D283" : "#4F709C",
          // opacity: 0.8,["#4F709C", "#E5D283"
        }}
      >
        <td className={dataSCSS.container__value}>{obj.name}</td>
        <td className={dataSCSS.container__value}>{String(obj.vote_choice)}</td>
        <td className={dataSCSS.container__value}>{obj.date.split("T")[0]}</td>
      </tr>
    );
  });

  return (
    <>
      <div className={dataSCSS.container}>
        <table className={dataSCSS.container__parent}>
          <thead className={dataSCSS.container__head}>
            <tr>
              <th className={dataSCSS.container__title}>Name</th>
              <th className={dataSCSS.container__title}>Vote Choice</th>
              <th className={dataSCSS.container__title}>Date</th>
            </tr>
          </thead>
          <tbody className={dataSCSS.container__body}>{DisplayData}</tbody>
        </table>
      </div>
    </>
  );
}
