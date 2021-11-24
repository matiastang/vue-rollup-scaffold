/*
 * @Author: matiastang
 * @Date: 2021-11-23 09:51:15
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-24 18:37:31
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/api/apiInterface.d.ts
 * @Description: 开放接口类型声明
 */
export interface ListRecoType {
    apiCode: string //接口CODE
    apiInfoId: number //接口ID
    apiName: string //接口名称
    listRecoDesc: string //列表页-热门推荐接口描述
    listRecoFlag: number //列表页-热门推荐接口标识：0-否 1-是
    listRecoIcon: string //列表页-热门推荐接口图标
    listRecoOrderNum: number //列表页-热门推荐接口排序
    listRecoPopularText: string //列表页-热门推荐接口展示字段-预留
}

/**
 * 接口在线调试工具接口，请求参数
 */
export interface ApiToolParameterType {
    apiCode: string //接口CODE
    apiVersion: string //接口版本
    requestParams: string //接口请求参数拼接
    requestType: string //接口请求方式GET/POST
    requestUrl: string //接口请求地址
    billingMethod: string //计费方式 1-余额扣减 2-套餐次数
}
