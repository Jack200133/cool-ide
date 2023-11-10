import AceEditor from "react-ace"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-monokai"
import "../mode-cool"
import "../trid-cool"
import '../mips-cool'
import "./Editor.css"

const Editor = ({ code, setCode, responseData, codetwo }) => {

    return (
        responseData
            ? <div className="w-full h-full flex">

                <AceEditor
                    style={{ width: "50%", height: "100%" }}
                    mode="cool"
                    theme="monokai"
                    name="UNIQUE_ID_OF_CODE"
                    onChange={setCode}
                    editorProps={{ $blockScrolling: true }}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}

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
                <AceEditor
                    style={{ width: "50%", height: "100%" }}
                    mode={codetwo ? 'tridirec' : 'mips'}
                    theme="monokai"
                    name="UNIQUE_ID_OF_DIV_RESPONSE"
                    // onChange={setCode}
                    editorProps={{ $blockScrolling: true }}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}

                    highlightActiveLine={true}
                    value={codetwo ? responseData['3D'] : responseData['ASS']}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}


                />
            </div >
            : <div className="w-full h-full">

                <AceEditor
                    style={{ width: "100%", height: "100%" }}
                    mode="cool"
                    theme="monokai"
                    name="UNIQUE_ID_OF_DIV"
                    onChange={setCode}
                    editorProps={{ $blockScrolling: true }}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}

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
            </div >
    )
}

export default Editor;
