import "./App.css";
import { useState, useEffect } from "react";
import { Modal, Button } from "antd";

import KFSDK from "@kissflow/lowcode-client-sdk";

function App() {
  const [showmodal, setShowmodal] = useState(false);
  const [shema, setSchema] = useState({});
  const [value, setValue] =useState("");


   function handleOk(event) {
     kf.api("/process/2/Ac7TTbuOctN8/partha_process/Pk8EBTKl5DcB/Pk8EBTKlLzOR", {
      method: "post",
      body: JSON.stringify({_id:"Pk8EBTKl5DcB", payment: "done"}),
    });
    setValue("done");
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
    const schemaValue = await kf.api("/metadata/2/Ac7TTbuOctN8/process/partha_process/schema", {
      method: "get",
    });
    setSchema(schemaValue);
    const previousValue = await kf.api("/process/2/Ac7TTbuOctN8/partha_process/Pk8EBTKl5DcB/Pk8EBTKlLzOR", {
      method: "get",
    });
  }

  // const abc = kf.visibility();

  return (
    <div className="App">
      {value ? <div> Payment done</div> : <button onClick={(e) => setShowmodal(true)}>PayNow</button>}
      {/* {shema?.payment?.Required && !value && <div>This is required field</div>} */}
      <Modal
        title="Enter your payment details"
        open={showmodal}
        onOk={() => {
          setShowmodal(false);
        }}
        onCancel={() => {
          setShowmodal(false);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            PayNow
          </Button>
        ]}
      >
        <div> Name of the card:               <input
                type='text'
                name='name'
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
              /></div>
               <div> Card Number:               <input
                type='text'
                name='name'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
              /></div>
               <div> Name of the card:               <input
                type='text'
                name='name'
                placeholder='CVC'
                pattern='\d{3}'
                required
              /></div>
       
      </Modal>
    </div>
  );
}

export default App;
