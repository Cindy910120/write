<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
    <AppHeader userName="璟" userPath="jing" />
    
    <div class="max-w-6xl mx-auto p-6">
      <!-- 頁面標題 -->
      <div class="text-center mb-8">
        <div class="inline-block bg-emerald-700 p-4 rounded-full mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">芊的文章</h1>
        <p class="text-gray-600">欣賞芊的創作世界</p>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <svg class="w-8 h-8 animate-spin text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2 text-gray-600">載入中...</span>
      </div>

      <!-- 文章列表 -->
      <div v-else-if="articles.length > 0" class="grid gap-6">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- 文章標頭 -->
          <div class="bg-gradient-to-r from-pink-500 to-rose-500 p-6">
            <h2 class="text-xl font-bold text-white mb-2">{{ article.title }}</h2>            <div class="flex items-center justify-between text-pink-100 text-sm">
              <div class="flex items-center space-x-4">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  芊
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ formatDate(article.publishedAt) }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"></path>
                  </svg>
                  {{ article.content.length }} 字
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <!-- 收藏按鈕 -->
                <button
                  @click="toggleFavorite(article)"
                  class="flex items-center space-x-1 hover:text-white transition-colors px-2 py-1 rounded"
                  :class="isFavorited(article.id) ? 'text-yellow-300' : 'text-pink-100'"
                  :title="isFavorited(article.id) ? '取消收藏' : '加入收藏'"
                >
                  <svg class="w-4 h-4" :fill="isFavorited(article.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span class="text-xs">{{ isFavorited(article.id) ? '已收藏' : '收藏' }}</span>
                </button>
                <!-- 展開/收起按鈕 -->
                <button
                  @click="toggleExpanded(article.id)"
                  class="flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <span>{{ expandedArticles.includes(article.id) ? '收起' : '展開' }}</span>
                  <svg 
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedArticles.includes(article.id) }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 文章內容 -->
          <div class="p-6">
            <div 
              class="text-gray-700 leading-relaxed"
              :class="{ 'line-clamp-3': !expandedArticles.includes(article.id) }"
            >
              {{ article.content }}
            </div>
            
            <!-- 標籤 -->
            <div v-if="article.tags && article.tags.length > 0" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- 空狀態 -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">還沒有文章</h3>
        <p class="text-gray-500">芊還沒有發布任何文章</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'

// 響應式數據
const loading = ref(true)
const articles = ref([])
const expandedArticles = ref([])
const favoriteArticles = ref([])

// 密碼驗證與初始化
onMounted(async () => {
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('writeapp_authenticated')
    if (isAuthenticated !== 'true') {
      navigateTo('/')
      return
    }
    
    // 載入文章和收藏
    await loadArticles()
    await loadFavorites()
  }
})

// 載入芊的文章
const loadArticles = async () => {
  loading.value = true
  
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')
      
      // 查詢芊的已發布文章
      const q = query(
        collection(db, 'qian_articles'),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      articles.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
  } catch (error) {
    console.error('載入文章失敗:', error)
  } finally {
    loading.value = false
  }
}

// 載入收藏文章
const loadFavorites = async () => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, query, where, getDocs } = await import('firebase/firestore')
      
      const q = query(
        collection(db, 'jing_favorites'),
        where('userId', '==', 'jing')
      )
      
      const querySnapshot = await getDocs(q)
      favoriteArticles.value = querySnapshot.docs.map(doc => doc.data().articleId)
    }
  } catch (error) {
    console.error('載入收藏失敗:', error)
  }
}

// 切換收藏狀態
const toggleFavorite = async (article) => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, doc, setDoc, deleteDoc, query, where, getDocs } = await import('firebase/firestore')
      
      const isCurrentlyFavorited = isFavorited(article.id)
      
      if (isCurrentlyFavorited) {
        // 取消收藏
        const q = query(
          collection(db, 'jing_favorites'),
          where('userId', '==', 'jing'),
          where('articleId', '==', article.id)
        )
        
        const querySnapshot = await getDocs(q)
        for (const docSnapshot of querySnapshot.docs) {
          await deleteDoc(doc(db, 'jing_favorites', docSnapshot.id))
        }
        
        // 更新本地狀態
        favoriteArticles.value = favoriteArticles.value.filter(id => id !== article.id)
      } else {
        // 添加收藏
        const favoriteRef = doc(collection(db, 'jing_favorites'))
        await setDoc(favoriteRef, {
          userId: 'jing',
          articleId: article.id,
          title: article.title,
          content: article.content,
          author: article.author,
          publishedAt: article.publishedAt,
          createdAt: new Date()
        })
        
        // 更新本地狀態
        favoriteArticles.value.push(article.id)
      }
    }
  } catch (error) {
    console.error('收藏操作失敗:', error)
  }
}

// 檢查是否已收藏
const isFavorited = (articleId) => {
  return favoriteArticles.value.includes(articleId)
}

// 切換文章展開狀態
const toggleExpanded = (articleId) => {
  const index = expandedArticles.value.indexOf(articleId)
  if (index > -1) {
    expandedArticles.value.splice(index, 1)
  } else {
    expandedArticles.value.push(articleId)
  }
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 設置頁面標題
useHead({
  title: '觀賞空間 - 芊的文章 | WriteApp',
  meta: [
    { name: 'description', content: '欣賞芊的創作作品' }
  ]
})
</script>

<style scoped>
/* 文字截斷樣式 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 平滑動畫 */
.transition-shadow {
  transition: box-shadow 0.3s ease;
}
</style>
