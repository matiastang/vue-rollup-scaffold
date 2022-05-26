<!--
 * @Author: matiastang
 * @Date: 2022-02-14 16:02:04
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-26 10:10:45
 * @FilePath: /vue-rollup-scaffold/src/components/dwFilterRuler/DwFilterRuler.vue
 * @Description: 
-->
<template>
    <div class="dw-ruler">
        <div class="scale-lines">
            <div
                class="scale-line-container"
                v-for="(item, index) in range"
                :key="item"
                :style="{ width: `${100 / range.length}%` }"
            >
                <div class="ruler-texts">
                    <!-- :style="{ color: `${rulerColor}` }" -->
                    <div class="ruler-text">{{ item }}</div>
                    <div class="scale-line" :style="{ height: '0.6rem' }"></div>
                    <!-- , background: `${rulerColor}` -->
                </div>
                <div
                    v-if="index !== range.length - 1"
                    class="scale-line"
                    :style="{ height: '0.3rem' }"
                ></div>
                <!-- , background: `${rulerColor}` -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DwFilterRuler',
    props: {
        /**
         * 范围（默认0%-100%）
         */
        range: {
            type: Array as () => string[],
            default: () => [
                '0%',
                '10%',
                '20%',
                '30%',
                '40%',
                '50%',
                '60%',
                '70%',
                '80%',
                '90%',
                '100%',
            ],
        },
        /**
         * 颜色#7c7c7c
         */
        rulerColor: {
            type: String,
            default: 'var(--themeColor)', //'#7c7c7c',
        },
    },
})
</script>
<style lang="scss" scoped>
@import '../style/index.scss';
.dw-ruler {
    --dw-ruler-line: var(--themeColor);
}
$--dw-ruler-line: var(--dw-ruler-line);
.dw-ruler {
    width: 100%;
    .scale-lines {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .scale-line-container {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            .ruler-texts {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                .ruler-text {
                    color: var(--themeColor);
                    font-size: 0.8rem;
                    text-align: center;
                }
                .scale-line {
                    width: 0.1rem;
                    background: $--dw-ruler-line;
                }
            }
            .scale-line {
                width: 0.1rem;
                background: $--dw-ruler-line;
            }
        }
    }
}
</style>
