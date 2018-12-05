import fly from 'flyio'
import { getSignIn, getToken } from './storage'
const getHeaders = (headers: any) => {
    // let headers = new Headers()
    if (getSignIn()) {
        headers.Token = getToken()
    }
    return headers
}
fly.config.baseURL = '/api'
fly.interceptors.request.use((request) => {
    // 给所有请求添加自定义header
    getHeaders(request.headers)
    // 打印出请求体
    // console.log(request.body)
    // 终止请求
    // var err=new Error("xxx")
    // err.request=request
    // return Promise.reject(new Error(""))

    // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request
})
fly.interceptors.response.use(
    (response) => {
        // 只将请求结果的data字段返回
        return response.data
    },
    (err) => {
        // 发生网络错误后会走到这里
        // return Promise.resolve("ssss")
    }
)

const http = fly

// 获取get请求的url
// const getURL = (url: string, params = {}) => {
//     if (Object.keys(params).length === 0) {
//         return url
//     }
//     let str = `${url}?`
//     for (const attr in params) {
//         if (params.hasOwnProperty(attr)) {
//             str += `${attr}=${params[attr]}&`
//         }
//     }
//     str = str.substring(0, str.length - 1)
//     return str
// }

// 获取头部
// const getHeaders = () => {
//     return new Headers({
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'text/plain'
//     })
// }
// const http = {
//     get(url: string, params: {} = {}, options: Headers = new Headers()) {
//         return fetch(getURL(`/api${url}`, params), {
//             method: 'GET',
//             headers: Object.assign({}, getHeaders(), options),
//         }).then(response => response.json()).catch(this.errHandler)
//     },
//     post(url: string, params: {} = {}, options: Headers = new Headers()) {
//         return fetch(getURL(`/api${url}`, params), {
//             method: 'POST',
//             headers: Object.assign({}, getHeaders(), options),
//         }).then(response => response.json()).catch(this.errHandler)
//     },
//     errHandler(err: Error) {
//         console.log(err)
//     }
// }
export default http