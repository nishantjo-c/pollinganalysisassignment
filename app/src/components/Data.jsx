import { useEffect, useState } from "react";
import dataSCSS from "./Data.module.scss";

export default function Data() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function alldata() {
      const response = await fetch("http://localhost:3000/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
          backgroundColor:
            obj.vote_choice === true
              ? "rgba(0, 128, 0, .8)"
              : "rgba(255,0,0, .8)",
          // opacity: 0.8,
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
        <table>
          <thead className={dataSCSS.container__head}>
            <tr>
              <th className={dataSCSS.container__title}>Name</th>
              <th className={dataSCSS.container__title}>Vote Choice</th>
              <th className={dataSCSS.container__title}>Date</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    </>
  );
}
