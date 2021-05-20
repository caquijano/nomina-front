import React, { useState } from "react";
import Login from "./Login";
import Principal from "./Principal";
import Register from "./Register";


function Auth() {
  const [lg, setLg] = useState(true);
  return (
    <div style={{padding:0, margin:0, height:window.innerHeight}} className="form-group row col-lg-12  ">
      <div style={{ height:window.innerHeight}} className=" form-group col-lg-7">
        <Principal />
      </div>
      <div  style={{padding:0, margin:0, alignItems:'center', display:"flex" }} className="form-group col-lg-5">
        {lg ? <Login setLg={setLg} /> : <Register setLg={setLg} />}
      </div>
    </div>
  );
}

export default Auth;
