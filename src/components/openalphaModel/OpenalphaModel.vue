<!--
 * @Author: your name
 * @Date: 2021-11-08 18:47:23
 * @LastEditTime: 2021-11-23 19:04:34
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/openalphaModel/OpenalphaModel.vue
-->
<template>
    <div class="openalpha-model">
        <el-dialog :="$attrs" center>
            <div class="model-title defaultFont">{{ title || '提示' }}</div>
            <div class="model-bottom flexRowCenter">
                <div class="model-ok-button cursorP defaultFont" @click="modelOkAction">
                    {{ okText || '确定' }}
                </div>
                <div
                    v-if="!hiddenCancel"
                    class="model-cancel-button cursorP defaultFont"
                    @click="modelCancelAction"
                    :style="cancelStyle"
                >
                    {{ cancelText || '取消' }}
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'OpenalphaModel',
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            default: '提示',
        },
        okText: {
            type: String,
            default: '确定',
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        hiddenCancel: {
            type: Boolean,
            default: false,
        },
        cancelStyle: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    emits: ['okAction', 'cancelAction'],
    setup(props, context) {
        const modelOkAction = () => {
            context.emit('okAction')
        }
        const modelCancelAction = () => {
            context.emit('cancelAction')
        }
        return {
            modelOkAction,
            modelCancelAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.openalpha-model {
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
        padding: 0px 25px 40px 25px;
        .model-title {
            font-size: fontSize(22px);
            color: $titleColor;
            line-height: 30px;
            letter-spacing: 2px;
            margin-top: 30px;
        }
        .model-bottom {
            margin-top: 30px;
            .model-ok-button,
            .model-cancel-button {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: fontSize(16px);
                color: $themeBgColor;
                line-height: 42px;
            }
            .model-cancel-button {
                margin-left: 40px;
            }
        }
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
</style>
