<template>
  <section class="device-manage-wrapper">
    <section class="manage-button-list">
      <!-- 搜索 -->
      <SearchInput v-model:searchStr="searchStr"></SearchInput>
      <!-- 添加设备弹框 -->
      <el-button
        class="device-add-button"
        @click="handleDeviceAdd"
      >添加设备</el-button>
      <DeviceDialog
        :action="action"
        :deviceInfo="deviceInfo"
        v-model:showDeviceConfigDialog="showDeviceConfigDialog"
      ></DeviceDialog>
    </section>

    <!-- 设备信息展示 -->
    <section class="device-wrapper">
      <div
        v-for="(item, index) in showList.data"
        :key="index"
        class="device"
      >
        <el-button
          @click="handleDeviceEdit(item)"
          class="device-edit-button"
        >编辑
        </el-button>
        <el-popconfirm
          confirmButtonType="danger"
          cancelButtonText="取消"
          confirmButtonText="确定"
          title="确定删除该设备吗?"
          @confirm="handleDeleteDeviceClick(item)"
        >
          <template #reference>
            <el-button class="device-delete-button">删除
            </el-button>
          </template>
        </el-popconfirm>

        <img
          class="device-img"
          :src="'/images/avatar.jpg'"
        >
        <div>
          <p class="device-name">{{ `设备名：${item.name}` }}</p>
          <p class="device-name padding-top-0">{{ `所有者：${item.owners}` }}</p>
        </div>
      </div>
    </section>

    <!-- 分页器 -->
    <section class="device-pagination-wrapper">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="deviceData.data.length"
        :page-size="pageSize"
        v-model:current-page="currentUserPage"
      >
      </el-pagination>
    </section>
  </section>
</template>
<script setup lang="ts">
// modules
import { reactive, ref, toRef, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// components
import DeviceDialog from '@/components/DeviceManage/DeviceDialog.vue'
import SearchInput from '@/components/common/SearchInput.vue'

//utils
import request from '@/utils/request'

interface DeviceInfo {
  name: string
  areaId?: number
  areaName: string
}

/**
 * @description
 * 设备展示逻辑
 */
// 设备数据
let deviceData = reactive({
  data: []
})

// 展示数据
let showList = reactive({
  data: []
})
// 初始化设备数据
async function initDeviceData() {
  try {
    let result = await request('get', 'device', {})
    if (result.data.code === 200) {
      let _deviceData = result.data.data.devices
      deviceData.data = _deviceData.map((item) => {
        return {
          id: item.Id,
          areaId: item.AreaId,
          isDeleted: item.IsDeleted,
          name: item.Name,
          owners: item.Owners
        }
      })
      console.log('deviceData.data: ', deviceData.data)
      let isAdminFlag = sessionStorage.getItem('isAdmin')
      console.log('isAdminFlag: ', isAdminFlag)
      let currentUsername = sessionStorage.getItem('username')
      if (isAdminFlag === '0') {
        deviceData.data = deviceData.data.filter(
          (item) => item.owners === currentUsername
        )
      }
      let beginIndex = (currentUserPage.value - 1) * pageSize.value
      showList.data = deviceData.data.slice(
        beginIndex,
        beginIndex + pageSize.value
      )
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
initDeviceData()

//分页
let pageSize = ref<number>(4)
let currentUserPage = ref<number>(1)
watch(currentUserPage, (newValue) => {
  let beginNumber = pageSize.value * (newValue - 1)
  showList.data = deviceData.data.slice(
    beginNumber,
    beginNumber + pageSize.value
  )
})

/**
 * @description
 * 设备搜索逻辑
 */
let searchStr = ref<string>('')
watch(searchStr, (newValue) => {
  if (newValue === '') {
    let beginNumber = pageSize.value * (currentUserPage.value - 1)
    showList.data = deviceData.data.slice(
      beginNumber,
      beginNumber + pageSize.value
    )
  } else {
    showList.data = deviceData.data.filter(
      (item) => item.name.indexOf(searchStr.value) !== -1
    )
  }
})

/**
 * @description
 * 设备添加逻辑
 */
let showDeviceConfigDialog = ref<boolean>(false)
let deviceInfo = reactive({
  data: {}
})
let action = ref<string>('')
// 设备添加
function handleDeviceAdd() {
  showDeviceConfigDialog.value = true
  deviceInfo.data = {}
  action.value = 'add'
}

// 设备编辑
function handleDeviceEdit(item) {
  showDeviceConfigDialog.value = true
  deviceInfo.data = {
    name: item.name,
    areaName: '北京',
    userName: item.owners,
    id: item.id
  }
  action.value = 'edit'
}

// 设备删除
async function handleDeleteDeviceClick(item) {
  try {
    let result = await request('delete', `device/${item.id}`)
    if (result.data.code === 200) {
      ElMessage({
        message: '删除设备成功',
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
</script>
<style lang="less">
@import './DeviceManage.less';
</style>