/*
 * @Author: matiastang
 * @Date: 2021-11-12 14:21:45
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 14:51:23
 * @FilePath: /datumwealth-openalpha-front/src/store/modules/userModule/userInterface.d.ts
 * @Description: UserModule 类型申明
 */
import { UserLoginInfo } from '@/user'
/**
 * UserModule 类型
 */
export interface UserModuleTypes {
    name: string
    userLoginInfo: UserLoginInfo
}
