/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:55:21
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-22 14:18:27
 * @FilePath: /datumwealth-openalpha-front/src/common/request/request.ts
 * @Description: axios简单封装
 */
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import config from './config'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'
import { useRouter } from 'vue-router'
import initInstance from './axiosInterceptors'
// import { requestDebounce } from './requestDebounce.js'

/**
 * 成功返回类型
 */
interface ResolveObj {
    code: number
    data: object | string | boolean | null
    msg: string
}

const http = {
    /**
     * 请求
     * @param options
     * @returns
     */
    request(options: AxiosRequestConfig) {
        const httpAxios = initInstance()
        const requestConfig = {
            ...options,
        }
        return new Promise<ResolveObj>((resolve, reject) => {
            httpAxios
                .request(requestConfig)
                .then((response) => {
                    const status = response.status
                    if (status !== 200) {
                        reject(response)
                        return
                    }
                    if (response && response.data) {
                        const { code } = response.data
                        if (code === 200) {
                            resolve(response.data)
                            return
                        }
                        reject(response.data)
                        return
                    }
                    reject(response)
                })
                .catch((err) => {
                    if (err.errMsg && err.errMsg.endsWith('timeout')) {
                        // 超时
                    }
                    if (err.errMsg && err.errMsg.endsWith('abort')) {
                        // 取消
                    }
                    reject(err)
                })
        })
    },
    /**
     * get请求
     * @param url
     * @param options
     * @returns
     */
    get(url: string, options: AxiosRequestConfig = {}) {
        options.url = url
        options.method = 'GET'
        return this.request(options)
    },
    /**
     * post请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    post(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'POST'
        return this.request(options)
    },
    /**
     * put请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    put(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'PUT'
        return this.request(options)
    },
    /**
     * delete请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    delete(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    },
}

export default http
