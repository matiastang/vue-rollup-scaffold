/*
 * @Author: tangdaoyong
 * @Date: 2020-12-10 10:13:37
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-24 15:45:13
 * @Description: WebGL2 着色语言
 */
// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    void main () {
        // gl_Position为内置变量，表示当前点的位置
        gl_Position = a_position;
        // gl_Position为内置变量，表示当前点的大小，为浮点类型，如果赋值是整数类型会报错
        gl_PointSize = 10.0;
    }  
`
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    void main () {
        // vec4是表示四维向量，这里用来表示RGBA的值[0~1]，均为浮点数，如为整数则会报错
        gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
    }
`

/*
 * .vert - 顶点着色器
 * .tesc - 曲面细分控制着色器
 * .tese - 曲面细分评估着色器
 * .geom - 几何着色器
 * .frag - 片段着色器
 * .comp - 计算着色器
 */

export { vertexShader, fragmentShader }
