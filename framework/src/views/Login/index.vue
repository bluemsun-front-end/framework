<template>
  <div>
    <div class="container">
      <form>
        <h2>登录</h2>
        <p>用户名</p>
        <input type="text" name="uname" placeholder="用户名" v-model="uname" />
        <p>用户密码</p>
        <input type="password" name="password" placeholder="用户密码" v-model="password" />
        <div class="remenber">
          <input type="checkbox" v-model="remenber" id="remenber" /><label for="remenber"
            >记住密码</label
          >
        </div>
        <div class="submit clearfix">
          <button @click="log" type="button">提交</button>
          <button type="reset">重置</button>
        </div>
      </form>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElForm, ElFormItem, ElInput, ElButton, ElCheckbox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表单数据和状态
const uname = ref('')
const password = ref('')
const remenber = ref(true)
const loading = ref(false)
const clientId = ref('')
// 判断是电脑端还是移动端
let isPc = true
const isPC = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  // 定义一些常见的移动设备和浏览器的用户代理特征
  const mobileAgents = [
    /android/i, // Android设备
    /iphone|ipad|ipod/i, // iOS设备
    /windows phone/i, // Windows Phone设备
    /blackberry/i, // Blackberry设备
    /opera mini/i, // Opera Mini浏览器（通常用于移动设备）
    /mobile/i, // 通用移动设备标记
    /touch/i, // 触摸设备标记（可能包括桌面触摸屏）
  ]
  // 检查用户代理字符串是否包含任何移动设备的特征
  isPc = true
  for (let i = 0; i < mobileAgents.length; i++) {
    if (mobileAgents[i].test(userAgent)) {
      isPc = false // 如果是移动设备，则返回false
    }
  }
}
onMounted(() => {
  isPC()
})
const log = async () => {
  try {
    loading.value = true
    //改变clientId查看是移动端还是PC端
    if (isPc === false) {
      clientId.value = '428a8310cd442757ae699df5d894f051'
    } else {
      clientId.value = 'e5cd7e4891bf95d1d19206ce24a7b32e'
    }
    const response = await axios.post('http://106.54.24.243:8080/auth/login', {
      tenantId: '000000',
      username: uname.value,
      password: password.value,
      rememberMe: remenber.value,
      clientId: clientId.value,
      grantType: 'password',
    })
    console.log(response.data.data.roles[0].roleName === '超市管理员')
    if (response.data.code === 200) {
      ElMessage.success('登录成功')
      localStorage.setItem('token', response.data.data.access_token)
      localStorage.setItem('client_id',response.data.data.client_id)

      localStorage.setItem('role',response.data.data.roles[0].roleName)

      // 判断对象
      router.push('/framework')
    }
  } catch (error) {
    loading.value = false
    ElMessage.error('登录失败，请稍后重试')
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  /* 改盒子高度和长度的计算 */
  box-sizing: border-box;
}

li {
  list-style: none;
}

img {
  /* 除掉图片底端的空隙 */
  border: 0;
  /* 图片和文字中心对齐 */
  vertical-align: middle;
}

button {
  /* 让鼠标变小手 */
  cursor: pointer;
}

p,
h1,
h2,
h3,
h4,
h5,
span,
form {
  cursor: default;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #3c79b4;
}

button,
input {
  font-family: 微软雅黑;
}

.clearfix::after {
  visibility: hidden;
  clear: both;
  display: block;
  content: '';
  height: 0;
}

.container {
  width: 100vw;
  height: 100vh;
  background: url(../Login/imag/b3925630992729172938c08655e5cfd0.jpg) fixed no-repeat;
  background-size: cover;
  display: flex;
  /* 交叉轴：竖直 */
  align-items: center;
  /* 主轴水平 */
  justify-content: center;
}
.container::-webkit-scrollbar {
  display: none !important;
}
.container form {
  width: 350px;
  height: 360px;
  backdrop-filter: blur(80px);
  color: #eef7fc;
  border-radius: 10px;
  background-color: #90c0ec;
  padding: 15px 0;
}

.container form h2 {
  text-align: center;
  padding: 10px 0;
  cursor: default;
  font-size: 28px;
  letter-spacing: 0.5em;
  margin-bottom: 5px;
}

.container form p {
  margin-bottom: 5px;
  margin-left: 20px;
  cursor: default;
  font-size: 18px;
}

.container form input {
  margin-left: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 35px;
  /* 取消选中时的外边框 */
  outline: none;
  padding: 10px;
}
.container form .remenber {
  line-height: 18px;
}
.container form .remenber input {
  height: 18px;
  width: 18px;
  vertical-align: top;
  margin-right: 8px;
}
.container form .submit button {
  width: 85px;
  height: 45px;
  float: left;
  margin: 10px 45px;
  font-size: 16px;
  background-color: #5890c8;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #014f9c;
  color: #eef7fc;
}

ul li {
  position: absolute;
  border: 5px solid rgb(107, 171, 211);
  background-color: rgb(107, 171, 211);
  width: 10px;
  height: 10px;
  list-style: none;
  opacity: 0.1;
}

.circle li {
  bottom: 0;
  left: 95vw;
  animation: circle 5s linear infinite;
}

.circle li:nth-child(2) {
  left: 75vw;
  animation-delay: 2.5s;
}

.circle li:nth-child(3) {
  left: 55vw;
  animation-delay: 2.5s;
}

.circle li:nth-child(4) {
  left: 35vw;
  animation-delay: 2.5s;
}

.circle li:nth-child(5) {
  left: 15vw;
  animation-delay: 5s;
}

.circle li:nth-child(6) {
  left: 15vw;
  animation-delay: 4.5s;
}

.circle li:nth-child(7) {
  left: 15vw;
  animation-delay: 6.5s;
}

@keyframes circle {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0;
  }

  100% {
    transform: scale(5) rotateY(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}
</style>
