import fly from 'flyio'
import { getSignIn, getToken } from './storage'
import { history } from 'src/common/stores'
const getHeaders = (headers: any) => {
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
    (err: any) => {
        if (err.status === 401) {
            history.push({
                pathname: `/sign-in`, search: `to=${history.location.pathname}`
            })
        }
        return {
            status: 0
        }
        // 发生网络错误后会走到这里
        // return Promise.resolve("ssss")
    }
)

const http = fly

export default http