<template>
  <nav class="app-header" :class="userTypeClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20 relative z-50">
        <!-- Logo 和用戶資訊 -->
        <div class="flex items-center space-x-4">
          <div class="user-avatar">
            <span class="avatar-text">{{ userInitial }}</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">{{ userName }}的寫作天地</h1>
            <p class="text-sm text-white opacity-80">WriteApp - 創作無限</p>
          </div>
        </div>
        
        <!-- 導航按鈕區域 -->
        <div class="nav-buttons-container">
          <!-- 首頁按鈕 -->
          <button
            @click="navigateToHome"
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
            :class="{ 'nav-btn-active': isCurrentRoute(`/${userPath}/read`) }"
            class="nav-btn"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="ml-2 font-medium">觀賞空間</span>
          </button>

          <div class="divider"></div>

          <!-- 登出按鈕 -->
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
// === PROPS 定義 ===
const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  userPath: {
    type: String,
    required: true,
    validator: (value) => ['jing', 'qian'].includes(value)
  }
})

// === 計算屬性 ===
const userInitial = computed(() => props.userName?.charAt(0) || '');
const userTypeClass = computed(() => `app-header-${props.userPath}`);

// === REACTIVE 數據 ===
const route = useRoute();
const router = useRouter();
const currentRoute = computed(() => route.path);

// === 導航處理函數 ===
const navigateToHome = () => {
  const targetPath = `/${props.userPath}`;
  router.push(targetPath);
}

const navigateToWrite = () => {
  const targetPath = `/${props.userPath}/write`;
  router.push(targetPath);
}

const navigateToRead = () => {
  const targetPath = `/${props.userPath}/read`;
  router.push(targetPath);
}

// === 登出處理函數 ===
const logout = () => {
  // 清除驗證狀態
  if (process.client) {
    sessionStorage.removeItem('writeapp_authenticated');
  }
  
  // 導航到首頁
  router.push('/');
}

// === 路徑檢查函數 ===
const isCurrentRoute = (routePath) => {
  return currentRoute.value === routePath;
}
</script>

<style scoped>
/* === 頭部主要樣式 === */
.app-header {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 0.5rem 0;
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
  background-color: rgba(6, 78, 59, 0.75);
  pointer-events: auto !important;
}

/* 特定用戶類型樣式 */
.app-header-jing {
  background-color: rgba(var(--color-jing-secondary), 0.75);
  border-bottom: 1px solid rgba(var(--color-jing-accent), 0.1);
}

.app-header-qian {
  background-color: rgba(var(--color-qian-secondary), 0.75);
  border-bottom: 1px solid rgba(var(--color-qian-accent), 0.1);
}

/* 用戶頭像 */
.user-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.app-header-jing .user-avatar {
  background: linear-gradient(135deg, rgb(var(--color-jing-primary)), rgb(var(--color-jing-secondary)));
}

.app-header-qian .user-avatar {
  background: linear-gradient(135deg, rgb(var(--color-qian-primary)), rgb(var(--color-qian-secondary)));
}

.avatar-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

/* 導航按鈕容器 */
.nav-buttons-container {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: var(--border-radius-xl);
  padding: 0.5rem;
  gap: 0.25rem;
}

/* 分隔線 */
.divider {
  width: 1px;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 0.5rem;
}

/* 按鈕樣式 */
.nav-btn {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius-lg);
  font-size: 0.875rem;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  transition: var(--transition-normal);
  cursor: pointer !important;
  position: relative;
  overflow: hidden;
  z-index: 20;
  pointer-events: auto !important;
  user-select: none;
}

.app-header-jing .nav-btn {
  background: rgba(var(--color-jing-primary), 0.4);
  box-shadow: 0 0 5px rgba(var(--color-jing-accent), 0.4);
}

.app-header-qian .nav-btn {
  background: rgba(var(--color-qian-primary), 0.4);
  box-shadow: 0 0 5px rgba(var(--color-qian-accent), 0.4);
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
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

/* 按鈕激活狀態 */
.app-header-jing .nav-btn-active {
  background: rgba(var(--color-jing-primary), 0.4);
  box-shadow: 0 0 15px rgba(var(--color-jing-accent), 0.4);
}

.app-header-qian .nav-btn-active {
  background: rgba(var(--color-qian-primary), 0.4);
  box-shadow: 0 0 15px rgba(var(--color-qian-accent), 0.4);
}

/* 登出按鈕 */
.nav-btn-logout {
  color: rgb(248 113 113);
}

.nav-btn-logout:hover {
  color: white;
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
  
  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .avatar-text {
    font-size: 1.25rem;
  }
}
</style>
