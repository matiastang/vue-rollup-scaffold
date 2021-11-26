/*
 * @Author: matiastang
 * @Date: 2021-11-23 09:50:48
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-26 16:56:18
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/api/api.ts
 * @Description: 开放接口
 */
import http from '@/common/request/request'
import { ListRecoType, ApiToolParameterType } from './apiInterface'
import { ApiInfoType } from '../home/homeInterface'
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

export { apiHotInterface, apiTool, apiSearch }
