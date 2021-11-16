<!--
 * @Author: matiastang
 * @Date: 2021-11-16 15:35:33
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 15:36:47
 * @FilePath: /datumwealth-openalpha-front/src/components/emailInput/EmailInput.vue
 * @Description: 邮箱输入框
-->
<template>
    <div class="email-input defaultBorder flexRowCenter borderBox" :class="phoneClass">
        <el-input class="defaultInput" :="$attrs" type="text" clearable> </el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'EmailInput',
    inheritAttrs: false,
    props: ['phoneClass'],
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
.email-input {
    width: 100%;
    height: 56px;
    justify-content: flex-start;
}
</style>
