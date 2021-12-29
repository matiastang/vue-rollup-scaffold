/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:31:23
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-16 14:34:38
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/home/homeInterface.d.ts
 * @Description: home 相关类型
 */
/**
 * 解决方案类型
 */
export interface CollapseCellDataType {
    isCategory: boolean
    name: string
    id: number
}
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
 * bannber类型
 */
export interface BannerType {
    categoryId: number
    content: string
    createTime: string
    id: number
    isHide: number
    subTitle: string | null
    summary: string | null
    target: string | null
    title: string
    updateTime: string
}

/**
 * 接口参数类型
 */
export interface ApiParamType {
    apiInfoId: number // 接口id
    isOptionalParams: number // 是否存在可选参数0否，1是
    optionalParamsValue?: string // [\r\n{\"key\":\"100001\",\"value \":\"混合基金\"}]
    paramFormType?: string // 字段form表单类型
    paramDbType: string //输出参数数据库对应字段类型
    paramDeletedFlag: number
    paramExplain: string //字段说明
    paramId: number
    paramIsRequired: number //入参是否必传 0=：否,1=：是
    paramKey: string //参数名称key
    paramType: string //参数类型
    paramTypeRange: string //字段类型及范围
    paramValue: string // 字段值
    paramOptions: string[] // 选项
    paramLoading: boolean
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
    listRecoIcon: string
    listRecoFlag: number
    requestExample: string
    requestMethod: string
    returnFieldId: string
    returnFormat: string
    returnResult: string
    tag: string
    metaColumnList: MetaType[]
}

/**
 * 返回字段说明类型
 */
export interface MetaType {
    columnName: string //'fund_code'
    columnNameCn: string // '基金代码'
    columnType: string // 'varchar(20)'
    createTime: string // '2021-11-12T18:20:54.000+08:00'
    id: number //37289
    primaryKeyTag: string // '√'
    tableName: string // 'bsc_basics'
    updateTime: string // '2021-11-12T18:20:51.000+08:00'
    desp: string
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
