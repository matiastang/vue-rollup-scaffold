/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:41:42
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 19:21:41
 * @FilePath: /datumwealth-openalpha-front/src/common/request/config.ts
 * @Description: 配置
 */
import { AxiosRequestConfig } from 'axios'
const baseURL = 'https://test.mini.datumwealth.cn/open/api/'
const config: AxiosRequestConfig = {
    baseURL,
    timeout: 10000,
}

export default config
export { baseURL }
