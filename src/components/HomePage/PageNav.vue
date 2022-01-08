<template>
  <el-aside class="home-page-aside">
    <el-menu
      class="aside-menu"
      :default-openeds="['1', '3']"
    >
      <div
        class="aside-icon-wrapper"
        @click="goToHomePage"
      >
        <el-icon class="home-page-home-filled">
          <guide />
        </el-icon>
        <p class="icon-text">数据监测系统</p>
      </div>
      <el-sub-menu
        class="aside-sub-menu"
        index="1"
        v-if="isAdmin === '1'"
      >
        <template #title>
          <el-icon>
            <message />
          </el-icon>用户管理
        </template>
        <el-menu-item-group>
          <!-- 如果想要加标题，less中的padding 0 记得删除 -->
          <el-menu-item
            index="1-1"
            @click="showUserList"
          >用户列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu
        class="aside-sub-menu"
        index="2"
      >
        <template #title>
          <el-icon>
            <message />
          </el-icon>设备管理
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="2-1"
            @click="showDeviceList"
          >设备列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu
        class="aside-sub-menu"
        index="3"
      >
        <template #title>
          <el-icon>
            <setting />
          </el-icon>数据管理
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="3-1"
            @click="handleDataDisplayClick"
          >数据列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>

  </el-aside>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Guide, Message, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

// 路由实例, 需要定义在setup中
const router = useRouter()

// 用户身份
let isAdmin = ref<string>('')
isAdmin.value = sessionStorage.getItem('isAdmin')

/**
 * @description
 * 返回首页
 */
function goToHomePage() {
  router.push('/')
}

/**
 * @description
 * 展示用户列表
 */
function showUserList() {
  router.push('/user-manage')
}

/**
 * @description
 * 展示设备列表
 */
function showDeviceList() {
  router.push('/device-manage')
}

/**
 * @description
 * 展示数据
 */
function handleDataDisplayClick() {
  router.push('/data-display')
}
</script>
<style lang="less">
@import './PageNav.less';
</style>