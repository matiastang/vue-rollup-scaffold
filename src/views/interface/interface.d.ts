/*
 * @Author: your name
 * @Date: 2021-11-09 18:47:20
 * @LastEditTime: 2021-11-09 19:02:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interface/interface.d.ts
 */
export interface InterfaceBaseInfo {
    title?: string
    text?: string
    id?: string
    price?: string
}

export interface InterfaceInfo {
    title: string
    data?: Array<InterfaceBaseInfo>
}

export interface InterfaceData {
    title: string
    count: string
    selected: boolean
    data?: Array<InterfaceBaseInfo> | Array<InterfaceInfo>
}
