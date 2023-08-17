<script setup>
import zh from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!-- App.vue只需要留一个路由出口即可 -->
  <el-config-provider :locale="zh">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
