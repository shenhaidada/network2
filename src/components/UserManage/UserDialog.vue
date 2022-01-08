<template>
  <el-dialog
    v-model="showUserConfigDialog"
    title="新增用户"
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
        :error="userFormError.usernameError"
        inline-message="true"
        label="用户名"
      >
        <el-input
          v-model="userForm.name"
          @blur="validateName"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        :error="userFormError.passwordError"
        inline-message="true"
        label="用户密码"
      >
        <el-input
          type="password"
          placeholder="密码"
          v-model="userForm.password"
          @blur="validatePassword"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancelButtonClick(showDialog)">Cancel</el-button>
        <el-button
          v-if="Object.keys(userInfo.data).length === 0"
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
import { ref, defineProps, defineEmits, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

// request
import request from '@/utils/request.ts'

// logic
import {
  usernameValidate,
  passwordValidate
} from '@/common/validate/validate.ts'

interface UserInfo {
  name: string
  password: string
  isAdmin: number
  id: number
}

interface LoginError {
  usernameError: string
  passwordError: string
}
// props
let props = defineProps({
  // 控制弹层开关
  showUserConfigDialog: {
    type: Boolean,
    required: true
  },
  // 用户信息
  userInfo: {
    type: Object,
    default: {
      data: []
    }
  }
})

console.log('userInfo: ', props.userInfo)
/**
 * @description
 * 用户信息逻辑
 */
// 点击取消/确定通知父组件更新
let showDialog = ref<boolean>(props.showUserConfigDialog)
let emit = defineEmits(['update:showUserConfigDialog'])
function handleCancelButtonClick(showDialog) {
  emit('update:showUserConfigDialog', showDialog)
}
// 用户添加
let userForm = reactive<UserInfo>({
  name: '',
  password: '',
  isAdmin: 0,
  id: 0
})
let userFormError = reactive<LoginError>({
  usernameError: '',
  passwordError: ''
})
// 用户名校验
function validateName() {
  userFormError.usernameError = usernameValidate(userForm.name)
}
// 用户密码校验
function validatePassword() {
  userFormError.passwordError = passwordValidate(userForm.password)
}
// 确认添加
async function handleAddUserConfirm(showDialog) {
  validateName()
  validatePassword()
  // 校验通过，请求接口
  if (
    userFormError.usernameError === '' &&
    userFormError.passwordError === ''
  ) {
    try {
      let result = await request('post', 'user', {
        name: userForm.name,
        password: userForm.password,
        isAdmin: 0
      })
      if (result.data.code === 200) {
        ElMessage({
          message: '新增用户成功',
          type: 'success'
        })
        handleCancelButtonClick(showDialog)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        ElMessage({
          message: '新增用户失败',
          type: 'error'
        })
      }
    } catch (error) {
      ElMessage({
        message: '新增用户失败',
        type: 'error'
      })
      console.log('error: ', error)
    }
  }
}

// 用户编辑
watch(props.userInfo, (newValue) => {
  console.log('newValue: ', newValue)
  userForm.isAdmin = newValue.data.isAdmin
  userForm.name = newValue.data.name
  userForm.password = newValue.data.password
  userForm.id = newValue.data.id
})

async function handleEditUserConfirm(showDialog) {
  validateName()
  validatePassword()
  // 校验通过，请求接口
  if (
    userFormError.usernameError === '' &&
    userFormError.passwordError === ''
  ) {
    try {
      let result = await request('put', `user/${userForm.id}`, {
        name: userForm.name,
        password: userForm.password,
        isAdmin: 0
      })
      if (result.data.code === 200) {
        ElMessage({
          message: '编辑用户成功',
          type: 'success'
        })
        handleCancelButtonClick(showDialog)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        ElMessage({
          message: '编辑用户失败',
          type: 'error'
        })
      }
    } catch (error) {
      ElMessage({
        message: '新增用户失败',
        type: 'error'
      })
      console.log('error: ', error)
    }
  }
}
</script>
<style lang="">
</style>