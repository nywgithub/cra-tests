import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import Child from "./components/child"
import Date from "./components/date"
import Demo from "./components/demo"

function App() {
    const [refValue, setRefValue] = useState(0)
    function clickBtn() {
        setRefValue(refValue + 1)
    }
    return (
        <div className="App">
            <div
                style={{
                    marginBottom: 10,
                    marginTop: -10,
                    color: "#e64545",
                }}
            >
                测试
            </div>
            <button onClick={clickBtn}></button>
            <Child name={"demo"} refValue={refValue}></Child>
            <Date></Date>
            <Demo></Demo>
        </div>
    )
}

export default App
