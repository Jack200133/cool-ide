import { useState } from "react";
import Menu from "../Menu/Menu";
import Editor from "../Editor/Editor";

const App = () => {
  const [code, setCode] = useState(`CLASS Main {
    x : Int;
    LET
    10
    "SDAS"
    -- ASDASD
    : 
    == 
    <= 
    
  }`)

  return (

    <div className="flex flex-col w-screen h-screen" >
      <Menu setFileText={setCode} />
      <div className="flex-grow">
        <Editor code={code} setCode={setCode} />
      </div>
    </div>
  )
}

export default App;
