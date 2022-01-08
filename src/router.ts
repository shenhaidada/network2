// vue
import { createRouter, createWebHashHistory } from "vue-router";

// components
import HomePage from "@/components/HomePage/HomePage.vue"
import PageContent from "@/components/HomePage/PageContent.vue"
import Login from "@/components/Login/Login.vue"
import UserManage from "@/components/UserManage/UserManage.vue"
import DeviceManage from "@/components/DeviceManage/DeviceManage.vue"
import DataDisplay from "@/components/DataDisplay/DataDisplay.vue"

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
      },
      {
        path: '/user-manage',
        name: 'UserManage',
        component: UserManage
      },
      {
        path: '/device-manage',
        name: 'DeviceManage',
        component: DeviceManage
      },
      {
        path: '/data-display',
        name: 'DataDisplay',
        component: DataDisplay
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
  if (to.name !== 'Login') {
    // 判断用户是否登陆
    if (sessionStorage.getItem('userHasLogin') === 'true') {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
