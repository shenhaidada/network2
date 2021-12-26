<template>
  <el-container class="home-page-content">
    <PageNav></PageNav>

    <section class="home-page-mid">
      <PageHeader></PageHeader>

      <router-view></router-view>

    </section>

  </el-container>
</template>

<script setup lang="ts">
// components
import PageNav from '../PageNav/PageNav.vue'
import PageHeader from '../PageHeader/PageHeader.vue'

// node_modules
import { ref, onMounted } from 'vue'

onMounted(() => {})
</script>

<style lang="less">
@import './HomePage.less';
</style>
