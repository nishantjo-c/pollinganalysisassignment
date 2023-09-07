import { useEffect, useState } from "react";
import addPollSCSS from "./AddPoll.module.scss";
import { Link } from "react-router-dom";

export default function AddPoll() {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (event.target[0].value === "") {
      alert("name field must not be empty!");
      event.target[1].checked = null;
      event.target[2].checked = null;
      return null;
    }
    event.target[0].value = "";

    if (
      event.target[1].checked === false &&
      event.target[2].checked === false
    ) {
      alert("Please Enter Choice Before Submitting!!!");
      return null;
    }
    event.target[1].checked = null;
    event.target[2].checked = null;
    // if (event.target[1].checked) {
    //   setChoice(true);
    // } else {
    //   setChoice(false);
    // }
  }
  async function apiCall() {
    const response = await fetch(`http://localhost:3000/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        choice,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className={addPollSCSS.wrapper}>
      <div className={addPollSCSS.container}>
        <h1 className={addPollSCSS.container__title}>Enter Polling Info</h1>
        <form
          action="submit"
          className={addPollSCSS.container__form}
          onSubmit={(event) => {
            const response = handleSubmit(event);
            if (response !== null) {
              apiCall();
            }
            setName("");
            setChoice(null);
          }}
        >
          <input
            type="text"
            placeholder="Enter your name..."
            className={addPollSCSS.container__form_name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className={addPollSCSS.container__form_radio}>
            <input
              type="radio"
              name="choice"
              id="yes"
              className={addPollSCSS.container__form_radio_input}
              onClick={(e) => {
                setChoice(true);
              }}
            />
            <label
              htmlFor="yes"
              className={addPollSCSS.container__form_radio_label}
            >
              Yes
            </label>
            <input
              type="radio"
              name="choice"
              id="no"
              className={addPollSCSS.container__form_radio_input}
              onClick={() => setChoice(false)}
            />
            <label
              htmlFor="no"
              className={addPollSCSS.container__form_radio_label}
            >
              No
            </label>
          </div>
          <div className={addPollSCSS.container__form_btns}>
            <input
              type="submit"
              value="submit"
              className={addPollSCSS.container__form_button}
            />
            <Link to="/pollanalysis">
              <button className="main__button right">See poll analysis</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
