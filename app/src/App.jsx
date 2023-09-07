import "./App.scss";
import { Link, Routes, Route } from "react-router-dom";
import PollAnalysis from "./components/PollAnalysis";
import AddPoll from "./components/AddPoll";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div className="page">
              <div className="main">
                <h1 className="main__title">
                  {" "}
                  Polling system & trend analysis
                </h1>
                <Link to="/addpollchoice">
                  <button className="main__button left">Add your poll</button>
                </Link>
                <Link to="/pollanalysis">
                  <button className="main__button right">
                    See poll analysis
                  </button>
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/pollanalysis" element={<PollAnalysis />} />

        <Route path="/addpollchoice" element={<AddPoll />} />
      </Routes>
    </>
  );
}

export default App;
