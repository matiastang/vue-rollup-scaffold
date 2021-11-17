import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Response } from '@/@types'
import { localStorageKey, localStorageRead } from '@/common/utils/storage/localStorage'
// 创建axios实例
const service = axios.create({
    // axios vite 配置文档 https://cn.vitejs.dev/guide/env-and-mode.html
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 10000,
})

// request拦截器
service.interceptors.request.use((config) => {
    const token = localStorageRead(localStorageKey.userTokenKey)
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const onResponseError = (err: Response.AxiosError): Promise<Response.AxiosError> => {
    const status = err.response?.status
    if (['Network Error'].includes(err.message)) {
        ElMessage.error(err.message)
    } else if (status && [500, 502, 503, 504].includes(status)) {
        ElMessage.error('服务器异常,请稍后再试！')
    }
    return Promise.reject(err)
}
const onResponseSuccess = (response: Response.AxiosResponse): Response.AxiosResponse => {
    if (response.data.code === 200) {
        return response.data
    } else {
        ElMessage.error(response.data.msg)
        throw response.data
    }
}
service.interceptors.response.use(onResponseSuccess, onResponseError)

export enum RequestMethod {
    get = 'get',
    post = 'post',
    put = 'put',
    patch = 'patch',
    delete = 'delete',
}

export default service
