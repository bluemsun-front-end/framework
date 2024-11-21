import { createRouter, createWebHistory } from 'vue-router'

import index from '@/views/Login/index.vue'
import framework from '@/views/Framework/index.vue'
import PersonalBox from '@/views/Framework/components/PersonalBox.vue'
import PersonalText from '@/views/Framework/components/PersonalText.vue'
import InformationForm from '@/views/Framework/components/InformationForm.vue'
import PasswordForm from '@/views/Framework/components/PasswordForm.vue'
//创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 个人成长档案
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/framework',
      // path: '/',
      name: 'framework',
      component: framework,
    },
    {
      path: '/personalBox',
      name: 'personalBox',
      component: PersonalBox,
    },
    {
      //   path: '/',
      path: '/personalText',
      name: 'personalText',
      component: PersonalText,
    },
    {
      // path: '/',
      path: '/informationForm',
      name: 'informationForm',
      component: InformationForm,
    },
    {
      // path: '/',
      path: '/passwordForm',
      name: 'passwordForm',
      component: PasswordForm,
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log('每次路由切换时执行的函数')

  next()
})

//暴露出去router
export default router
