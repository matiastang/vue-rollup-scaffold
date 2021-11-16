/*
 * @Author: matiastang
 * @Date: 2021-11-16 14:09:39
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 15:14:21
 * @FilePath: /datumwealth-openalpha-front/src/common/request/axiosInterceptors.ts
 * @Description: axiosInstance | 拦截器
 */
import axios, { AxiosInstance } from 'axios'
import config from './config'
import {
    localStorageKey,
    localStorageRead,
    localStorageRemoveAll,
} from 'utils/storage/localStorage'
/**
 * axiosInstance
 */
let _instance: AxiosInstance | null = null
/**
 * 初始化拦截器
 */
const initInstance = () => {
    if (_instance) {
        return _instance
    }

    // 自定义实例默认值
    const axiosInstance = axios.create(config)

    // 添加请求拦截器
    axiosInstance.interceptors.request.use(
        (config) => {
            // 添加token
            const userToken = localStorageRead<string>(localStorageKey.userTokenKey)
            if (userToken && userToken.trim() !== '') {
                if (config.headers) {
                    config.headers.Authorization = `Bearer ${userToken}`
                } else {
                    config.headers = {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(
        (response) => {
            const { code } = response.data
            if (code === 401) {
                // {"msg":"登录已过期，请重新登录","code":401}
                localStorageRemoveAll()
                window.location.href = '#/login'
            }
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosInstance.request

    _instance = axiosInstance
    return _instance
}

export default initInstance
