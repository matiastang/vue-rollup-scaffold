/*
 * @Author: matiastang
 * @Date: 2021-12-07 10:13:53
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-07 11:12:28
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/message/index.ts
 * @Description: 提示相关
 */
import ElMessage from '@/common/utils/message'

/**
 * 提示封装
 */
function Message(options: { message: string; type: string }) {
    const { message, type } = options
    if (type === 'error') {
        ElMessage.error(message)
    } else if (type === 'success') {
        ElMessage.success(message)
    } else if (type === 'warning') {
        if (message.endsWith('取消请求')) {
            //FIXME: - 为解决登录过期而添加，如果有主动取消，可能不满足要求
            console.info('取消请求不提示')
            return
        }
        ElMessage.warning(message)
    } else {
        ElMessage.info(message)
    }
}
Message.success = (message: string) => {
    ElMessage.success(message)
}
Message.error = (message: string) => {
    ElMessage.error(message)
}
Message.warning = (message: string) => {
    ElMessage.warning(message)
}
Message.info = (message: string) => {
    ElMessage.info(message)
}

export default Message
