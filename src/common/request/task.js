import config from './config.js'
/**
 * 请求的task列表
 */
let REQUEST_TASK = []

/**
 * 添加task
 * @param {Object} hash
 * @param {Object} options
 * @param {Object} task
 */
function addTask(hash, options, task) {
    REQUEST_TASK.push({
        hash, // hash
        options, // 参数
        task, // 请求task
        isAbort: false, // 是否取消
        relevance: [], // 重复请求
    })
}

/**
 * 查找相同task
 * @param {Object} hash
 * @return {Object} 查找的相同task
 */
function sameTask(hash) {
    for (var i = 0; i < REQUEST_TASK.length; i++) {
        let task = REQUEST_TASK[i]
        // 只查询未取消的
        if (!task.isAbort && task.hash === hash) {
            return task
        }
    }
    return null
}

/**
 * 移除task
 * @param {Object} hash
 */
function removeTask(hash) {
    for (var i = 0; i < REQUEST_TASK.length; i++) {
        let task = REQUEST_TASK[i]
        if (task.hash === hash) {
            REQUEST_TASK.splice(i, 1)
            return
        }
    }
}

/**
 * 查找处理task
 * @param {Object} cb
 */
function dealWithTask(cb) {
    if (REQUEST_TASK.length <= 0) {
        return
    }
    let count = 0
    for (let i = 0; i < REQUEST_TASK.length; i++) {
        let task = REQUEST_TASK[i]
        cb(task)
    }
}

/**
 * 移除请求
 * @param {Object} judgeBack
 * @param {Object} cb
 */
function removeRequestTask(judgeBack, cb) {
    let indexs = []
    if (REQUEST_TASK.length <= 0) {
        return
    }
    for (let i = 0; i < REQUEST_TASK.length; i++) {
        let task = REQUEST_TASK[i]
        if (judgeBack(task)) {
            indexs.push(i)
        }
    }
    for (let i = indexs.length - 1; i >= 0; i--) {
        let task = REQUEST_TASK[i]
        cb(task)
        REQUEST_TASK.splice(i, 1)
    }
}

/**
 * 取消全部请求
 */
const abortAll = () => {
    dealWithTask((task) => {
        task.task.abort() // 取消请求
        task.isAbort = true
    })
}

/**
 * 取消指定的请求
 */
const abortRequestTasks = (urls) => {
    if (!Array.isArray(urls)) {
        console.error('abortRequestTasks参数需要为数组')
        return
    }
    if (urls.length <= 0 || REQUEST_TASK.length <= 0) {
        return
    }
    urls = urls.map((url) => {
        if (!url.startsWith('http') && !url.startsWith('https')) {
            return config.baseUrl + url
        }
        return url
    })
    dealWithTask((task) => {
        if (urls.includes(task.options.url)) {
            // {
            // 	errMsg: "request:fail abort"
            // }
            task.task.abort() // 取消请求
            task.isAbort = true
        }
    })
}

/**
 * 保留指定请求，其他全部移除
 */
const keepRequestTasks = (urls) => {
    if (!Array.isArray(urls)) {
        console.error('keepRequestTasks参数需要为数组')
        return
    }
    if (urls.length <= 0 || REQUEST_TASK.length <= 0) {
        return
    }
    urls = urls.map((url) => {
        if (!url.startsWith('http') && !url.startsWith('https')) {
            return config.baseUrl + url
        }
        return url
    })
    dealWithTask((task) => {
        if (!urls.includes(task.options.url)) {
            // {
            // 	errMsg: "request:fail abort"
            // }
            task.task.abort() // 取消请求
            task.isAbort = true
        }
    })
}

export {
    addTask,
    sameTask,
    removeTask,
    dealWithTask,
    removeRequestTask,
    abortAll,
    abortRequestTasks,
    keepRequestTasks,
}
