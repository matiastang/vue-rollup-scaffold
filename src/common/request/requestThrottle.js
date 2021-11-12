/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:55:21
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-11 19:33:38
 * @FilePath: /datumwealth-openalpha-front/src/common/request/requestThrottle.js
 * @Description:
 */
import { getObjectHash } from './util.js'
import { addTask, sameTask, removeTask } from './task.js'

import axios from 'axios'

/**
 * 发送请求
 * @param {Object} options 可以包含uni.request中的所有非Funciton的参数
 */
function requestThrottle(options) {
    let hash = getObjectHash({
        ...options.data,
        _sendUrl: options.url,
    })
    return new Promise((resolve, reject) => {
        let task = sameTask(hash)
        if (task !== null) {
            // 重复请求
            // 添加回调
            task.relevance.push({
                resolve,
                reject,
            })
            return
        }

        var CancelToken = axios.CancelToken
        var source = CancelToken.source()

        axios
            .get('/user/12345', {
                cancelToken: source.token,
            })
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message)
                } else {
                    // handle error
                }
            })
        // cancel the request (the message parameter is optional)
        source.cancel('Operation canceled by the user.')

        let taska = axios.request({})
        taska.ca
        axios.post(
            '/member/login',
            {
                loginType,
                username,
                password,
            },
            {
                baseURL: 'https://test.mini.datumwealth.cn/open/api/',
            }
        )

        // let requestTask = uni.request({
        // 	...options,
        // 	success: (res) => {
        // 		_sendSuccess(hash, res)
        // 		resolve(res)
        // 	},
        // 	fail: (err) => {
        // 		_sendFail(hash, err)
        // 		reject(err)
        // 	},
        // 	complete: (obj) => {
        // 		removeTask(hash)
        // 	}
        // });
        // 添加
        // addTask(hash, options, requestTask)
    })
}

/**
 * 请求成功处理
 * @param {Object} hash
 * @param {Object} res
 */
function _sendSuccess(hash, res) {
    let task = sameTask(hash)
    if (task === null) {
        return
    }
    for (let relevance of task.relevance) {
        // 触发成功回调
        relevance.resolve(res)
    }
}

/**
 * 请求失败处理
 * @param {Object} hash
 * @param {Object} err
 */
function _sendFail(hash, err) {
    let task = sameTask(hash)
    if (task === null) {
        return
    }
    for (let relevance of task.relevance) {
        // 触发失败回调
        relevance.reject(err)
    }
}

export { requestThrottle }
