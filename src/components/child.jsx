/*
 * @Author: niyongwei
 * @Date: 2022-03-30 22:33:31
 * @LastEditors: niyongwei
 * @LastEditTime: 2022-04-02 11:47:22
 * @FilePath: \git-work\cra-test\my-app\src\components\child.jsx
 * @Description:
 *
 * Copyright (c) 2022 by nyw, All Rights Reserved.
 */
import React, { useState, useEffect, useRef } from "react"

export default function Child(props) {
    const { refValue } = props
    const [demo, setDemo] = useState(0)
    //相当于创建了一个ref实例,初始值为50000
    let refDemo = useRef(refValue || 50000)
    console.log("refDemo", refDemo)
    const fetch = () => {
        return new Promise((resolve, reject) => {
            var res = Math.random()
            console.log("随机数", res)
            if (res > 0.5) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    }
    useEffect(() => {
        console.log("refValue", refValue)
        fetch()
            .then((res) => {
                console.log("🚀 ~ file: child.jsx ~ line 25 ~ fetch ~ res", res)
                refDemo.current = res
                setDemo(refDemo.current)
                // setDemo(res)
            })
            .catch((error) => {
                console.error(
                    "🚀 ~ file: child.jsx ~ line 31 ~ useEffect ~ error",
                    error
                )
            })
        /* const test = async () => {
            const res = await fetch()
            console.log("test阻塞")
        }
        test() */
    }, [refValue])
    useEffect(() => {
        console.log("test")
    }, [])
    return (
        <div>
            state值：{demo}
            ref值：{refDemo.current}
            <input
                ref={(e) => {
                    console.log("value==", e?.value)
                }}
                value={123}
            ></input>
        </div>
    )
}
