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
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :class="{ hide: fileList?.length >= limit }"
        >
            <slot>
                <Plus class="icon" />
            </slot>
            <template #tip>
                <div class="el-upload__tip" v-if="showTip">
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

        <el-dialog v-model="data.dialogVisible" title="预览" width="800" append-to-body>
            <img
                :src="data.dialogImageUrl"
                style="display: block; max-width: 100%; margin: 0 auto"
            />
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { localStorageKey, localStorageRead } from '@/common/utils/storage/localStorage'
import { reactive, watchEffect, computed, ref } from 'vue'
import { Response, UploadFile } from '@/@types'
import { Plus } from '@element-plus/icons'
import { ElLoading } from 'element-plus'
import ElMessage from '@/common/utils/message'
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
const loading = ref()
const data = reactive({
    dialogImageUrl: '',
    dialogVisible: false,
    hideUpload: false,
    baseUrl: import.meta.env.VITE_APP_BASE_API,
    uploadImgUrl: import.meta.env.VITE_APP_BASE_API + '/trade/od/upload', // 上传的图片服务器地址
    headers: {
        Authorization: 'Bearer ' + localStorageRead(localStorageKey.userTokenKey),
        viewType: 'front',
    },
})
const fileList = reactive<Array<UploadFile>>([])
const showTip = computed(() => {
    return props.isShowTip && (props.fileType || props.fileSize)
})
const emit = defineEmits(['input'])
watchEffect(() => {
    let list = []
    if (prop.value) {
        if (Array.isArray(prop.value)) {
            list = prop.value
        } else {
            list = prop.value?.split(',')
            list = list.map((it: string) => megerUrl2File(it))
        }
    }
    Object.assign(fileList, list)
    return prop.value
})
const handlePictureCardPreview = (file: UploadFile) => {
    data.dialogImageUrl = file.url
    data.dialogVisible = true
}
const handleRemove = (index: number) => {
    fileList.splice(index, 1)
}
const handleUploadError = () => {
    ElMessage.error('上传失败')
    loading.value.close()
}
const handleExceed = () => {
    ElMessage.warning(`上传文件数量不能超过 ${prop.limit} 个!`)
}
const megerUrl2File = (url: string) => {
    let result: UploadFile = {
        name: '',
        url: '',
    }
    let file = url.split('/')
    const fileName = file[file.length - 1]
    result.name = fileName
    result.url = url
    return result
}
const handleUploadSuccess = (res: Response.data) => {
    fileList.push(megerUrl2File(res.data))
    emit('input', res.data)
    loading.value.close()
}
const handleBeforeUpload = (file: File) => {
    let isImg = false
    if (prop.fileType.length) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
            fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        isImg = prop.fileType.some((type) => {
            if (typeof type === 'string') {
                if (file.type.indexOf(type) > -1) return true
                if (fileExtension && fileExtension.indexOf(type) > -1) return true
            }
            return false
        })
    } else {
        isImg = file.type.indexOf('image') > -1
    }

    if (!isImg) {
        ElMessage.error(`文件格式不正确, 请上传${prop.fileType.join('/')}图片格式文件!`)
        return false
    }
    if (prop.fileSize) {
        const isLt = file.size / 1024 / 1024 < prop.fileSize
        if (!isLt) {
            ElMessage.error(`上传图片大小不能超过 ${prop.fileSize} MB!`)
            return false
        }
    }
    loading.value = ElLoading.service({
        lock: true,
        text: '上传中',
        background: 'rgba(0, 0, 0, 0.7)',
    })
}
</script>
<style scoped lang="scss">
// .hide {
//     display: none;
// }
::v-deep(.hide .el-upload--picture-card) {
    display: none;
}
// .el-upload--picture-card 控制加号部分
::v-deep(.el-upload--picture-card) {
    width: 100%;
    border-color: #bfbfbf;
    background: #f4f4f4;
}
::v-deep(.el-upload--picture-card) {
    display: grid;
    place-items: center;
    .icon {
        height: 30px;
        width: 30px;
    }
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
