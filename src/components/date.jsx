import React from "react";
import { DatePicker } from "@future/datepicker/dist/react";
import "@future/datepicker/dist/style.css";
// 定时器实现防抖
function debounce(fn, wait) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}

//时间显示 date:时间 days:加几天 type:1-(年-月-日) 2-(年-月-日 时:分) 其他-(年-月-日 时:分:秒)
function addDate(date, days, type) {
  date.setDate(date.getDate() + days);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();
  let newData = '';
  if(type === '1') {
    newData = `${date.getFullYear()}-${getFormatDate(month)}-${getFormatDate(day)}`;
  }else if(type === '2') {
    newData = `${date.getFullYear()}-${getFormatDate(month)}-${getFormatDate(day)} ${getFormatDate(hour)}:${getFormatDate(minute)}`;
  }else {
    newData = `${date.getFullYear()}-${getFormatDate(month)}-${getFormatDate(day)} ${getFormatDate(hour)}:${getFormatDate(minute)}:${getFormatDate(seconds)}`;
  }
  return newData;
}
function getFormatDate(arg) {
  if (arg == undefined || arg == '') {
    return '';
  }

  let re = arg + '';
  if (re.length < 2) {
    re = '0' + re;
  }

  return re;
}

const jsonp = (url, params) => {
  return new Promise((resolve, reject) => {
    // 初始化url
    let dataString = url.indexOf("?") === -1 ? "?" : "&";
    let callback = `jsonpCB_${Math.random().toString().substr(2)}`;
    url += `${dataString}jsoncallback=${callback}`;
    if (params) {
      // 有请求参数，依次添加到url
      if (typeof params === "string") url += "&" + params;
      else if (typeof params === "object") {
        for (let key in params) {
          url += "&" + key + "=" + encodeURIComponent(params[key]);
        }
      }
    }

    const jsNode = document.createElement("script");
    jsNode.setAttribute("type", "text/javascript");
    jsNode.src = url;

    const headEle = document.getElementsByTagName("head")[0];

    window[callback] = (response) => {
      if (typeof response === "string") {
        try {
          response = JSON.parse(response);
        } catch (error) {
          reject(error);
        }
      }
      headEle.removeChild(jsNode);
      delete window[callback];

      if (response) {
        resolve(response);
      } else {
        reject("No Data");
      }
    };

    // js加载异常的情况
    jsNode.addEventListener(
      "error",
      () => {
        delete window[callback];
        headEle.removeChild(jsNode);

        reject("Load Error");
      },
      false
    );

    headEle.appendChild(jsNode);
  });
};

export default () => {
    const [value, setValue] = React.useState([]);
    const today = addDate(new Date(), 0, "1");
    const tomorrow = addDate(new Date(), 1, "1");
    const addTwentyYears = addDate(new Date(), 365 * 20, '1');
    const reduceTwentyYears = addDate(new Date(), -365 * 20, '1');
    return (
        <>
            <DatePicker 
                className="demo-rangepicker" 
                placeholder="请选择日期" 
                value={value}
                timeRange    
                // minDate={new Date(tomorrow)} maxDate={new Date(addTwentyYears)}        
                yearRange={20}
                onChange={val => setValue(val)} locale="zh-CN"
            />
            {/* <DatePicker 
                className="demo-rangepicker" 
                placeholder="请选择日期" 
                value={value}
                timeRange            
                yearRange={[reduceTwentyYears, today]}
                onChange={val => setValue(val)} locale="zh-CN"
            /> */}
        </>
    )
}