import fly from 'flyio'

fly.config.baseURL = '/api'
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