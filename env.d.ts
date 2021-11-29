/*
 * @Author: matiastang
 * @Date: 2021-11-29 13:44:04
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-29 13:44:05
 * @FilePath: /datumwealth-openalpha-front/env.d.ts
 * @Description: env环境变量
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BASE_API: string
    readonly VITE_APP_BASE_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
