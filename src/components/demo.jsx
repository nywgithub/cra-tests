import React from "react"
let arr = []
class Demo extends React.Component {
    
    componentDidMount() {
        arr.push(this)
        console.log("this", this)
        console.log("arr", arr)
        for (const item of arr) {
            console.log(
                "result",
                item.contains(document.getElementById("test"))
            )
        }
    }
    render() {
        return (
            <div className="demo">
                <div id="test"></div>
            </div>
        )
    }
}

export default Demo
