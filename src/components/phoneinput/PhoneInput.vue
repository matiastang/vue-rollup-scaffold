<!--
 * @Author: your name
 * @Date: 2021-11-03 15:12:34
 * @LastEditTime: 2021-11-04 15:50:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/phoneinput/PhoneInput.vue
-->
<template>
    <div class="phone-input defaultBorder flexRowCenter borderBox" :class="class">
        <el-input
            class="inputNumber defaultInput"
            :="$attrs"
            type="number"
            maxlength="11"
            clearable
        >
        </el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: ['class'],
    data() {
        return {}
    },
    setup() {
        return {}
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
.phone-input {
    width: 100%;
    height: 56px;
    justify-content: flex-start;
}
</style>
