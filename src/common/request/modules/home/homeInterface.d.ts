/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:31:23
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-23 17:48:24
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
 * 接口参数类型
 */
export interface ApiParamType {
    paramDbType: string //输出参数数据库对应字段类型
    paramDeletedFlag: number
    paramExplain: string //字段说明
    paramId: number
    paramIsRequired: number //入参是否必传 0=：否,1=：是
    paramKey: string //参数名称key
    paramType: string //参数类型
    paramTypeRange: string //字段类型及范围
    paramValue: string // 字段值
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
    apiParamList: ApiParamType[]
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
