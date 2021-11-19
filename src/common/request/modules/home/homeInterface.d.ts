/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:31:23
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 11:35:50
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/home/homeInterface.d.ts
 * @Description: home 相关类型
 */
/**
 * 接口信息类型
 */
export interface ApiInfoType {
    apiAddress: string
    apiCode: string
    apiDeletedFlag: number
    apiDescribe: string
    apiDocAddress: string
    apiExpression: string
    apiHomeRecoDesc: string
    apiHomeRecoFlag: number
    apiHomeRecoOrderNum: number
    apiHomeRecoIcon: string
    apiHomeRecoOrderNum: number
    apiHomeRecoPopularText: string
    apiIconUrl: string
    apiInfoId: number
    apiIsShow: number
    apiName: string
    apiOrderNum: number
    apiPrice: number
    apiTable: string
    apiTableName: string
    apiVersion: string
    appInstance: string
    categoryId: number
    listRecoDesc: string
    listRecoFlag: number
    requestExample: string
    requestMethod: string
    returnFieldId: string
    returnFormat: string
    returnResult: string
    tag: string
}
/**
 * 首页热榜接口返回类型
 */
export interface HotType {
    apiInfoList: ApiInfoType[]
    categoryDeletedFlag: number
    categoryDescribe: string
    categoryId: number
    categoryIsShow: number
    categoryLevelType: number
    categoryName: string
    categoryOrderNum: number
    categoryPath: string
    categoryType: number
    homeOrderNum: number
    homeRecoDesc: string
    homeRecoFlag: number
    homeRecoIcon: string
    navBarFlag: number
    navBarIcon: string
    navOrderNum: number
    parentId: number
}
