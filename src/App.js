import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [laguage, setLaguage] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    Axios.get("https://libretranslate.com/languages", {
      headers: { accept: "application/json" },
    }).then((res) => {
      setLaguage(res.data);
    });
  }, []);

  const getLaguage = () => {
    let data = {
      q: input,
      source: from,
      target: to,
    };
    Axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      setOutput(response.data.translatedText);
    });
  };
  return (
    <div className="app">
      <h1 className="display-2 text-white text-center p-3">
        Translate Appilication
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-md">
            <div className="form-floating pb-3">
              <select
                onChange={(e) => setFrom(e.target.value)}
                className="form-select"
              >
                {laguage.map((opt, i) => (
                  <option key={i} value={opt.code}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelectGrid">From({from})</label>
            </div>
            <textarea
              onInput={(e) => setInput(e.target.value)}
              className="form-control"
              cols="50"
              rows="8"
              placeholder="Input"
              id="floatingTextarea2"
            ></textarea>
          </div>
          <div className="col-md">
            <div className="form-floating pb-3">
              <select
                onChange={(e) => setTo(e.target.value)}
                className="form-select"
              >
                {laguage.map((opt, i) => (
                  <option key={i} value={opt.code}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelectGrid">To({to})</label>
            </div>
            <textarea
              value={output}
              readOnly="readonly"
              cols="50"
              rows="8"
              className="form-control"
              placeholder="Output"
              id="floatingTextarea2"
            ></textarea>
          </div>
        </div>
        <div className="d-grid pt-4">
          <button
            type="button"
            onClick={() => getLaguage()}
            className="btn btn-info"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
