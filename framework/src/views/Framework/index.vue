<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <!-- 左侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <el-scrollbar style="height: 100%">
        <el-menu :default-active="activeMenu" :default-openeds="['1']" class="sidebar-menu">
          <!-- 侧边栏标题 -->
          <div index="0" class="sidebar-title" disabled>{{ role }}-导航</div>

          <!-- 个人中心 -->
          <el-menu-item
            index="1"
            :class="{ active: currentPage === 'personalCenter' }"
            class="menu-item"
          >
            个人中心
          </el-menu-item>

          <!-- 爱心超市 -->
          <el-menu-item
            v-show="role == '资助对象'"
            index="2"
            @click="handleMenuClick('superMarket')"
            :class="{ active: currentPage === 'superMarket' }"
            class="menu-item"
          >
            爱心超市
          </el-menu-item>
          <!-- 超市管理员 -->
          <el-menu-item
            v-show="role == '超市管理员'"
            index="3"
            @click="handleMenuClick('superMarketManage')"
            :class="{ active: currentPage === 'superMarketManage' }"
            class="menu-item"
          >
            爱心超市管理员
          </el-menu-item>

          <!-- 个人档案 -->
          <el-menu-item
            v-show="role == '资助对象'"
            index="4"
            @click="handleMenuClick('personalProfile')"
            :class="{ active: currentPage === 'personalProfile' }"
            class="menu-item"
          >
            个人档案
          </el-menu-item>

          <!-- 个人档案管理员端 -->
          <el-menu-item
            v-show="role == '老师'"
            index="5"
            @click="handleMenuClick('studentsProfile')"
            :class="{ active: currentPage === 'studentsProfile' }"
            class="menu-item"
          >
            学生档案
          </el-menu-item>

          <!-- 退出登录 -->
          <el-menu-item index="6" plain @click="outerVisible = true" class="logout-button">
            退出登录
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <div class="title">个人中心</div>
      </el-header>

      <!-- 主内容区 -->
      <el-main>
        <div v-if="currentPage === 'personalCenter'" class="content">
          <!-- 监听子组件发出的 'role' 事件 -->
          <!-- <personal-box @role="updateRole"></personal-box>
          <personal-text :message="roleMessage"></personal-text> -->
          <personal-box></personal-box>
          <personal-text></personal-text>
        </div>
      </el-main>
    </el-container>
  </el-container>

  <!-- 退出登录确认模态框 -->
  <el-dialog v-model="outerVisible" title="" width="450px" :before-close="handleBeforeClose">
    <div class="dialog-content">
      <span>确认退出登录吗？</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false" class="cancel-btn">取消</el-button>
        <el-button type="primary" @click="handleLogout" class="confirm-btn"> 确认退出 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus' // 导入 ElMessage 组件
import axios from 'axios' // 导入 axios 库
import PersonalBox from '@/views/Framework/components/PersonalBox.vue' // 导入 PersonalBox 组件
import PersonalText from '@/views/Framework/components/PersonalText.vue'
import Axios from '@/views/Axios'
const roleMessage = ref('资助对象')

const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

// 模态框
const outerVisible = ref(false)
// 当前选中的菜单项
const activeMenu = ref('1') // 默认选中 "个人中心"
const currentPage = ref('personalCenter') // 默认显示 个人中心


// 当前用户角色

// 监听子组件传递的角色信息

// 点击菜单项时的处理函数
const handleMenuClick = (page: string) => {
  if (page === 'superMarket') {
    window.location.href = `http://106.54.24.243:5174/home?token=${token}&role=${role}`
  } else if (page === 'personalProfile') {
    window.location.href = `http://106.54.24.243:5175/new-file?token=${token}&role=${role}`
  } else if (page === 'studentsProfile')
    window.location.href = `http://106.54.24.243:5175/studentFiles?token=${token}&role=${role}`
  else if (page === 'superMarketManage')
    window.location.href = `http://106.54.24.243:5174/manage?token=${token}&role=${role}`
}

// 模态框关闭时执行的回调
const handleBeforeClose = (done: Function) => {
  done() // 关闭模态框
}

// 退出登录处理函数
const handleLogout = async () => {
  console.log('退出登录')
  try {
    const response = await Axios.post('http://106.54.24.243:8080/auth/logout', {})
    if (response.data.code === 200) {
      ElMessage.success('退出成功！')
      outerVisible.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('client_id')

      // 等待2秒跳转到登录
      setTimeout(() => {
        window.location.href = '/'
        outerVisible.value = false
      }, 500)
    } else {
      ElMessage.error(response.data.msg + '!')
    }
  } catch (error) {
    ElMessage.error('请求失败！')
  }
}
// 页面关闭删除token
import { onBeforeUnmount } from 'vue'
// onBeforeUnmount(() => {
//   localStorage.removeItem('token')
//   localStorage.removeItem('client_id')
//   localStorage.removeItem('role')
//   console.log('Token has been removed from localStorage')
// })
</script>

<style scoped>
.content {
  display: flex;
}
/* 顶部导航栏 */
.layout-container-demo .el-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #333;
}
.title {
  color: #2d4059;
  font-family: 'Arial', sans-serif;
  font-size: 30px;
  font-weight: bold;
  /* margin-top: 10px;
  margin-bottom: 10px; */
  margin: 10px auto;
  text-align: center;
  align-content: center;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* 左侧边栏 - 深色背景 */
.layout-container-demo .el-aside {
  background-color: #283142; /* 深蓝色背景 */
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #ecf0f1; /* 浅色字体 */
}

/* 侧边栏标题样式 */
.sidebar-title {
  background-color: #1f2739;
  text-align: center;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #ecf0f1; /* 浅色字体 */
}

/* 侧边栏菜单项 */
.menu-item {
  font-weight: 700;
  font-size: 14px;
  color: #bdc3c7;
  padding-left: 20px;
  background-color: #283142; /* 默认背景透明，与侧边栏背景一致 */
  transition: background-color 0.3s ease, color 0.3s ease;
}
:deep(.el-menu) {
  border: 0;
}

/* 鼠标悬停时的菜单项颜色变化 */
.menu-item:hover {
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

/* 选中时的菜单项样式 */
.menu-item.active {
  background-color: #3498db;
  color: white;
}

/* 退出登录按钮 */
.logout-button {
  margin-top: auto; /* 使退出登录按钮靠下 */
  font-size: 14px;
  color: #e74c3c; /* 红色字体 */
  padding-left: 20px;
  background-color: #283142; /* 透明背景，与侧边栏背景一致**/
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 退出登录按钮悬停效果 */
.logout-button:hover {
  background-color: #f7d7d7; /* 红色悬停效果 */
  color: #e74c3c; /* 保持红色 */
  cursor: pointer;
}

/* 主内容区域 */
.layout-container-demo .el-main {
  padding: 20px;
  background-color: #f4f4f4; /* 浅灰色背景 */
}
/* 工具栏 */
.layout-container-demo .toolbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

/* 调整侧边栏和菜单项的高度 */
.layout-container-demo .el-menu-item,
.layout-container-demo .el-sub-menu {
  height: 60px;
  line-height: 60px;
}
/* 模态框样式 */
.el-dialog {
  border-radius: 10px; /* 圆角 */
  background-color: #f9f9f9; /* 浅灰色背景 */
}

.el-dialog__header {
  background-color: #3498db; /* 蓝色背景 */
  color: #fff; /* 白色文字 */
  font-size: 18px; /* 标题字体大小 */
  font-weight: bold;
}

.el-dialog__body {
  font-size: 16px;
  color: #333;
  text-align: center; /* 内容居中 */
}

.el-dialog__footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  background-color: #e1e1e1; /* 灰色取消按钮 */
  color: #333;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #bdc3c7; /* 悬停时变为浅灰色 */
}

.confirm-btn {
  background-color: #3498db; /* 蓝色确认按钮 */
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.confirm-btn:hover {
  background-color: #2980b9; /* 悬停时背景色变深 */
}
/* 模态框内容居中 */
.el-dialog__body {
  text-align: center; /* 使内容居中 */
  font-size: 16px;
  color: #333;
}

.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #333;
}
</style>