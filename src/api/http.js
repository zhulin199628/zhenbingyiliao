import axios from 'axios'
import { url } from "./config"
import { message } from 'antd'
import * as parser from "./parserXML"
import Qs from "qs"

//  请求超时时间

// axios.defaults.timeout = 10000;

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
        .post(url + interfaceName, data,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then(res => {
            let parserData = parser[interfaceName](res.data)
            return parserData
        })
        .catch(error => {
            if (error.message === "Network Error") {
                return error.message
            } else {
                console.log(error, "-----error");
                let errData = parser.parserRequestError(error.response.data);
               return errData
            }
        })
}