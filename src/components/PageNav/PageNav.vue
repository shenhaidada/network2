<template>
  <el-aside class="home-page-aside">
    <el-menu
      class="aside-menu"
      :default-openeds="['1', '3']"
    >
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
</script>
<style lang="less">
@import "./PageNav.less";
</style>