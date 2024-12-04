import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import index from '@/views/Login/index.vue'
import framework from '@/views/Framework/index.vue'
import PersonalBox from '@/views/Framework/components/PersonalBox.vue'
import PersonalText from '@/views/Framework/components/PersonalText.vue'
import InformationForm from '@/views/Framework/components/InformationForm.vue'
import PasswordForm from '@/views/Framework/components/PasswordForm.vue'
import isLogin from '@/api/isLogin'
import NotFoundView from '@/components/views/NotFoundView.vue';
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
      path:'/',
      component:Login
    },
    {
      path: '/framework',
      name: 'framework',
      component: framework,
    },
    {
      path: '/personalBox',
      name: 'personalBox',
      component: PersonalBox,
    },
    {
     
      path: '/personalText',
      name: 'personalText',
      component: PersonalText,
    },
    {
     
      path: '/informationForm',
      name: 'informationForm',
      component: InformationForm,
    },
    {
  
      path: '/passwordForm',
      name: 'passwordForm',
      component: PasswordForm,
    },
    {
      path: '/:pathMatch(.*)*', // 匹配所有未定义的路由
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  try {
    const role = localStorage.getItem('role') || ''; // 从 localStorage 获取角色
    const isLoggedIn = await isLogin(); // 检查登录状态
    const publicPaths = ['/']; // 允许未登录访问的路径

    console.log('Role:', role); // 调试信息

    if (!isLoggedIn && !publicPaths.includes(to.path)) {
      const redirectUrl = `${window.location.origin}${to.fullPath}`;
      return (window.location.href = `http://106.54.24.243:5173`);
    }

    next(); // 继续导航
  } catch (error) {
    console.error('导航守卫出错:', error);
    next('/'); // 出错时默认跳转到登录页
  }
});

 

router.afterEach((to, from) => {
  const query = { ...to.query };
  if ('token' in query) delete query.token;
  if ('role' in query) delete query.role;
  if (JSON.stringify(query) !== JSON.stringify(to.query)) {
    const newPath = to.path.replace(/\/+/g, '/');
    router.replace({ path: newPath, query });
  }
});

//暴露出去router
export default router
