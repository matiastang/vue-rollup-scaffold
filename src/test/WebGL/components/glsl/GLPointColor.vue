<!--
 * @Author: matiastang
 * @Date: 2022-05-24 15:53:32
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-24 16:17:30
 * @FilePath: /vue-rollup-scaffold/src/test/WebGL/components/glsl/GLPointColor.vue
 * @Description: 
-->
<template>
    <canvas id="GL_PointColors" width="500" height="500"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import getWebGLContext, { getWebGLProgram } from '../../utils/ts/shaderUtils'
// import { unitMatrix, rotatMatrix, rotatXMatrix, rotatYMatrix, rotatZMatrix, zoomMatrix, translationMatrix } from '../../utils/ts/shaderConst.ts';
// import vsFile from '../../shader/vertexShader/GLPointColors.vert#raw'
// import fsFile from '../../shader/fragmentShader/GLPointColors.frag#raw'
// new URL(`/static/solution/icon_${activeName.value}.svg`, import.meta.raw).href
// import { shaderURL } from 'glslShader';

// import { GlslShader, GlslVariable, GlslVariableMap } from 'webpack-glsl-minify';

// const vsFile = require('../../shader/vertexShader/GLPointColors.vert') as GlslShader;
// const fsFile = require('../../shader/fragmentShader/GLPointColors.frag') as GlslShader;

export default defineComponent({
    name: 'GLPointColors',
    setup() {
        onMounted(() => {
            // console.log(vsFile)
            // console.log(fsFile)

            const canvas = document.getElementById('GL_PointColors')
            if (canvas === null) {
                // TODO: - 错误提示
                console.log('canvas error')
                return
            }
            const gl = getWebGLContext(canvas as HTMLCanvasElement, null)
            if (gl === null) {
                // TODO: - 错误提示
                console.log('gl error')
                return
            }
            console.log(gl)
            const fsSource = `// 设置浮点数精度
precision mediump float;
void main () {
    // 计算方形区域每个片元距离方形几何中心的距离
    // gl.POINTS模式点渲染的方形区域,方形中心是0.5,0.5,左上角是坐标原点,右下角是1.0,1.0，
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    //根据距离设置片元
    if(r < 0.5){
      // 方形区域片元距离几何中心半径小于0.5，像素颜色设置红色
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else {
      // 方形区域距离几何中心半径不小于0.5的片元剪裁舍弃掉：
      discard;
    }
}`
            const vsSource = `// 定点坐标
attribute vec4 a_position;
void main () {
    gl_Position = a_position;
    gl_PointSize = 20.0;
}`
            console.log(vsSource)
            console.log(fsSource)
            // let program = getWebGLProgram(gl, vsFile.sourceCode, fsFile.sourceCode)
            let program = getWebGLProgram(gl, vsSource, fsSource)
            gl.useProgram(program)

            // 获取shader中a_position的地址
            const a_position = gl.getAttribLocation(program, 'a_position')

            // 将顶点的位置数据修改为：
            let pointPos = [0.5, -0.5, -0.5, -0.5, 0, 0, -0.5, 0.5, 0.5, 0.5]

            const buffer = gl.createBuffer()

            // 这是将shader中的a_position与buffer绑定起来
            gl.enableVertexAttribArray(a_position)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW)

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.vertexAttribPointer(
                a_position,
                2,
                gl.FLOAT,
                false,
                Float32Array.BYTES_PER_ELEMENT * 2,
                0
            )

            gl.drawArrays(gl.POINTS, 0, 5)
        })
        return {}
    },
})
</script>

<style lang="scss"></style>
