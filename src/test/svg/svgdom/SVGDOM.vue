<!--
 * @Author: matiastang
 * @Date: 2022-05-24 14:49:00
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-24 15:22:11
 * @FilePath: /vue-rollup-scaffold/src/test/svg/svgdom/SVGDOM.vue
 * @Description: 
-->
<!-- import React, { useState, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';// 引入hot
import SVG from '../../resource/svgdom.svg';// 引用为React组件
// import styles from './svgdom.scss';
import { isEmpty } from 'lodash';

function SVGDOM() {

    const [circleR, setCircleR] = useState(0);

    const domClick = useCallback((e) => {
        if (circleR < 40) {
            e.target.setAttribute('r', 40);
            setCircleR(40);
        } else {
            e.target.setAttribute('r', 30);
            setCircleR(30);
        }
    }, [circleR]);

    useEffect(() => {
        // mycircle -> svgdom_svg__mycircle
        let mycircle = document.getElementById('svgdom_svg__mycircle');
        if (isEmpty(mycircle)) {
            return;
        }
        mycircle?.addEventListener('click', domClick);
    });

    return (
        <>
            <SVG />
        </>
    );
}

export default hot(SVGDOM); -->

<template>
    <SVG class="circle"></SVG>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import SVG from '../svgdom.svg'

export default defineComponent({
    name: 'SVGDOM',
    setup() {
        const circleR = ref(40)
        const domClick = (e) => {
            if (circleR.value < 40) {
                e.target.setAttribute('r', 40)
                circleR.value = 40
            } else {
                e.target.setAttribute('r', 30)
                circleR.value = 30
            }
        }

        onMounted(() => {
            // mycircle -> svgdom_svg__mycircle
            let mycircle = document.getElementById('mycircle')
            if (mycircle === null) {
                return
            }
            mycircle?.addEventListener('click', domClick)
        })
        // mycircle
        // <styletype="text/css">
        //     circle {
        //     stroke-width: 5;
        //     stroke: #f00;
        //     fill: var(--themeColor);
        //     fill: #ff0;
        //     }

        //     circle:hover {
        //     stroke: #090;
        //     fill: #fff;
        //     }
        // </style>
        return {}
    },
    components: {
        SVG,
    },
})
</script>

<style lang="scss">
@import './svgdom.scss';
// @import '../../style/index.scss';
$--dw-ruler-line: var(--themeColor);
</style>
