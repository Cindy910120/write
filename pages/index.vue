<template>
  <div class="main-container">
    <!-- 主要容器 -->
    <div class="content-wrapper">
      <!-- 標題區域 -->
      <div class="title-section">
        <div class="title-icon">
          <svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </div>
        <h1 class="main-title">WriteApp</h1>
        <p class="subtitle">選擇您的身份開始寫作</p>
      </div>
      
      <!-- 登入卡片 -->
      <div class="login-card">        <!-- 密碼輸入區域 -->
        <div v-if="!isPasswordCorrect" class="password-section">
          <div class="password-header">
            <h2 class="password-title">請輸入訪問密碼</h2>
            <p class="password-subtitle">請輸入密碼以訪問寫作空間</p>
          </div>
            <div class="password-input-container">
            <div class="input-group">
              <!-- 輸入框容器 -->
              <div class="input-wrapper">
                <input
                  v-model="passwordInput"
                  type="password"
                  @keyup.enter="checkPassword"
                  class="password-input"
                  placeholder="請輸入您的專屬密碼"
                />
                
                <!-- 輸入框裝飾線 -->
                <div class="input-decoration-line"></div>
              </div>
              
              <!-- 焦點發光效果 -->
              <div class="input-glow-effect"></div>
            </div>
            
            <!-- 確認按鈕 -->
            <button
              @click="checkPassword"
              class="confirm-btn"
            >
              <!-- 按鈕背景光效 -->
              <div class="btn-light-effect"></div>
              
              <!-- 按鈕文字 -->
              <span class="btn-content">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span>解鎖寫作空間</span>
              </span>
            </button>
              <div v-if="passwordError" class="error-message">
              <p class="error-text">{{ passwordError }}</p>
            </div>
          </div>
        </div>        <!-- 用戶選擇區域 -->
        <div v-else class="user-selection">
          <div class="selection-header">
            <div class="success-icon">
              <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="selection-title">選擇您的身份</h2>
            <p class="selection-subtitle">歡迎訪問寫作空間</p>
          </div>

          <div class="user-buttons">
            <!-- 芊的按鈕 -->
            <button
              @click="loginAs('qian')"
              class="user-btn qian-btn"
            >
              <div class="user-btn-content">
                <div class="user-avatar">
                  <span class="avatar-text">芊</span>
                </div>
                <div class="user-info">
                  <div class="user-name">芊的寫作空間</div>
                  <div class="user-desc qian-desc">文學創作與靈感記錄</div>
                </div>
              </div>
            </button>

            <!-- 璟的按鈕 -->
            <button
              @click="loginAs('jing')"
              class="user-btn jing-btn"
            >
              <div class="user-btn-content">
                <div class="user-avatar">
                  <span class="avatar-text">璟</span>
                </div>
                <div class="user-info">
                  <div class="user-name">璟的寫作空間</div>
                  <div class="user-desc jing-desc">深度思考與創意表達</div>
                </div>
              </div>
            </button>
          </div>

          <!-- 登出按鈕 -->
          <div class="logout-section">
            <button
              @click="logout"
              class="logout-btn"
            >
              重新輸入密碼
            </button>
          </div>
        </div>        <!-- 底部說明 -->
        <div class="footer-description">
          <p class="description-text">
            歡迎來到您的專屬寫作天地
          </p>
        </div>
      </div>

      <!-- 底部裝飾 -->
      <div class="copyright">
        <p class="copyright-text">
          © 2025 WriteApp - 讓文字綻放光彩
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#app'

// 密碼相關狀態
const passwordInput = ref('')
const isPasswordCorrect = ref(false)
const passwordError = ref('')

// 設置密碼（您可以修改這個密碼）
const correctPassword = '01200319'

// 檢查密碼
const checkPassword = () => {
  if (passwordInput.value === correctPassword) {
    isPasswordCorrect.value = true
    passwordError.value = ''
    // 將密碼驗證狀態保存到 sessionStorage
    if (process.client) {
      sessionStorage.setItem('writeapp_authenticated', 'true')
    }
  } else {
    passwordError.value = '密碼錯誤，請重新輸入'
    passwordInput.value = ''
  }
}

// 登出功能
const logout = () => {
  isPasswordCorrect.value = false
  passwordInput.value = ''
  passwordError.value = ''
  if (process.client) {
    sessionStorage.removeItem('writeapp_authenticated')
  }
}

// 用戶登入
const loginAs = (user) => {
  if (user === 'qian') {
    navigateTo('/qian')
  } else if (user === 'jing') {
    navigateTo('/jing')
  }
}

// 檢查是否已經驗證過密碼
onMounted(() => {
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('writeapp_authenticated')
    if (isAuthenticated === 'true') {
      isPasswordCorrect.value = true
    }
  }
})

// 設置頁面標題
useHead({
  title: 'WriteApp - 寫作登入',
  meta: [
    { name: 'description', content: '選擇您的寫作身份，開始創作之旅' }
  ]
})
</script>

<style scoped>
/* === 主要佈局 === */
.main-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1e293b, #065f46, #0f172a);
  background-size: 200% 100%;
  animation: gradientShift 10s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.content-wrapper {
  width: 100%;
  max-width: 32rem;
}

/* === 標題區域 === */
.title-section {
  text-align: center;
  margin-bottom: 2rem;
}

.title-icon {
  display: inline-block;
  background-color: #047857;
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.icon-svg {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
}

.main-title {
  font-size: 3.75rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}

.subtitle {
  color: #a7f3d0;
  font-size: 1.25rem;
}

/* === 登入卡片 === */
.login-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* === 密碼輸入區域 === */
.password-section {
  margin-bottom: 2rem;
}

.password-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.password-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.password-subtitle {
  color: #a7f3d0;
}

.password-input-container {
  width: 100%;  /* 使用完整寬度以適應卡片 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  position: relative;
  width: 100%;  /* 確保輸入框組件佔據容器完整寬度 */
}

.input-wrapper {
  position: relative;
}

.password-input {
  width: 100%; /* 確保佔據父元素完整寬度 */
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1.125rem;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: block; /* 確保為塊級元素 */
  box-sizing: border-box; /* 確保 padding 不會增加寬度 */
}

.password-input::placeholder {
  color: rgba(167, 243, 208, 0.7);
}

.password-input:focus {
  border-color: #6ee7b7;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 3px rgba(16, 185, 129, 0.15);
  background: rgba(255, 255, 255, 0.12);
}

.password-input:hover {
  background: rgba(255, 255, 255, 0.1);  border-color: rgba(16, 185, 129, 0.3);
}

.input-decoration-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #6ee7b7, #14b8a6, #6ee7b7);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  border-radius: 9999px;
}

.input-group:focus-within .input-decoration-line {
  transform: scaleX(1);
}

.input-glow-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1), rgba(16, 185, 129, 0.1));
  border-radius: 1rem;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -10;
}

.input-group:focus-within .input-glow-effect {
  opacity: 1;
}

/* === 確認按鈕 === */
.confirm-btn {
  width: 100%;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, #059669, #047857, #0d9488);
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  transform: scale(1);
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: block; /* 確保為塊級元素 */
  box-sizing: border-box; /* 確保 padding 不會增加寬度 */
  max-width: 100%; /* 確保不超過父容器 */
}

.confirm-btn:hover {
  background: linear-gradient(to right, #10b981, #059669, #14b8a6);
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.5);
}

.btn-light-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  transform: skewX(-12deg) translateX(-100%);
  transition: transform 0.7s ease;
}

.confirm-btn:hover .btn-light-effect {
  transform: skewX(-12deg) translateX(100%);
}

.btn-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* === 錯誤訊息 === */
.error-message {
  margin-top: 1rem;
  text-align: center;
}

.error-text {
  color: #f87171;
  font-size: 0.875rem;
}

/* === 用戶選擇區域 === */
.user-selection {
  margin-bottom: 2rem;
}

.selection-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.success-icon {
  display: inline-block;
  background-color: #059669;
  padding: 0.75rem;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.check-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.selection-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.selection-subtitle {
  color: #a7f3d0;
}

.user-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .user-buttons {
    flex-direction: row;
  }
}

.user-btn {
  flex: 1;
  font-weight: 600;
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  transform: scale(1);
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.user-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.qian-btn {
  background-color: #059669;
  color: white;
}

.qian-btn:hover {
  background-color: #047857;
}

.jing-btn {
  background-color: #0d9488;
  color: white;
}

.jing-btn:hover {
  background-color: #0f766e;
}

.user-btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 4rem;
  height: 4rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-size: 1.875rem;
  font-weight: bold;
}

.user-info {
  text-align: center;
}

.user-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.user-desc {
  font-size: 1.125rem;
}

.qian-desc {
  color: #a7f3d0;
}

.jing-desc {
  color: #99f6e4;
}

/* === 登出按鈕 === */
.logout-section {
  margin-top: 1.5rem;
  text-align: center;
}

.logout-btn {
  color: #6ee7b7;
  font-size: 0.875rem;
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-btn:hover {
  color: white;
}

/* === 底部說明 === */
.footer-description {
  margin-top: 2rem;
  text-align: center;
}

.description-text {
  color: #6ee7b7;
  font-size: 1.125rem;
}

/* === 版權信息 === */
.copyright {
  text-align: center;
  margin-top: 2rem;
}

.copyright-text {
  color: #6ee7b7;
  font-size: 1rem;
}

/* === 響應式設計 === */
@media (max-width: 640px) {
  .main-title {
    font-size: 3rem;
  }
  
  .password-title,
  .selection-title {
    font-size: 1.25rem;
  }
  
  .user-btn {
    padding: 1.5rem 1rem;
  }
  
  .user-name {
    font-size: 1.25rem;
  }
  
  .user-desc {
    font-size: 1rem;
  }
}

/* === 動畫效果 === */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* === 通用過渡效果 === */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
