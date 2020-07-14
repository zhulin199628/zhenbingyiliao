import axios from 'axios'
import RequestUrl from "./config"
import * as parser from "./parserXML"
import Qs from "qs"

//  请求超时时间

axios.defaults.timeout = 20000;

// //  设置请求头
// axios.defaults.headers.port["Content-type"] = "application/x-www-form-urlencoded";

// //  响应拦截器
axios.interceptors.response.use(
    response => {
        return response
    }, error => {
        return Promise.reject(error)
    }
)

//  响应拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error)
});

export const post = (interfaceName, body) => {
    let data = Qs.stringify(body)
    return axios
        .post(RequestUrl.url + interfaceName, data,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, }
        )
        .then(res => {
            let parserData = parser[interfaceName](res.data)
            return parserData
        })
        .catch(error => {
            console.log(error.message);

            if (error.message === "Network Error") {
                return {
                    errorCode: "NetworkError"
                }
            } else if (error.message === "timeout of 3000ms exceeded") {
                return {
                    errorCode: "timeout"
                }
            } else {
                let errData = parser.parserRequestError(error.response.data);
                return errData
            }
        })
}


// 这里请求的返回值是 JSON

export const jsonPost = (interfaceName, body, contentType = "application/x-www-form-urlencoded") => {
    let data = Qs.stringify(body);

    console.log(RequestUrl.jsonUrl + interfaceName, body, contentType);

    return axios
        .post(RequestUrl.jsonUrl + interfaceName, body,
            {
                headers: { 'Content-Type': contentType },
            }
        )
        .then(res => {
            // return res.date
            console.log(res);
        })
        .catch(error => {
            // console.log(error.message);

            // if (error.message === "Network Error") {
            //     return {
            //         errorCode:"NetworkError"
            //     } 
            // }else if(error.message === "timeout of 3000ms exceeded"){
            //     return {
            //         errorCode:"timeout"
            //     } 
            // } else {
            //     let errData = parser.parserRequestError(error.response.data);
            //    return errData
            // }
        })
}

export const josnGet = (interfaceName, body) => {
    let data = Qs.stringify(body);
    return axios
        .get(RequestUrl.jsonUrl + interfaceName, {
            params: body
        }).then(res => {
            return res
        }).catch(error => {
            let errMessage = error.message;
            if (errMessage === "Network Error") {
                return {
                    code: "NetworkError"
                }
            } else if (errMessage === "timeout of 3000ms exceeded") {
                return {
                    code: "timeout"
                }
            } else if(error.response) {
                return error.response
            }else{
                return errMessage
            }
        })
}