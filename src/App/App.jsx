import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Editor from "../Editor/Editor";
import Terminal from "../Terminal/Terminal";
import defCode from "./default.jsx"
import {
  useApi,
} from '@hooks'

const App = () => {

  const [code, setCode] = useState(``)
  const {
    isLoading, hasError, data, handleRequest,
  } = useApi()

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  const handleRun = () => {
    const method = 'POST'
    const a = JSON.stringify(code)
    const body = {
      code: code,
    }
    const routhe = 'has_errors'
    handleRequest(method, routhe, body)

  }

  useEffect(() => {
    setCode(defCode)
  }, [])

  useEffect(() => {
    if (hasError) {
      console.log(hasError)
    }
  }, [hasError])

  return (

    <div className="flex flex-col w-screen h-screen" >
      <Menu setFileText={setCode} hanlder={handleRun} />
      <div className="flex-grow">
        <Editor code={code} setCode={setCode} />
      </div>

      <Terminal data={data} />
    </div>
  )
}

export default App;
