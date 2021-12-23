<!--
 * @Author: matiastang
 * @Date: 2021-12-23 11:12:50
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-23 11:23:45
 * @FilePath: /datumwealth-openalpha-front/src/components/wechatBinderModel/WechatBinderModel.vue
 * @Description: 
-->
<template>
    <div class="wechat-binder-model">
        <el-dialog :="$attrs" center>
            <WechatLogin
                v-if="weixinLogin"
                appid="wx6d902dc1624282c4"
                scope="snsapi_login"
                :state="wechatState"
                :redirect_uri="redirect_uri"
            />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'store/index'
import WechatLogin from '@/components/wechatLogin/WechatLogin.vue'

const route = useRoute()
const store = useStore()
const weixinLogin = ref(false)
const wechatState = ref('')

onMounted(() => {
    const stateUUID = Math.round(Math.random() * 100 + 100)
    console.log(`成功uuid:${stateUUID}`)
    store.commit('setWechatState', stateUUID.toString())
    wechatState.value = stateUUID.toString()
    // 集成在网页
    weixinLogin.value = true
})

/**
 * 重定向地址
 */
const redirect_uri = computed(() => {
    const uri = `${import.meta.env.DEV ? 'https://test.openalpha.cn' : window.location.origin}${
        route.path
    }`
    const redirect_uri = encodeURI(uri)
    return redirect_uri
})
</script>

<style lang="scss" scoped>
.wechat-binder-model {
    ::v-deep(.el-dialog) {
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
        display: flex;
        justify-content: center;
    }
    ::v-deep(.wechat-binder-model-tabs) {
        padding-top: 40px;
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
</style>
