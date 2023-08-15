import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 创建路由实例由createRouter实现
  // 路由模式history使用createWebHistory()
  // hash模式使用createWebHashHistory()
  // 参数是基础路径，默认/
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

/*
  登录访问拦截
  根据返回值决定，是放行还是拦截
  返回值：
    undefined/true 直接放行
    false 拦回form的地址页面
    具体路径或者路径对象 拦截到对应的地址
      '/login' { name: 'login' }
 */
router.beforeEach((to) => {
  // 如果没有token，且访问的是非登录页，拦截到登录去，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})
export default router
