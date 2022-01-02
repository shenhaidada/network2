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
        <p class="icon-text">my-System</p>
      </div>
      <el-sub-menu
        class="aside-sub-menu"
        index="1"
      >
        <template #title>
          <el-icon>
            <message />
          </el-icon>用户管理
        </template>
        <el-menu-item-group>
          <!-- 如果想要加标题，less中的padding 0 记得删除 -->
          <el-menu-item index="1-1">Option 1</el-menu-item>
          <el-menu-item index="1-2">Option 2</el-menu-item>
          <el-menu-item index="1-3">Option 3</el-menu-item>
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
          <el-menu-item index="2-1">Option 1</el-menu-item>
          <el-menu-item index="2-2">Option 2</el-menu-item>
          <el-menu-item index="2-3">Option 3</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu
        class="aside-sub-menu"
        index="3"
      >
        <template #title>
          <el-icon>
            <setting />
          </el-icon>数据展示
        </template>
        <el-menu-item-group>
          <template #title>Group 1</template>
          <el-menu-item index="3-1">Option 1</el-menu-item>
          <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="3-4">
          <template #title>Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu
        class="aside-sub-menu"
        index="4"
      >
        <template #title>
          <el-icon>
            <setting />
          </el-icon>数据下载
        </template>
        <el-menu-item-group>
          <template #title>Group 1</template>
          <el-menu-item index="3-1">Option 1</el-menu-item>
          <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="3-4">
          <template #title>Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>

  </el-aside>
</template>
<script lang="ts" setup>
import { Guide, Message, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

// 路由实例, 需要定义在setup中
const router = useRouter()

/**
 * @description
 * 返回首页
 */
function goToHomePage() {
  router.push('/')
}
</script>
<style lang="less">
@import './PageNav.less';
</style>