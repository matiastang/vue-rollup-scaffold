/*
 * @Author: matiastang
 * @Date: 2021-11-23 09:51:15
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-23 10:14:39
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
