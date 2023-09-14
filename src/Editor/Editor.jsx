import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "../mode-cool"; // Asegúrate de importar tu archivo de modo aquí
import "./Editor.css";

const Editor = ({ code, setCode }) => {
    return (
        <div className="w-full h-full">

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
        </div>
    )
}

export default Editor;
