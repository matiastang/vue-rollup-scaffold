/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:23:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-29 16:53:07
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/home/home.ts
 * @Description: 首页相关接口
 */
import http from '@/common/request/request'
import { HotType, SolutionType, BannerType } from './homeInterface'
import { apiPrefix, contentPrefix } from '@/common/request/prefix'

enum HomeListType {
    // 首页banner
    banner = 'INDEX_BANNER',
    // 帮助中心
    help = 'HELP_CENTER',
    // 合作伙伴
    partner = 'PARTNER',
}

/**
 * 首页banner
 * @returns
 */
const homeBanner = () => {
    return http.get<BannerType[]>(
        `${contentPrefix}/article/list?categoryCode=${HomeListType.banner}`
    )
}

/**
 * 获取首页接口分类导航树接口
 */
const homeInterfaceNavigationTree = () => {
    return http.get<HotType[]>(`${apiPrefix}/openApi/navBar/tree`)
}

/**
 * 获取接口列表结构树
 */
const homeInterfaceTree = () => {
    return http.get<HotType[]>(`${apiPrefix}/openApi/tree`)
}

/**
 * 首页解决方案
 * @returns
 */
const homeSolution = () => {
    return http.get<SolutionType[]>(`${contentPrefix}/solution/home`)
}

/**
 * 获取首页推荐热门接口列表(含内容)
 */
const homeHotInterface = () => {
    return http.get<HotType[]>(`${apiPrefix}/openApi/homeReco`)
}

/**
 * 首页合作伙伴
 * @returns
 */
const homePartner = () => {
    return http.get<BannerType[]>(
        `${contentPrefix}/article/list?categoryCode=${HomeListType.partner}`
    )
}

/**
 * 解决方案列表-查询所有
 * @returns
 */
const solutionList = () => {
    return http.get<BannerType[]>(`${contentPrefix}/solution/lise`)
}

export {
    homeBanner,
    homeInterfaceNavigationTree,
    homeInterfaceTree,
    homeSolution,
    homeHotInterface,
    homePartner,
    solutionList,
}
