<template>
  <section class="home-page-header">
    <div class="header-search-wrapper">
      <el-icon>
        <search />
      </el-icon>
      <input
        class="header-search"
        type="search"
        placeholder="Search"
        aria-label="search"
      >
    </div>

    <div class="header-member-profile">
      <p class="profile-name">深海大大是帅哥</p>
      <p class="profile-role">普通用户</p>
    </div>

    <div class="header-member-avatar">
      <el-image class="avatar-img">
        <template #error>
          <span></span>
        </template>
      </el-image>
    </div>

  </section>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
</script>
<style lang="less">
@import './PageHeader.less';
</style>