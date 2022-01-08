<template>
  <section class="home-page-header">
    <div class="header-member-profile">
      <p class="profile-name">{{userName}}</p>
      <p class="profile-role">{{ role }}</p>
    </div>

    <div class="header-member-avatar">
      <img
        class="avatar-img"
        src="/images/avatar.jpg"
      >
    </div>

  </section>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 用户名
let userName = ref<string>('')
userName.value = sessionStorage.getItem('username')

// 用户身份
let role = ref<string>('')
role.value = sessionStorage.getItem('isAdmin') === '1' ? '管理员' : '普通用户'
</script>
<style lang="less">
@import './PageHeader.less';
</style>