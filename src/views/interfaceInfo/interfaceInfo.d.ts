/*
 * @Author: your name
 * @Date: 2021-11-10 10:52:50
 * @LastEditTime: 2021-11-10 15:56:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceInfo/interfaceInfo.d.ts
 */
export interface InterfaceInfo {
    title?: string
    text?: string
    id?: string
    price?: string
}

export interface InterfaceInfoTableHeader {
    title: string
    key: string
}

export interface InterfaceListGroup {
    url?: string
    title: string
    count: number
    selected: boolean
}
export interface InterfaceListCell {
    title: string
    selected: boolean
}
