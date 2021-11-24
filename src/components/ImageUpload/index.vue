<template>
    <div class="component-upload-image">
        <el-upload
            :action="data.uploadImgUrl"
            list-type="picture-card"
            :on-success="handleUploadSuccess"
            :before-upload="handleBeforeUpload"
            :limit="limit"
            :on-error="handleUploadError"
            :on-exceed="handleExceed"
            name="file"
            :on-remove="handleRemove"
            :show-file-list="true"
            :headers="data.headers"
            :file-list="data.fileList"
            :on-preview="handlePictureCardPreview"
            :class="{ hide: fileList?.length >= limit }"
        >
            <Plus class="icon" />
            <template #tip>
                <div class="el-upload__tip" v-show="showTip">
                    请上传
                    <template v-if="fileSize">
                        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                    </template>
                    <template v-if="fileType">
                        格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
                    </template>
                    的文件
                </div>
            </template>
        </el-upload>

        <!-- 上传提示 -->

        <el-dialog v-model="dialogVisible" title="预览" width="800" append-to-body>
            <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto" />
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { localStorageKey, localStorageRead } from '@/common/utils/storage/localStorage'
import { reactive, watchEffect, computed, ref } from 'vue'
import { Response } from '@/@types'
import { Plus } from '@element-plus/icons'
const props = defineProps({
    value: [String, Object, Array],
    // 图片数量限制
    limit: {
        type: Number,
        default: 5,
    },
    // 大小限制(MB)
    fileSize: {
        type: Number,
        default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
        type: Array,
        default: () => ['png', 'jpg', 'jpeg'],
    },
    // 是否显示提示
    isShowTip: {
        type: Boolean,
        default: true,
    },
})
const prop = reactive(props)
const data = reactive({
    dialogImageUrl: '',
    dialogVisible: false,
    hideUpload: false,
    baseUrl: import.meta.env.VITE_APP_BASE_API,
    uploadImgUrl: import.meta.env.VITE_APP_BASE_API + '/api/content/upload', // 上传的图片服务器地址
    headers: {
        Authorization: 'Bearer ' + localStorageRead(localStorageKey.userTokenKey),
    },
})
const fileList = ref([])
const showTip = computed(() => {
    return props.isShowTip && (props.fileType || props.fileSize)
})
const emit = defineEmits(['input'])
watchEffect(() => {
    let list = []
    if (Array.isArray(prop.value)) {
        list = prop.value
    } else {
        list = prop.value?.split(',')
    }
    fileList.value = list
    return prop.value
})

const handleRemove = (index: number) => {
    fileList.value.splice(index, 1)
}
const handleUploadSuccess = (res: Response.data) => {
    let file = res.data.split('/')
    const fileName = file[file.length - 1]
    // data.fileList.push(res.data)
    emit('input', res.data)
}
const handleBeforeUpload = () => {}
</script>
<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
::v-deep(.el-upload--picture-card) {
    display: grid;
    place-items: center;
    .icon {
        height: 30px;
        width: 30px;
    }
}
::v-deep(.hide .el-upload--picture-card) {
    display: none;
}
// 去掉动画效果
::v-deep(.el-list-enter-active),
::v-deep(.el-list-leave-active) {
    transition: all 0s;
}

::v-deep(.el-list-enter),
.el-list-leave-active {
    opacity: 0;
    transform: translateY(0);
}
</style>
