import './App.css';
import {useState, useEffect} from "react";

import KFSDK from "@kissflow/lowcode-client-sdk";


function App() {

  const [inputValue, setInputValue] = useState("");

   function handleChange(event) {
    setInputValue(event.target.value);
     kf.api("/case/2/Ac7TTbuOctN8/partha/PART-0001/Status_0001_New", {
      method: "post",
      body: JSON.stringify({_id:"PART-0001",Summary:event.target.value}),
    });
  }

  const [kf, setKf] = useState();

  useEffect(() => {
    setTimeout(() => {
      loadKfSdk();
    }, 3000);
  }, []);

  async function loadKfSdk() {
    let kf = await KFSDK.initialize();
    window.kf = kf;
    setKf(kf);
    const previousValue = await kf.api("/case/2/Ac7TTbuOctN8/partha/PART-0001", {
      method: "get",
    });
    setInputValue(previousValue.Summary);
  }

  return (
    <div className="App">
      {<input
          type="text"
          value={inputValue}
          onChange={(event) => handleChange(event)}
      />}
    </div>
  );
}

export default App;
