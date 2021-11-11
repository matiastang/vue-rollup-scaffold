/*
 * @Author: your name
 * @Date: 2021-11-11 14:08:49
 * @LastEditTime: 2021-11-11 14:17:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/check/interfaceCheck.ts
 */
/*
 * @Author: your name
 * @Date: 2021-11-11 14:08:49
 * @LastEditTime: 2021-11-11 14:11:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/check/interfaceCheck.ts
 */
/**
 * 接口id校验
 * @param id 接口id
 * @returns 是否符合规则
 */
function interface_id_check(id: string) {
    if (id && id.trim() !== '') {
        return true
    }
    console.warn('接口id为无效值')
    return false
}

export { interface_id_check }
