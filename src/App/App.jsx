import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Editor from "../Editor/Editor";
import defCode from "./default.jsx"

const App = () => {

  const [code, setCode] = useState(``)
  useEffect(() => {
    setCode(defCode)
  }, [])

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
