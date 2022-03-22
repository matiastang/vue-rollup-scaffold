<!--
 * @Author: matiastang
 * @Date: 2021-12-29 10:52:57
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-21 15:07:42
 * @FilePath: /datumwealth-front-scaffold/src/views/home/Home.vue
 * @Description: 
-->
<template>
    <div class="home">
        <div class="text">{{ text }}</div>
        <input v-model="inputText" @change="inputChange" />
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthUserStore, useTestStore } from '@/pinia/init'

const testStore = useTestStore()
console.log(testStore)

const store = useAuthUserStore()
console.log(store)
store.userId = 'auth userId'
// console.log(store.userId)
// console.log(store.$state.hello)
// console.log(store.$state.name)
// console.log(store.$state.age)

store.$state.hello = 'hello dw'
// console.log(store.$state.hello)

testStore.userId = 'test userId'
// console.log(testStore.userId)
// console.log(testStore.$state.hello)
// console.log(testStore.$state.name)
// console.log(testStore.$state.age)

const text = ref('home')

const inputText = ref(store.$state.name)
watch(
    () => inputText.value,
    (newValue, oldValue) => {
        store.$state.name = newValue
        store.$state.user.name = newValue
    }
)
watch(
    () => store.$state.name,
    (newValue, oldValue) => {
        console.log(`name newValue=${newValue}`)
        console.log(`name oldValue=${oldValue}`)
    }
)
const inputChange = (payload: Event) => {
    console.log(payload)
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: fontSize(14px);
        @include defaultFont;
        color: $placeholderColor;
        line-height: 20px;
        text-align: center;
    }
}
</style>
