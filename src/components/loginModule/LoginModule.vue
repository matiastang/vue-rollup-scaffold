<!--
 * @Author: your name
 * @Date: 2021-11-02 16:56:07
 * @LastEditTime: 2021-11-02 18:49:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/loginModule/LoginModule.vue
-->
<template>
    <el-tabs class="login-module-tabs" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane class="login-module-register" label="短信登录/注册" name="register">
            <el-input
                :class="['search-input', { 'search-input-selected': focus }]"
                :placeholder="placeholder"
            >
                <template #suffix>
                    <div class="search-button"></div>
                </template>
            </el-input>
        </el-tab-pane>
        <el-tab-pane class="login-module-login" label="密码登录" name="login">
            <el-input
                class="phone-input"
                v-model="inputPhone"
                placeholder="请输入手机号码"
                clearable
            >
            </el-input>
            <el-input
                class="password-input"
                v-model="inputPassword"
                placeholder="请输入密码"
                clearable
            >
                <template #suffix>
                    <div class="search-button"></div>
                </template>
            </el-input>
            <div class="forgot-password">忘记密码?</div>
            <div class="login">登录</div>
            <div class="text">登录即表示同意《服务协议》</div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { ref } from 'vue'

export default {
    data() {
        return {
            activeName: 'login',
        }
    },
    setup() {
        let inputPhone = ref('')
        let inputPassword = ref('')
        return {
            inputPhone,
            inputPassword,
            placeholder: '请输入接口名称/接口ID',
        }
    },
    computed: {},
    methods: {
        tabClick(tab, event) {
            console.log(tab, event)
        },
    },
}
</script>

<style lang="scss" scoped>
.login-module-tabs {
    box-sizing: border-box;
    padding: 80px 80px 66px 80px;
    .login-module-register {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .login-module-login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .phone-input {
            width: 100%;
            height: 56px;
            margin-top: 80px;
            ::v-deep input {
                width: 100%;
                height: 100%;
                border-radius: 0px;
                padding-right: 0px;
                border: 1px solid #bfbfbf;
                padding: 0px 0px 0px 5px;
            }
            ::v-deep .el-input__suffix {
                right: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .password-input {
            width: 100%;
            height: 56px;
            margin-top: 40px;
            ::v-deep input {
                width: 100%;
                height: 100%;
                border-radius: 0px;
                padding-right: 0px;
                border: 1px solid #bfbfbf;
                padding: 0px 0px 0px 5px;
            }
            ::v-deep .el-input__suffix {
                right: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .forgot-password {
            margin: 6px 0px 14px 0px;
            align-self: flex-end;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8c8c8c;
            line-height: 20px;
            letter-spacing: 1px;
        }
        .login {
            width: 100%;
            height: 56px;
            background: #d65928;
            border-radius: 4px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 56px;
            text-align: center;
            letter-spacing: 1px;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8c8c8c;
            line-height: 20px;
            letter-spacing: 1px;
            text-align: center;
        }
    }
    ::v-deep #tab-register {
        width: 215px;
        height: 54px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-right: 51px;
    }
    ::v-deep #tab-login {
        width: 132px;
        height: 54px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-left: 51px;
    }
    ::v-deep .is-active {
        font-weight: 500 !important;
        color: #d65928 !important;
    }
    ::v-deep .el-tabs__active-bar {
        height: 6px;
        background: #d65928;
    }
    ::v-deep .el-tabs__nav-wrap::after {
        display: none !important;
    }
}
</style>
