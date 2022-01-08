<template>
  <el-dialog
    v-model="showDeviceConfigDialog"
    :title="title"
    width="30%"
    center
    :append-to-body="true"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <!-- 输入框 -->
    <el-form label-width="80px">
      <el-form-item
        :error="deviceFormError.nameError"
        inline-message="true"
        label="设备名"
      >
        <el-input
          v-model="deviceForm.name"
          @blur="validateName"
          placeholder="设备名"
        ></el-input>
      </el-form-item>
      <el-form-item
        :error="deviceFormError.areaNameError"
        inline-message="true"
        label="设备区域"
      >
        <el-input
          placeholder="设备区域"
          v-model="deviceForm.areaName"
          @blur="validateAreaName"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="action === 'edit'"
        label="拥有者名"
      >
        <el-input
          placeholder="拥有者名"
          v-model="deviceForm.userName"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancelButtonClick()">Cancel</el-button>
        <el-button
          v-if="Object.keys(deviceInfo.data).length === 0"
          type="primary"
          @click="handleAddUserConfirm(showDialog)"
        >Confirm</el-button>
        <el-button
          v-else
          type="primary"
          @click="handleEditUserConfirm(showDialog)"
        >Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
// node_modules
import {
  ref,
  defineProps,
  defineEmits,
  reactive,
  watch,
  watchEffect
} from 'vue'
import { ElMessage } from 'element-plus'

// request
import request from '@/utils/request.ts'

// logic
import {
  usernameValidate,
  deviceNameValidate,
  deviceAreaValidate
} from '@/common/validate/validate.ts'

interface DeviceInfo {
  name: string
  areaName: string
  areaId: number
  userName?: string
  userId?: number
  id?: number | string
}

interface DeviceInfoError {
  nameError: string
  areaNameError: string
  userNameError?: string
}
// props
let props = defineProps({
  // 控制弹层开关
  showDeviceConfigDialog: {
    type: Boolean,
    required: true
  },
  // 用户信息
  deviceInfo: {
    type: Object,
    default: {
      data: []
    }
  },
  action: {
    type: String,
    required: true
  }
})

/**
 * @description
 * 用户信息逻辑
 */
// 点击取消/确定通知父组件更新
let showDialog = ref<boolean>(props.showDeviceConfigDialog)
let emit = defineEmits(['update:showDeviceConfigDialog'])
function handleCancelButtonClick() {
  showDialog.value = false
  emit('update:showDeviceConfigDialog', showDialog.value)
}
// 设备添加
let deviceForm = reactive<DeviceInfo>({
  name: '',
  areaName: '',
  userName: '',
  areaId: 1
})
let deviceFormError = reactive<DeviceInfoError>({
  nameError: '',
  areaNameError: '',
  userNameError: ''
})
// 设备名校验
function validateName() {
  deviceFormError.nameError = deviceNameValidate(deviceForm.name)
}
// 设备区域校验
function validateAreaName() {
  deviceFormError.areaNameError = deviceAreaValidate(deviceForm.areaName)
}
// 用户名校验
// function validateUserName() {
//   deviceFormError.userNameError = deviceAreaValidate(deviceForm.userName)
// }
// 确认添加
async function handleAddUserConfirm(showDialog) {
  validateName()
  validateAreaName()
  // 校验通过，请求接口
  if (
    deviceFormError.nameError === '' &&
    deviceFormError.areaNameError === ''
  ) {
    try {
      let result = await request('post', 'device', {
        name: deviceForm.name,
        area_name: deviceForm.areaName,
        owners: deviceForm.userName,
        area_id: deviceForm.areaId
      })
      console.log('result: ', result)
      if (result.data.code === 200) {
        ElMessage({
          message: '新增设备成功',
          type: 'success'
        })
        handleCancelButtonClick()
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        ElMessage({
          message: '新增设备失败',
          type: 'error'
        })
      }
    } catch (error) {
      ElMessage({
        message: '新增设备失败',
        type: 'error'
      })
      console.log('error: ', error)
    }
  }
}

// 标题
let title = ref<string>('')
watch(props.deviceInfo, (newValue) => {
  if (Object.keys(newValue.data).length <= 0) {
    deviceForm.areaId = 1
    deviceForm.name = ''
    deviceForm.userName = ''
    deviceForm.areaName = ''
    title.value = '添加设备'
  } else {
    deviceForm.areaId = newValue.data.areaId
    deviceForm.name = newValue.data.name
    deviceForm.userName = newValue.data.userName
    deviceForm.areaName = newValue.data.areaName
    deviceForm.id = newValue.data.id
    title.value = '编辑设备'
  }
})

// 编辑
async function handleEditUserConfirm(showDialog) {
  validateName()
  validateAreaName()
  // 校验通过，请求接口
  if (
    deviceFormError.nameError === '' &&
    deviceFormError.areaNameError === ''
  ) {
    try {
      let result = await request('put', `device/${deviceForm.id}`, {
        name: deviceForm.name,
        areaName: deviceForm.areaName,
        area_id: 1
      })
      if (result.data.code === 200) {
        ElMessage({
          message: '编辑设备成功',
          type: 'success'
        })
        if (deviceForm.userName !== '') {
          let result = await request('post', `device/assign_device_to_user`, {
            user_name: deviceForm.userName,
            device_id: deviceForm.id,
            device_name: deviceForm.name
          })

          if (result.data.code === 200) {
            ElMessage({
              message: '分配设备成功',
              type: 'success'
            })
            handleCancelButtonClick()
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          } else {
            ElMessage({
              message: '分配设备失败',
              type: 'error'
            })
          }
        } else {
          handleCancelButtonClick()
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      } else {
        ElMessage({
          message: '编辑设备失败',
          type: 'error'
        })
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
</script>
<style lang="">
</style>