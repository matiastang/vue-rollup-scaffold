/*
 * @Author: matiastang
 * @Date: 2021-11-23 09:50:48
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 14:08:23
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/api/api.ts
 * @Description: 开放接口
 */
import http from '@/common/request/request'
import {
    ListRecoType,
    ApiToolParameterType,
    SolutionInterfaceType,
    CategoryType,
    CategoryApiType,
} from './apiInterface'
import { ApiInfoType, HotType } from '../home/homeInterface'
import { apiPrefix } from '@/common/request/prefix'
/**
 * 获取列表页热门推荐接口
 */
const apiHotInterface = () => {
    return http.get<ListRecoType[]>(`${apiPrefix}/openApi/listReco`)
}

/**
 * /openApi/list/keyword首页搜索接口
 */
const apiSearch = (keyword: string) => {
    return http.get<ApiInfoType[]>(`${apiPrefix}/openApi/list/keyword?keyword=${keyword}`)
}

/**
 * 接口调试
 * @param parameters
 * @returns
 */
const apiTool = (parameters: ApiToolParameterType) => {
    return http.toolRequest({
        url: `${apiPrefix}/apiTool/exeToolQuery`,
        method: 'POST',
        data: parameters,
    })
}

/**
 * 获取解决方案关联接口详细信息
 * @returns
 */
const solutionInterfaceList = (solutionId: number) => {
    return http.get<{
        rows: SolutionInterfaceType[]
    }>(`${apiPrefix}/api_soletioin/manage/list`, {
        solutionId,
    })
}

/**
 * 获取列表页左边接口分类
 * @returns
 */
const categoryList = () => {
    return http.get<CategoryType[]>(`${apiPrefix}/openApi/list/menu`)
}

/**
 * 获取接口列表
 * @returns
 */
const categoryInterfaceList = (categoryId: number, categoryType: number) => {
    return http.get<CategoryApiType[]>(`${apiPrefix}/openApi/list`, {
        categoryId,
        categoryType,
    })
}

/**
 * 获取接口详情-分类目录
 * @returns
 */
const detailCategoryList = () => {
    return http.get<HotType[]>(`${apiPrefix}/openApi/detail/menu`)
}

/**
 * 获取接口详情
 * @returns
 */
const detailInterfaceInfo = (id: number) => {
    return http.get<ApiInfoType>(`${apiPrefix}/openApi/detail/${id}`)
}

export {
    apiHotInterface,
    apiTool,
    apiSearch,
    solutionInterfaceList,
    categoryList,
    categoryInterfaceList,
    detailCategoryList,
    detailInterfaceInfo,
}
