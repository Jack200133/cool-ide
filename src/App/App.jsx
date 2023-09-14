import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

import "../mode-cool"; // Asegúrate de importar tu archivo de modo aquí

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
    <AceEditor
      mode="cool"
      theme="monokai"
      name="UNIQUE_ID_OF_DIV"
      onChange={setCode}
      editorProps={{ $blockScrolling: true }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      height="100vh"
      width="60vw"
      highlightActiveLine={true}
      value={code}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  )
}

export default App;
