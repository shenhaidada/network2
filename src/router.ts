// vue
import { createRouter, createWebHashHistory } from "vue-router";

// components
import HomePage from "@/components/HomePage/HomePage.vue"
import PageContent from "@/components/HomePage/PageContent.vue"
import Login from "@/components/Login/Login.vue"

const routes = [
  {
    path: '/',
    redirect: '/home-page-content'
  },
  {
    // 首页默认展示页面
    path: '/',
    component: HomePage,
    name: 'HomePage',
    children: [
      {
        path: '/home-page-content',
        name: 'HomePageContent',
        component: PageContent
      }
    ]
  },
  {
    // 登陆页面
    path: '/login',
    component: Login,
    name: 'Login'
  },

]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from, next) => {
  // 判断用户身份身份
  // if (Math.floor(Math.random() * 2) === 0) {
  //   next({ name: 'Login' })
  // } else {
  //   next()
  // }
  next()
})

export default router
