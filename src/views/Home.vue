<!--
 * @Author: your name
 * @Date: 2021-10-15 17:25:57
 * @LastEditTime: 2021-10-20 11:12:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/views/Home.vue
-->
<template>
	<div class="home">
		<div :class="{ logo: true, animation: animation }" @click="animationAction" />
		<div :class="{ logo: true, zoom: zoom }" @click="zoomAction" />
		<!-- <img alt="Vue logo"  /> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	data() {
		return {
			animation: false,
			zoom: false,
		}
	},
	methods: {
		animationAction() {
			this.animation = !this.animation
		},
		zoomAction() {
			this.zoom = !this.zoom
		},
	},
})
</script>

<style lang="scss">
.logo {
	height: 100px;
	width: 100px;
	background-color: red;
	animation-name: spin;
	animation-duration: 1000ms;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}
.animation {
	transform: scale(0.5);
}
.zoom {
	zoom: 0.5;
}
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
