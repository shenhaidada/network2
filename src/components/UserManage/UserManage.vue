<template>
  <section class="user-manage-wrapper">
    <section class="manage-button-list">
      <div class="header-search-wrapper">
        <el-icon>
          <search />
        </el-icon>
        <input
          class="header-search"
          type="search"
          placeholder="Search"
          aria-label="search"
          v-model="searchUsername"
        >
      </div>
      <!-- 添加用户弹框 -->
      <el-button
        class="user-add-button"
        @click="showUserConfigDialog = true"
      >添加用户</el-button>
      <UserDialog
        :userInfo="editInfo"
        v-model:showUserConfigDialog="showUserConfigDialog"
      ></UserDialog>
    </section>

    <!-- 用户信息展示 -->
    <section class="user-card-wrapper">
      <div
        v-for="(item, index) in showList.data"
        :key="index"
        class="user-card"
      >
        <el-button
          @click="handleUserEdit(item)"
          class="user-edit-button"
        >编辑
        </el-button>
        <el-popconfirm
          confirmButtonType="danger"
          cancelButtonText="取消"
          confirmButtonText="确定"
          title="确定删除该用户吗?"
          @confirm="handleDeleteUserClick(item)"
        >
          <template #reference>
            <el-button class="user-delete-button">删除
            </el-button>
          </template>
        </el-popconfirm>

        <img
          class="card-avatar-img"
          :src="'/images/avatar.jpg'"
        >
        <p class="user-name">{{ `用户名：${item.name}` }}</p>
      </div>
    </section>

    <!-- 分页器 -->
    <section class="user-pagination-wrapper">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="userData.data.length"
        :page-size="pageSize"
        v-model:current-page="currentUserPage"
      >
      </el-pagination>
    </section>

  </section>
</template>
<script lang="ts" setup>
// modules
import { reactive, ref, toRef, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// components
import UserDialog from '@/components/UserManage/UserDialog.vue'

//utils
import request from '@/utils/request.ts'

/**
 * @description
 * 展示的数据
 */

// 用户数据初始化
let userData = reactive({
  data: []
})

// 初始化所有普通用户的数据
async function initUserData() {
  try {
    let result = await request('get', 'user', {})
    if (result.data.code === 200) {
      let _userData = result.data.data.users
      userData.data = _userData.map((item) => {
        return {
          id: item.Id,
          isAdmin: item.IsAdmin,
          isDeleted: item.IsDeleted,
          name: item.Name,
          password: item.Password
        }
      })
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
initUserData()

// 展示在页面上的数据
let showList = reactive({
  data: []
})

/**
 * @description
 * 搜索逻辑
 */
let searchUsername = ref<string>('')
watch(searchUsername, (newValue) => {
  if (newValue === '') {
    let beginNumber = pageSize.value * (currentUserPage.value - 1)
    showList.data = userData.data.slice(
      beginNumber,
      beginNumber + pageSize.value
    )
  } else {
    showList.data = userData.data.filter(
      (item) => item.name.indexOf(searchUsername.value) !== -1
    )
  }
})
/**
 * @description
 * 用户信息逻辑
 */
// 展示弹窗
let showUserConfigDialog = ref<boolean>(false)

// 用户编辑
let editInfo = reactive({
  data: {}
})
function handleUserEdit(info) {
  editInfo.data = info
  showUserConfigDialog.value = true
}

// 用户删除
async function handleDeleteUserClick(info) {
  try {
    let result = await request('delete', `user/${info.id}`)
    if (result.data.code === 200) {
      ElMessage({
        message: '删除用户成功',
        type: 'success'
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      ElMessage({
        message: '删除用户失败',
        type: 'error'
      })
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

/**
 * @description
 * 用户分页
 */
let currentUserPage = ref<number>(1)
let pageSize = ref<number>(4)
watch(userData, () => {
  showList.data = userData.data.slice(0, pageSize.value)
})
watch(currentUserPage, (newValue) => {
  let beginNumber = pageSize.value * (newValue - 1)
  showList.data = userData.data.slice(beginNumber, beginNumber + pageSize.value)
})
</script>
<style lang="less">
@import './UserManage.less';
</style>