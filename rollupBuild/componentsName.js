/*
 * @Author: matiastang
 * @Date: 2022-05-23 15:32:00
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-23 17:48:31
 * @FilePath: /vue-front-scaffold/rollupBuild/componentsName.js
 * @Description: 获取组件名称
 */
// 通过 mode 接口拿到 src/components 下的所有文件夹名作为打包后的模块
// import fs from 'fs'
// import path from 'path'
// const componentDir = 'components'
// const cModuleNames = fs.readdirSync(path.resolve(componentDir))
// const cModuleMap = cModuleNames.reduce((prev, name) => {
//     prev[name] = `${componentDir}/${name}/index.js`

//     return prev
// }, {})

const cModuleMap = {
    dwDragVerify: 'src/components/dwDragVerify/index.ts',
    dwFilterRuler: 'src/components/dwFilterRuler/index.ts',
    dwWechatLogin: 'src/components/dwWechatLogin/index.ts',
}

export default cModuleMap
