<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
    <AppHeader userName="芊" userPath="qian" />

    <!-- 主要內容 -->
    <div class="max-w-5xl mx-auto p-6">
      <!-- 歡迎區域 -->
      <div class="text-center mb-12 pt-8">
        <div class="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-emerald-200">
          <span class="text-white font-bold text-3xl">芊</span>
        </div>
        <h1 class="text-4xl font-bold text-emerald-50 mb-4">歡迎來到芊的個人空間</h1>
        <p class="text-xl text-emerald-200 leading-relaxed max-w-2xl mx-auto">
          你可以透過上方按鍵進入觀賞區與寫作區。<br>
          在這裡，享受文字創作的美好時光。
        </p>
      </div>      <!-- 兩個主要卡片區塊 -->
      <div class="grid lg:grid-cols-2 gap-8">
        
        <!-- 卡片1：推薦璟的最新文章 -->
        <fieldset class="relative border-2 border-emerald-300 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
          <legend class="mx-6 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg text-lg">
            璟的最新創作
          </legend>
          
          <!-- 卡片內容區域 -->
          <div class="p-8 pb-16 relative min-h-[400px]">
            <div v-if="latestJingArticle">
              <!-- 文章內容 -->
              <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-emerald-200 pb-2">
                  {{ latestJingArticle.title }}
                </h3>
                <div class="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400 mb-4">
                  <p class="text-gray-700 leading-relaxed line-clamp-4">{{ getPreview(latestJingArticle.content) }}</p>
                </div>
                <div class="flex items-center text-sm text-emerald-600 mb-4">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>發布於 {{ formatDate(latestJingArticle.publishedAt) }}</span>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-600 mb-2">等待璟的創作</h3>
              <p class="text-gray-500 text-sm">璟還沒有發布文章，期待她的第一篇精彩創作！</p>
            </div>

            <!-- Read More 按鈕 - 固定在右下角 -->
            <div class="absolute bottom-6 right-6">
              <NuxtLink
                to="/qian/read"
                class="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition duration-300 font-medium shadow-lg text-sm flex items-center space-x-2"
              >
                <span>Read More</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </fieldset>

        <!-- 卡片2：我的收藏文章 -->
        <fieldset class="relative border-2 border-pink-300 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
          <legend class="mx-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg text-lg">
            我的收藏
          </legend>
          
          <!-- 卡片內容區域 -->
          <div class="p-8 pb-16 relative min-h-[400px]">
            <div v-if="favoriteArticles.length > 0">
              <!-- 收藏列表 -->
              <div class="space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
                <div 
                  v-for="article in favoriteArticles.slice(0, 3)" 
                  :key="article.id"
                  class="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-400 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-800 mb-2 line-clamp-1">{{ article.title }}</h4>
                      <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ getPreview(article.content) }}</p>
                      <div class="flex items-center space-x-3 text-xs text-gray-500">
                        <span class="flex items-center">
                          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          {{ article.author }}
                        </span>
                        <span>{{ formatDate(article.publishedAt) }}</span>
                      </div>
                    </div>
                    <button
                      @click="removeFavorite(article.id)"
                      class="ml-3 text-pink-400 hover:text-pink-600 transition-colors p-1 rounded hover:bg-pink-100"
                      title="取消收藏"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div v-if="favoriteArticles.length > 3" class="text-center pt-2">
                  <span class="text-pink-600 text-sm font-medium">還有 {{ favoriteArticles.length - 3 }} 篇收藏...</span>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-600 mb-2">還沒有收藏</h3>
              <p class="text-gray-500 text-sm">去觀賞區發現精彩內容吧！</p>
            </div>

            <!-- Learn More 按鈕 - 固定在右下角 -->
            <div class="absolute bottom-6 right-6">
              <NuxtLink
                to="/qian/read"
                class="group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2.5 rounded-lg hover:from-pink-600 hover:to-rose-600 transition duration-300 font-medium shadow-lg text-sm flex items-center space-x-2"
              >
                <span>Learn More</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </fieldset>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'

// 響應式數據
const latestJingArticle = ref(null)
const favoriteArticles = ref([])

onMounted(async () => {
  // 密碼驗證檢查
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('writeapp_authenticated')
    if (isAuthenticated !== 'true') {
      navigateTo('/')
      return
    }
  }

  // 載入璟的最新文章
  await loadLatestJingArticle()
  
  // 載入收藏文章
  await loadFavoriteArticles()
})

// 載入璟的最新文章
const loadLatestJingArticle = async () => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, query, orderBy, limit, getDocs, where } = await import('firebase/firestore')
      
      const q = query(
        collection(db, 'jing_articles'),
        where('published', '==', true),
        orderBy('publishedAt', 'desc'),
        limit(1)
      )
      
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        latestJingArticle.value = {
          id: doc.id,
          ...doc.data()
        }
      }
    }
  } catch (error) {
    console.error('載入璟的最新文章失敗:', error)
  }
}

// 載入收藏文章
const loadFavoriteArticles = async () => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, query, where, getDocs } = await import('firebase/firestore')
      
      const q = query(
        collection(db, 'qian_favorites'),
        where('userId', '==', 'qian')
      )
      
      const querySnapshot = await getDocs(q)
      favoriteArticles.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
  } catch (error) {
    console.error('載入收藏文章失敗:', error)
  }
}

// 取消收藏文章
const removeFavorite = async (articleId) => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { doc, deleteDoc } = await import('firebase/firestore')
      
      await deleteDoc(doc(db, 'qian_favorites', articleId))
      
      // 從本地列表中移除
      favoriteArticles.value = favoriteArticles.value.filter(article => article.id !== articleId)
    }
  } catch (error) {
    console.error('取消收藏失敗:', error)
  }
}

// 工具函數：獲取文章預覽
const getPreview = (content) => {
  if (!content) return '暫無內容預覽'
  return content.length > 100 ? content.substring(0, 100) + '...' : content
}

// 工具函數：格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 設置頁面標題
useHead({
  title: '芊的個人空間 - WriteApp',
  meta: [
    { name: 'description', content: '芊的個人寫作空間，探索文字創作的美好' }
  ]
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #ec4899 #fce7f3;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #fce7f3;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ec4899;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #db2777;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>
