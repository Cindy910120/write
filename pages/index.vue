<template>  <div class="min-h-screen bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 flex items-center justify-center p-6">
    <!-- 主要容器 -->
    <div class="w-full max-w-2xl">      <!-- 標題區域 -->
      <div class="text-center mb-8">
        <div class="inline-block bg-emerald-700 p-4 rounded-full mb-6 shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </div>
        <h1 class="text-6xl font-bold text-white mb-4">WriteApp</h1>
        <p class="text-emerald-200 text-xl">選擇您的身份開始寫作</p>
      </div>      <!-- 登入卡片 -->
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-500/30">
        <!-- 密碼輸入區域 -->
        <div v-if="!isPasswordCorrect" class="mb-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-white mb-2">請輸入訪問密碼</h2>
            <p class="text-emerald-200">請輸入密碼以訪問寫作空間</p>
          </div>
          
          <div class="max-w-md mx-auto">
            <div class="relative">
              <input
                v-model="passwordInput"
                :type="showPassword ? 'text' : 'password'"
                @keyup.enter="checkPassword"
                class="w-full bg-white/10 border border-emerald-500/50 rounded-xl px-4 py-4 text-white text-lg placeholder-emerald-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                placeholder="請輸入密碼"
              />
              <button
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300 hover:text-white"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            
            <button
              @click="checkPassword"
              class="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              確認密碼
            </button>
            
            <div v-if="passwordError" class="mt-4 text-center">
              <p class="text-red-400 text-sm">{{ passwordError }}</p>
            </div>
          </div>
        </div>

        <!-- 用戶選擇區域 -->
        <div v-else>
          <div class="text-center mb-6">
            <div class="inline-block bg-emerald-600 p-3 rounded-full mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">選擇您的身份</h2>
            <p class="text-emerald-200">歡迎訪問寫作空間</p>
          </div>

          <div class="flex flex-col sm:flex-row gap-6">
            <!-- 芊的按鈕 -->
            <button
              @click="loginAs('qian')"
              class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-8 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div class="flex flex-col items-center space-y-4">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span class="text-3xl font-bold">芊</span>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-2">芊的寫作空間</div>
                  <div class="text-emerald-100 text-lg">文學創作與靈感記錄</div>
                </div>
              </div>
            </button>

            <!-- 璟的按鈕 -->
            <button
              @click="loginAs('jing')"
              class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-8 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div class="flex flex-col items-center space-y-4">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span class="text-3xl font-bold">璟</span>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold mb-2">璟的寫作空間</div>
                  <div class="text-teal-100 text-lg">深度思考與創意表達</div>
                </div>
              </div>
            </button>
          </div>

          <!-- 登出按鈕 -->
          <div class="mt-6 text-center">
            <button
              @click="logout"
              class="text-emerald-300 hover:text-white text-sm underline"
            >
              重新輸入密碼
            </button>
          </div>
        </div><!-- 底部說明 -->
        <div class="mt-8 text-center">
          <p class="text-emerald-300 text-lg">
            歡迎來到您的專屬寫作天地
          </p>
        </div>
      </div>

      <!-- 底部裝飾 -->
      <div class="text-center mt-8">
        <p class="text-emerald-400 text-base">
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
const showPassword = ref(false)

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
/* 確保背景漸變正確顯示 */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #1e293b, #065f46, #0f172a);
}

/* 毛玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 按鈕懸停動畫 */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: scale(1.02) translateY(-2px);
}

/* 陰影效果 */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
}

/* 響應式設計 */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .py-8 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  
  .max-w-2xl {
    max-width: 28rem;
  }
  
  .w-16 {
    width: 3rem;
    height: 3rem;
  }
  
  .h-16 {
    width: 3rem;
    height: 3rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
}
</style>
