<template>  <div class="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
    <AppHeader userName="璟" userPath="jing" />

    <!-- 主要內容 -->
    <div class="max-w-5xl mx-auto p-6">
      <!-- 歡迎區域 -->
      <div class="text-center mb-12 pt-8">
        <h1 class="text-4xl font-bold text-white mb-6">璟的寫作空間</h1>
        <p class="text-xl text-emerald-200 leading-relaxed max-w-2xl mx-auto">
          你可以透過上方按鍵進入觀賞區與寫作區。<br>
          在這裡，享受文字創作的美好時光。
        </p>
      </div>

      <!-- 兩個主要卡片區塊 -->
      <div class="grid lg:grid-cols-2 gap-8">
        
        <!-- 卡片1：推薦芊的最新文章 - UCard 樣式 -->
        <div class="bg-white border border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-rose-500">
            <h2 class="text-xl font-bold text-white">
              芊的最新創作
            </h2>
          </div>

          <!-- Main Content -->
          <div class="p-6 min-h-[320px] flex flex-col">
            <div v-if="latestQianArticle" class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-3">
                {{ latestQianArticle.title }}
              </h3>
              <div class="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-400 mb-4">
                <p class="text-gray-700 leading-relaxed line-clamp-4">{{ getPreview(latestQianArticle.content) }}</p>
              </div>
              <div class="flex items-center text-sm text-pink-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>發布於 {{ formatDate(latestQianArticle.publishedAt) }}</span>
              </div>
            </div>
              <div v-else class="flex-1 flex items-center justify-center">
              <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-600 mb-2">等待芊的創作</h3>
                <p class="text-gray-500 text-sm">芊還沒有發布文章，期待她的第一篇精彩創作！</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <NuxtLink
              to="/jing/read"
              class="group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2.5 rounded-lg hover:from-pink-600 hover:to-rose-600 transition duration-300 font-medium shadow-lg text-sm flex items-center space-x-2"
            >
              <span>Read More</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- 卡片2：我的收藏文章 - UCard 樣式 -->
        <div class="bg-white border border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600">
            <h2 class="text-xl font-bold text-white">
              我的收藏
            </h2>
          </div>

          <!-- Main Content -->
          <div class="p-6 min-h-[320px] flex flex-col">
            <div v-if="favoriteArticles.length > 0" class="flex-1">
              <div class="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                <div 
                  v-for="article in favoriteArticles.slice(0, 3)" 
                  :key="article.id"
                  class="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400 hover:shadow-md transition-shadow"
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
                      class="ml-3 text-emerald-400 hover:text-emerald-600 transition-colors p-1 rounded hover:bg-emerald-100"
                      title="取消收藏"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div v-if="favoriteArticles.length > 3" class="text-center pt-2">
                  <span class="text-emerald-600 text-sm font-medium">還有 {{ favoriteArticles.length - 3 }} 篇收藏...</span>
                </div>
              </div>
            </div>
              <div v-else class="flex-1 flex items-center justify-center">
              <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-600 mb-2">還沒有收藏</h3>
                <p class="text-gray-500 text-sm">去觀賞區發現精彩內容吧！</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <NuxtLink
              to="/jing/write"
              class="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition duration-300 font-medium shadow-lg text-sm flex items-center space-x-2"
            >
              <span>Start Writing</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>

      </div>

      <!-- 快捷功能區塊 -->
      <div class="mt-12 bg-white shadow-lg rounded-xl overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-4">
          <h2 class="text-xl font-bold text-white">快捷功能</h2>
        </div>
        <div class="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink to="/jing/write" class="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            <svg class="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            <span class="text-emerald-700 font-medium">開始寫作</span>
          </NuxtLink>
          
          <NuxtLink to="/jing/read" class="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            <svg class="w-8 h-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="text-emerald-700 font-medium">閱讀文章</span>
          </NuxtLink>
          
          <NuxtLink to="/qian/read" class="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
            <svg class="w-8 h-8 text-pink-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="text-pink-700 font-medium">芊的文章</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo, useRouter } from '#app'

// 響應式數據
const latestQianArticle = ref(null)
const favoriteArticles = ref([])
const router = useRouter()

onMounted(async () => {
  // 密碼驗證檢查
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('writeapp_authenticated')
    if (isAuthenticated !== 'true') {
      navigateTo('/')
      return
    }
  }

  // 載入芊的最新文章
  await loadLatestQianArticle()
  
  // 載入收藏文章
  await loadFavoriteArticles()
})

// 載入芊的最新文章
const loadLatestQianArticle = async () => {
  try {
    if (process.client) {
      const { db, fetchArticles } = await import('~/plugins/firebase.client')
      
      // 首先使用封裝好的方法
      try {
        const articles = await fetchArticles('qian', true);
        if (articles && articles.length > 0) {
          latestQianArticle.value = articles[0];
          return;
        }
      } catch (fetchError) {
        console.error('使用 fetchArticles 方法失敗:', fetchError);
      }
      
      // 如果上面的方法失敗，使用直接查詢方式
      const { collection, query, orderBy, limit, getDocs, where } = await import('firebase/firestore')
      
      // 顯式列出所有欄位名稱確保匹配
      console.log('嘗試直接查詢文章集合');
      const articlesRef = collection(db, 'articles');
      const q = query(
        articlesRef,
        where('published', '==', true),
        where('author', '==', 'qian'),
        orderBy('publishedAt', 'desc'),
        limit(1)
      )
      
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        console.log('找到芊的文章:', doc.id);
        latestQianArticle.value = {
          id: doc.id,
          ...doc.data()
        }
      } else {
        console.log('未找到芊的文章');
        
        // 嘗試只按作者過濾
        const simpleQ = query(
          articlesRef,
          where('author', '==', 'qian'),
          limit(1)
        );
        
        const simpleSnapshot = await getDocs(simpleQ);
        if (!simpleSnapshot.empty) {
          const doc = simpleSnapshot.docs[0];
          console.log('找到芊的未發布文章:', doc.id);
          latestQianArticle.value = {
            id: doc.id,
            ...doc.data()
          }
        } else {
          console.log('芊沒有任何文章');
          
          // 如果沒有任何文章，創建一個假文章用於展示
          latestQianArticle.value = {
            id: 'sample',
            title: '歡迎來到芊的創作空間',
            content: '這是一個示例文章，展示了文章的顯示格式。芊尚未發表任何文章，這只是一個佔位符。',
            publishedAt: new Date(),
            author: 'qian',
            published: true
          }
        }
      }
    }
  } catch (error) {
    console.error('載入芊的最新文章失敗:', error)
  }
}

// 載入收藏文章
const loadFavoriteArticles = async () => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, query, where, getDocs, getDoc, doc } = await import('firebase/firestore')
      
      console.log('嘗試載入璟的收藏文章');
      
      // 查詢收藏記錄
      const favoritesRef = collection(db, 'favorites');
      const q = query(
        favoritesRef,
        where('userId', '==', 'jing')
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('未找到收藏記錄');
        favoriteArticles.value = [];
        return;
      }
      
      console.log(`找到 ${querySnapshot.size} 條收藏記錄`);
      
      // 收集所有收藏的文章ID
      const favItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // 如果收藏記錄本身包含了完整的文章資料，直接使用
      if (favItems.length > 0 && favItems[0].title && favItems[0].content) {
        favoriteArticles.value = favItems;
        console.log('收藏記錄包含完整文章資料');
        return;
      }
      
      // 否則，獲取每篇文章的詳細資訊
      const articlesWithDetails = [];
      
      for (const fav of favItems) {
        if (fav.articleId) {
          try {
            const articleDoc = await getDoc(doc(db, 'articles', fav.articleId));
            if (articleDoc.exists()) {
              articlesWithDetails.push({
                id: articleDoc.id,
                ...articleDoc.data(),
                favoriteId: fav.id // 保存收藏記錄ID以便後續操作
              });
            }
          } catch (error) {
            console.error(`獲取文章 ${fav.articleId} 詳細資訊失敗:`, error);
          }
        }
      }
      
      favoriteArticles.value = articlesWithDetails;
      console.log(`成功載入 ${articlesWithDetails.length} 篇收藏文章詳細資訊`);
      
      // 如果沒有找到任何收藏，加入一個樣例
      if (articlesWithDetails.length === 0) {
        favoriteArticles.value = [{
          id: 'sample',
          title: '示例收藏文章',
          content: '這是一個示例收藏文章，展示了收藏文章的顯示格式。',
          author: '示例作者',
          publishedAt: new Date(),
        }];
      }
    }
  } catch (error) {
    console.error('載入收藏文章失敗:', error);
    favoriteArticles.value = [];
  }
}

// 取消收藏文章
const removeFavorite = async (articleId) => {
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { doc, deleteDoc } = await import('firebase/firestore')
      
      await deleteDoc(doc(db, 'favorites', articleId))
      
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
  title: '璟的個人空間 - WriteApp',
  meta: [
    { name: 'description', content: '璟的個人寫作空間，探索文字創作的美好' }
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
  scrollbar-color: #10b981 #d1fae5;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #d1fae5;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #059669;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>
