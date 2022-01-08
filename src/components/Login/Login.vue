<template>
  <section class="login-page-background">

  </section>
  <section class="login-page">
    <div class="login-notice-window">
    </div>
    <div class="login-form-wrapper">
      <section class="login-form">
        <article class="login-form-title">登 录</article>
        <el-form>
          <el-form-item
            :error="loginError.usernameError"
            inline-message="true"
          >
            <el-input
              v-model="loginForm.username"
              type="text"
              placeholder="用户名"
              @blur="validateUsername"
            ></el-input>
          </el-form-item>
          <el-form-item
            :error="loginError.passwordError"
            inline-message="true"
          >
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              @blur="validatePassword"
            ></el-input>
          </el-form-item>
        </el-form>
        <p class="forget-password"><span>忘记密码？</span></p>

        <div class="login-button-wrapper">
          <button
            @click="handleLoginClick"
            class="login-button"
          >登陆</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
// vue
import { useRouter } from 'vue-router'
import { reactive, watch } from 'vue'

//utils
import request from '@/utils/request.ts'

// logic
import {
  usernameValidate,
  passwordValidate
} from '@/common/validate/validate.ts'

/**
 * @description
 * 登陆逻辑
 */
interface LoginInfo {
  username: string
  password: string
}

interface LoginError {
  usernameError: string
  passwordError: string
}

//router
let router = useRouter()

// 表单信息
let loginForm = reactive<LoginInfo>({
  username: '',
  password: ''
})
// 登陆错误校验
let loginError = reactive<LoginError>({
  usernameError: '',
  passwordError: ''
})
// 用户名校验
function validateUsername() {
  loginError.usernameError = usernameValidate(loginForm.username)
}
// 密码校验
function validatePassword() {
  loginError.passwordError = passwordValidate(loginForm.password)
}

// 点击事件 触发校验
async function handleLoginClick() {
  // 用户名和密码校验
  validateUsername()
  validatePassword()
  if (loginError.passwordError === '' && loginError.usernameError === '') {
    // 跳转
    try {
      let result = await request('post', 'user/sign_in', {
        name: loginForm.username,
        password: loginForm.password
      })
      console.log('result: ', result)
      if (result.data.code === 200) {
        sessionStorage.setItem('userHasLogin', 'true')
        sessionStorage.setItem('username', result.data.data.user.Name + '')
        sessionStorage.setItem('isAdmin', result.data.data.user.IsAdmin + '')
        sessionStorage.setItem('userId', result.data.data.user.Id + '')
        router.push('/')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
</script>
<style lang="less">
@import './Login.less';
</style>