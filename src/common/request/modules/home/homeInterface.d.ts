/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:31:23
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 17:20:05
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/home/homeInterface.d.ts
 * @Description: home 相关类型
 */
/**
 * 解决方案类型
 */
export interface SolutionType {
    categoryId: number
    createTime: string
    id: number
    images: string
    isHide: number
    scenario: string
    summary: string
    target: string
    title: string
    updateTime: string
}
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
 * 树形结构二级类型
 */
export interface HotChildrenType {
    apiInfoList: ApiInfoType[]
    categoryId: number
    categoryIsShow: number
    categoryLevelType: number
    categoryName: string
    categoryOrderNum: number
    categoryPath: string
    categoryType: number
    homeRecoFlag: number
    id: number
    navBarFlag: number
    navOrderNum: number
    parentId: number
}

/**
 * 首页热榜接口返回类型
 */
export interface HotType {
    apiInfoList: ApiInfoType[]
    children?: HotChildrenType[]
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
