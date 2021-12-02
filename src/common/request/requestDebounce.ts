// import { requestThrottle } from "./requestThrottle.js"
// // import { getObjectHash } from "./util.js"
// import { dealWithTask, removeRequestTask, addTask } from './task.js'

// /**
//  * 发送请求
//  * @param {Object} options 可以包含uni.request中的所有非Funciton的参数
//  */
// function requestDebounce(options) {
// 	// let url = options.url
// 	// let hash = getObjectHash({
// 	// 	...options.data,
// 	// 	_sendUrl: url
// 	// })
// 	// return new Promise((resolve, reject) => {
// 	// 	// 取消url重复请求
// 	// 	let count = abortRequest(url)
// 	// 	let requestTask = uni.request({
// 	// 		...options,
// 	// 		success: (res) => {
// 	// 			_requestSuccess(url, res)
// 	// 			resolve(res)
// 	// 		},
// 	// 		fail: (err) => {
// 	// 			_requestFail(url, err)
// 	// 			reject(err)
// 	// 		},
// 	// 		complete: (obj) => {
// 	// 			// removeTask(hash)
// 	// 		}
// 	// 	});
// 	// 	// 添加
// 	// 	addTask(hash, options, requestTask)
// 	// })
// 	let url = options.url
// 	return new Promise((resolve, reject) => {
// 		// 取消url重复请求
// 		abortRequest(url)
// 		// 发起请求
// 		requestThrottle(options)
// 		.then((res) => {
// 			_requestSuccess(url, res)
// 			resolve(res)
// 		})
// 		.catch((err) => {
// 			_requestFail(url, err)
// 			reject(err)
// 		})
// 	})
// }

// /**
//  * 请求成功处理
//  * @param {Object} url
//  * @param {Object} res
//  */
// function _requestSuccess(url, res) {
// 	removeRequestTask((task) => {
// 		return task.options.url === url
// 	}, (task) => {
// 		for (let relevance of task.relevance) {
// 			// 触发成功回调
// 			relevance.resolve(res)
// 		}
// 	})
// }

// /**
//  * 请求失败处理
//  * @param {Object} url
//  * @param {Object} err
//  */
// function _requestFail(url, err) {
// 	removeRequestTask((task) => {
// 		if (err.errMsg && err.errMsg.endsWith('abort')) {
// 		// if (err.errMsg == "request:fail abort") {
// 			return task.isAbort && task.options.url === url
// 		}
// 		return task.options.url === url
// 	}, (task) => {
// 		for (let relevance of task.relevance) {
// 			// 触发失败回调
// 			relevance.reject(err)
// 		}
// 	})
// }

// /**
//  * 取消请求
//  * 请求地址相同就判定为相同
//  * @param {string} url 请求地址
//  * @return {number} 取消的个数
//  */
// function abortRequest(url) {
// 	return dealWithTask((task) => {
// 		if (task.options.url === url) {
// 			// {
// 			// 	errMsg: "request:fail abort"
// 			// }
// 			task.task.abort()// 取消请求
// 			task.isAbort = true
// 		}
// 	})
// }

// export {
// 	requestDebounce
// }
