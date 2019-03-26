<template>
  <nav class="clearfloat">
      <img src="./logo.jpg">
      <h1>电商管理</h1>
      <input type="text" class="in" disabled="disabled" placeholder="此功能暂未开放，敬请期待！">
      <p><a @click="rollOut">退出</a></p>
    </nav>
</template>

<script>
import { removeToken } from '@/utils/token'
export default {
  name: 'Header',
  methods: {
    rollOut () {
      removeToken()
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
