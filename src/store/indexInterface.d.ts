/*
 * @Author: matiastang
 * @Date: 2021-11-12 14:19:31
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-29 11:13:12
 * @FilePath: /datumwealth-front-scaffold/src/store/indexInterface.d.ts
 * @Description: store 根类型定义
 */
import { UserModuleTypes } from 'store/modules/userModule/userInterface'
/**
 * root state 类型定义
 */
export interface RootStateTypes {
    name: string
}
export interface AllStateTypes extends RootStateTypes {
    userModule: UserModuleTypes
}
