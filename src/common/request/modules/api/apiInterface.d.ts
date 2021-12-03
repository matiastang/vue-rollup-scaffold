/*
 * @Author: matiastang
 * @Date: 2021-11-23 09:51:15
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 10:52:08
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

/**
 * 解决方案-接口类型
 */
export interface SolutionInterfaceType {
    apiCategoryId: number
    apiDescribe: string //'可以通过基金名称或基金代码获取基金基本信息，基金基本信息包含基金名称、基金代码、成立日期、管理人、托管人、管理费、托管费、投资风格、投资策略、业绩基准等字段信息。'
    apiIconUrl: string //'icon-A0001_D'
    apiId: number
    apiIsShow: number
    apiName: string //'基金基本信息'
    apiOrderNum: number
    createBy: string //'admin'
    createTime: string //'2021-11-30T02:59:15.000+08:00'
    deletedFlag: number
    id: number
    solutionId: number
    updateTime: string //'2021-11-30T02:59:15.000+08:00'
}

/**
 * 分类类型
 */
export interface CategoryType {
    categoryIconUrl: string //分类图标
    categoryId: number //分类id
    categoryName: string //分类名称
    categoryType: number //0：非叶子节点 1：叶子节点
    cnt: number //分类接口数量
    parentId: string //父ID
}

/**
 * 分类接口
 */
export interface CategoryApiType {
    apiInfoList: ApiInfoType[]
    categoryIconUrl: string
    categoryId: number
    categoryName: string
    categoryPath: string
    categoryType: number
    id: number
    parentId: number
}
