<template>
  <nav class="sticky top-0 z-50" style="background-color: rgba(47, 79, 79, 0.7);">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-20" style="position: relative; z-index: 60;">
        <!-- Logo 和用戶資訊 -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg">
          </div>
          <div>
            <h1 class="text-xl font-bold" style="color: white !important;">{{ userName }}的寫作天地</h1>
            <p class="text-sm" style="color: white !important;">WriteApp - 創作無限</p>
          </div>
        </div>        <!-- 導航按鈕區域 -->
        <div class="flex items-center bg-slate-900/40 backdrop-blur-sm rounded-2xl p-2 space-x-1">
          
          <!-- 首頁按鈕 -->
          <button
            @click="navigateToHome"
            @mousedown="debugClick('首頁')"
            :class="{ 'nav-btn-active': isCurrentRoute(`/${userPath}`) }"
            class="nav-btn"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span class="ml-2 font-medium">首頁</span>
          </button>

          <!-- 寫作空間按鈕 -->
          <button
            @click="navigateToWrite"
            @mousedown="debugClick('寫作空間')"
            :class="{ 'nav-btn-active': isCurrentRoute(`/${userPath}/write`) }"
            class="nav-btn"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            <span class="ml-2 font-medium">寫作空間</span>
          </button>

          <!-- 觀賞空間按鈕 -->
          <button
            @click="navigateToRead"
            @mousedown="debugClick('觀賞空間')"
            :class="{ 'nav-btn-active': isCurrentRoute(`/${userPath}/read`) }"
            class="nav-btn"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="ml-2 font-medium">觀賞空間</span>
          </button>

          <div class="w-px h-8 bg-slate-500 mx-2"></div>

          <!-- 登出按鈕 -->
          <button
            @click="logout"
            @mousedown="debugClick('登出')"
            class="nav-btn nav-btn-logout"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span class="ml-2 font-medium">登出</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// === PROPS 定義 ===
const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  userPath: {
    type: String,
    required: true
  }
})

// === REACTIVE 數據 ===
const route = useRoute()
const currentRoute = computed(() => route.path)

// === 導航處理函數 ===
const navigateToHome = async () => {
  console.log('=== 導航到首頁 ===')
  console.log('當前路由:', route.path)
  console.log('用戶路徑:', props.userPath)
  const targetPath = `/${props.userPath}`
  console.log('目標路徑:', targetPath)
  
  try {
    await navigateTo(targetPath)
    console.log('導航成功!')
  } catch (error) {
    console.error('導航失敗:', error)
  }
}

const navigateToWrite = async () => {
  console.log('=== 導航到寫作空間 ===')
  console.log('當前路由:', route.path)
  console.log('用戶路徑:', props.userPath)
  const targetPath = `/${props.userPath}/write`
  console.log('目標路徑:', targetPath)
  
  try {
    await navigateTo(targetPath)
    console.log('導航成功!')
  } catch (error) {
    console.error('導航失敗:', error)
  }
}

const navigateToRead = async () => {
  console.log('=== 導航到觀賞空間 ===')
  console.log('當前路由:', route.path)
  console.log('用戶路徑:', props.userPath)
  const targetPath = `/${props.userPath}/read`
  console.log('目標路徑:', targetPath)
  
  try {
    await navigateTo(targetPath)
    console.log('導航成功!')
  } catch (error) {
    console.error('導航失敗:', error)
  }
}

// === 登出處理函數 ===
const logout = () => {
  console.log('=== 執行登出 ===')
  
  // 清除驗證狀態
  if (process.client) {
    sessionStorage.removeItem('writeapp_authenticated')
    console.log('Session 已清除')
  }
  
  // 導航到首頁
  navigateTo('/')
  console.log('已導航到登入頁面')
}

// === 路徑檢查函數 ===
const isCurrentRoute = (routePath) => {
  return currentRoute.value === routePath
}

// === 調試函數 ===
const debugClick = (buttonName) => {
  console.log(`=== ${buttonName} 按鈕被點擊 ===`)
  console.log('Props:', props)
  console.log('當前路由:', currentRoute.value)
}
</script>

<style scoped>
.nav-btn {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white !important;
  background: rgba(47, 79, 79, 0.9);
  backdrop-filter: blur(8px);
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  cursor: pointer !important;
  z-index: 20;
  pointer-events: auto !important;
  user-select: none;
}

.nav-btn * {
  pointer-events: none;
  color: inherit;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: left 0.5s;
  pointer-events: none;
  z-index: -1;
}

.nav-btn:hover::before {
  left: 100%;
}

.nav-btn:hover {
  color: white !important;
  background: rgba(148, 163, 184, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(148, 163, 184, 0.25);
}

.nav-btn-active {
  background: rgba(47, 79, 79, 0.6);
  color: white !important;
  box-shadow: 0 4px 15px rgba(148, 163, 184, 0.3);
}

.nav-btn-logout {
  color: rgb(248 113 113) !important;
}

.nav-btn-logout:hover {
  color: white !important;
  background: rgba(239, 68, 68, 0.35);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.25);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .nav-btn span {
    display: none;
  }
  
  .nav-btn {
    padding: 0.75rem;
    min-width: 3rem;
    justify-content: center;
  }
}

/* 漸變背景動畫 */
.bg-gradient-to-r {
  background-size: 200% 100%;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
