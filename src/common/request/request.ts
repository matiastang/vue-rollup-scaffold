/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:55:21
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 11:18:15
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
 * 失败返回类型
 */
export interface RejectType {
    msg: string
}

const http = {
    /**
     * 请求
     * @param options
     * @returns
     */
    request<T>(options: AxiosRequestConfig) {
        const httpAxios = initInstance()
        const requestConfig = {
            ...options,
        }
        /**
         * 成功返回类型
         */
        interface ResolveType {
            code: number
            data: T
            msg: string
        }
        return new Promise<ResolveType>((resolve, reject: (reason: RejectType) => void) => {
            httpAxios
                .request(requestConfig)
                .then((response) => {
                    const status = response.status
                    if (status !== 200) {
                        reject({
                            msg: `错误码${status}`,
                        })
                        return
                    }
                    if (response && response.data) {
                        const { code } = response.data
                        if (code === 200) {
                            resolve(response.data)
                            return
                        }
                        reject({
                            msg: `接口${code}`,
                        })
                        return
                    }
                    reject({
                        msg: '返回数据异常',
                    })
                })
                .catch((err) => {
                    const errMessage = err.msg
                    if (typeof errMessage === 'string' && errMessage.endsWith('timeout')) {
                        reject({
                            msg: '请求超时',
                        })
                        return
                    }
                    if (typeof errMessage === 'string' && errMessage.endsWith('abort')) {
                        reject({
                            msg: '取消请求',
                        })
                        return
                    }
                    reject({
                        msg: errMessage,
                    })
                })
        })
    },
    /**
     * get请求
     * @param url
     * @param options
     * @returns
     */
    get<T>(url: string, options: AxiosRequestConfig = {}) {
        options.url = url
        options.method = 'GET'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * post请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    post<T>(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'POST'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * put请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    put<T>(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'PUT'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    /**
     * delete请求
     * @param url
     * @param data
     * @param options
     * @returns
     */
    delete<T>(url: string, data: object, options: AxiosRequestConfig = {}) {
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return new Promise<T>((resolve, reject) => {
            this.request<T>(options)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
}

export default http
