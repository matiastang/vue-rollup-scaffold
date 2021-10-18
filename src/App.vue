<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2021-10-18 17:40:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/App.vue
-->
<template>
  <div id="nav">
    <router-link to="/home">Home</router-link>
    <router-link to="/">About</router-link>
  </div>
  <div>{{ title ?? 'title' + obj?.name }}</div>
  <!-- 路由出口 -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Obj {
  
  name?: String,
  age?: Number 
}

interface App {
  title?: String,
  obj: Obj
}

export default defineComponent({
  data() {
    return {
      title: null,
      obj: {
        name: 'matias',
        age: null
      }
    } as App
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>