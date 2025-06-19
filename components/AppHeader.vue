<template>
  <nav class="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-xl sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo 和用戶資訊 -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-xl">{{ userName }}</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">{{ userName }}的寫作天地</h1>
            <p class="text-emerald-200 text-sm">WriteApp - 創作無限</p>
          </div>
        </div>

        <!-- 導航按鈕區域 -->
        <div class="flex items-center bg-emerald-900/30 backdrop-blur-sm rounded-2xl p-2 space-x-1">
          <NuxtLink
            :to="`/${userPath}`"
            class="nav-btn"
            :class="{ 'nav-btn-active': currentRoute === `/${userPath}` }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span class="ml-2 font-medium">首頁</span>
          </NuxtLink>

          <NuxtLink
            :to="`/${userPath}/write`"
            class="nav-btn"
            :class="{ 'nav-btn-active': currentRoute === `/${userPath}/write` }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            <span class="ml-2 font-medium">寫作空間</span>
          </NuxtLink>

          <NuxtLink
            :to="`/${userPath}/read`"
            class="nav-btn"
            :class="{ 'nav-btn-active': currentRoute === `/${userPath}/read` }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="ml-2 font-medium">觀賞空間</span>
          </NuxtLink>

          <div class="w-px h-8 bg-emerald-600 mx-2"></div>

          <button
            @click="logout"
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

const route = useRoute()
const currentRoute = computed(() => route.path)

const logout = () => {
  // 清除驗證狀態
  if (process.client) {
    sessionStorage.removeItem('writeapp_authenticated')
  }
  navigateTo('/')
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
  color: rgb(209 250 229);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(16, 185, 129, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.nav-btn:hover::before {
  left: 100%;
}

.nav-btn:hover {
  color: white;
  background: rgba(16, 185, 129, 0.3);
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.2);
}

.nav-btn-active {
  background: rgba(16, 185, 129, 0.4);
  color: white;
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
}

.nav-btn-logout {
  color: rgb(252 165 165);
  border-color: rgba(239, 68, 68, 0.2);
}

.nav-btn-logout:hover {
  color: white;
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.4);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);
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
