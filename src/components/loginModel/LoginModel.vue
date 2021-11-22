<!--
 * @Author: your name
 * @Date: 2021-11-08 18:20:27
 * @LastEditTime: 2021-11-22 19:22:18
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/loginModel/LoginModel.vue
-->
<template>
    <div class="login-model">
        <el-dialog :="$attrs" center>
            <LoginModule :jump="false" @loginSuccess="loginAction" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginModule from '@/components/loginModule/LoginModule.vue'

export default defineComponent({
    name: 'LoginModel',
    inheritAttrs: false,
    emits: ['login'],
    setup(props, context) {
        const loginAction = () => {
            context.emit('login')
        }
        return {
            loginAction,
        }
    },
    components: {
        LoginModule,
    },
})
</script>

<style lang="scss" scoped>
.login-model {
    ::v-deep(.el-dialog) {
        width: 697px;
        background: $themeBgColor;
        box-shadow: 0px 2px 32px 0px rgba(104, 104, 104, 0.5);
        border-radius: 8px;
    }
    ::v-deep(.el-dialog__header) {
        padding: 25px 25px 0px 25px;
        width: 100%;
        height: 41px;
        box-sizing: border-box;
    }
    ::v-deep(.el-dialog__body) {
        padding: 0px;
    }
    ::v-deep(.login-model-tabs) {
        padding-top: 40px;
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
</style>
