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
              @blur="usernameValidate"
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
              @blur="passwordValidate"
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
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
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
function usernameValidate() {
  if (loginForm.username === '') {
    loginError.usernameError = '请输入用户名'
  } else if (new String(loginForm.username).length > 20) {
    loginError.usernameError = '用户名长度最多20'
  } else {
    // 校验通过
    loginError.usernameError = ''
  }
}
// 密码校验
function passwordValidate() {
  if (loginForm.password === '') {
    loginError.passwordError = '请输入密码'
  } else {
    loginError.passwordError = ''
  }
}
// 点击事件 触发校验
function handleLoginClick() {
  // 用户名和密码校验
  usernameValidate()
  passwordValidate()
  if (loginError.passwordError === '' && loginError.usernameError === '') {
    // 跳转
  }
  router.push('/')
}
</script>
<style lang="less">
@import './Login.less';
</style>