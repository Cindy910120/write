<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
    <AppHeader userName="芊" userPath="qian" />
    
    <div class="max-w-6xl mx-auto p-6">
      <!-- 頁面標題 -->
      <div class="text-center mb-8">
        <div class="inline-block bg-pink-700 p-4 rounded-full mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">芊的觀賞空間</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">這裡收集了所有創作與思考。享受閱讀的時光吧！</p>
      </div>

      <!-- 文章來源切換 -->
      <div class="mb-6 p-4 bg-white rounded-xl shadow-md">
        <div class="flex flex-wrap items-center gap-4 justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-sm font-medium text-gray-700">選擇閱讀文章來源</span>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button 
              @click="currentAuthor = 'qian'"
              :class="{'bg-pink-600 text-white': currentAuthor === 'qian', 'bg-gray-100 text-gray-700 hover:bg-gray-200': currentAuthor !== 'qian'}"
              class="px-3 py-1 rounded-full text-sm transition-colors"
            >
              芊的文章
            </button>
            <button 
              @click="currentAuthor = 'jing'"
              :class="{'bg-pink-600 text-white': currentAuthor === 'jing', 'bg-gray-100 text-gray-700 hover:bg-gray-200': currentAuthor !== 'jing'}"
              class="px-3 py-1 rounded-full text-sm transition-colors"
            >
              璟的文章
            </button>
            <button 
              @click="currentAuthor = ''"
              :class="{'bg-pink-600 text-white': currentAuthor === '', 'bg-gray-100 text-gray-700 hover:bg-gray-200': currentAuthor !== ''}"
              class="px-3 py-1 rounded-full text-sm transition-colors"
            >
              全部文章
            </button>
          </div>
        </div>
      </div>

      <!-- 文章篩選器 -->
      <div class="mb-6 p-4 bg-white rounded-xl shadow-md">
        <div class="flex flex-wrap items-center gap-4 justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            <span class="text-sm font-medium text-gray-700">篩選文章標籤</span>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button 
              @click="currentTag = ''"
              :class="{'bg-pink-600 text-white': currentTag === '', 'bg-gray-100 text-gray-700 hover:bg-gray-200': currentTag !== ''}"
              class="px-3 py-1 rounded-full text-sm transition-colors"
            >
              全部
            </button>
            <button 
              v-for="tag in uniqueTags" 
              :key="tag"
              @click="currentTag = tag"
              :class="{'bg-pink-600 text-white': currentTag === tag, 'bg-gray-100 text-gray-700 hover:bg-gray-200': currentTag !== tag}"
              class="px-3 py-1 rounded-full text-sm transition-colors"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div v-if="filteredArticles.length > 0">
        <!-- 文章卡片 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <transition-group name="article-list">
            <div
              v-for="article in filteredArticles"
              :key="article.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div class="p-5">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-xl font-bold text-gray-800 line-clamp-2">{{ article.title }}</h3>
                  <span 
                    :class="article.author === 'jing' ? 'bg-emerald-100 text-emerald-700' : 'bg-pink-100 text-pink-700'"
                    class="text-xs px-2 py-1 rounded-full inline-flex items-center"
                  >
                    {{ article.author === 'jing' ? '璟' : '芊' }}
                  </span>
                </div>
                <p class="text-gray-600 line-clamp-3 mb-4">{{ getPreview(article.content) }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-pink-600">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ formatDate(article.publishedAt) }}</span>
                  </div>
                  <button
                    @click="viewArticle(article.id)"
                    class="text-sm text-white bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded-lg transition-colors"
                  >
                    閱讀
                  </button>
                </div>
              </div>
              <div class="px-5 py-3 bg-gray-50 border-t border-gray-200">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="(tag, tagIndex) in article.tags"
                    :key="tagIndex"
                    class="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>

      <!-- 無文章時的提示 -->
      <div v-else class="text-center py-16">
        <div class="inline-block p-6 rounded-full bg-pink-100 mb-4">
          <svg class="w-16 h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">尚未發佈文章</h2>
        <p class="text-gray-600 max-w-lg mx-auto">你還沒有發布任何文章。前往寫作空間，開始創作你的第一篇文章吧！</p>
        <button 
          @click="navigateToWrite"
          class="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
          開始寫作
        </button>
      </div>

      <!-- 文章閱讀彈窗 -->
      <div v-if="selectedArticle" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <!-- 文章頭部 -->
          <div class="p-6 border-b">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span 
                  :class="selectedArticle.author === 'jing' ? 'bg-emerald-100 text-emerald-700' : 'bg-pink-100 text-pink-700'"
                  class="text-xs px-2 py-1 rounded-full inline-flex items-center"
                >
                  {{ selectedArticle.author === 'jing' ? '璟' : '芊' }}
                </span>
                <h2 class="text-2xl font-bold text-gray-800">{{ selectedArticle.title }}</h2>
              </div>
              <button @click="selectedArticle = null" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ formatDate(selectedArticle.publishedAt) }}</span>
              </div>
              <span class="mx-2">•</span>
              <div>{{ selectedArticle.tags.join(', ') }}</div>
              <span class="mx-2">•</span>
              <div>{{ selectedArticle.content.length }} 字</div>
            </div>
          </div>

          <!-- 文章內容 -->
          <div class="p-6 overflow-y-auto flex-1">
            <div class="prose max-w-none">
              <p 
                class="whitespace-pre-line leading-relaxed" 
                :style="{ color: selectedArticle.textColor || 'rgb(55, 65, 81)' }"
              >
                {{ selectedArticle.content }}
              </p>
            </div>
          </div>

          <!-- 文章底部 -->
          <div class="p-4 border-t bg-gray-50 flex justify-end">
            <button 
              @click="selectedArticle = null"
              class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from 'firebase/firestore';

// 路由導航
const navigateToWrite = () => {
  navigateTo('/qian/write');
}

// 日期格式化
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  let date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (timestamp.seconds) {
    date = new Date(timestamp.seconds * 1000);
  } else {
    date = new Date(timestamp);
  }
  
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// 取得文章預覽
const getPreview = (content) => {
  if (!content) return '';
  return content.length > 150 ? content.substr(0, 150) + '...' : content;
}

// 文章數據
const articles = ref([]);
const selectedArticle = ref(null);
const currentTag = ref('');
const currentAuthor = ref('qian'); // 預設顯示芊的文章

// 獲取唯一標籤列表
const uniqueTags = computed(() => {
  const tags = new Set();
  articles.value.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});

// 篩選後的文章
const filteredArticles = computed(() => {
  let filtered = articles.value;
  
  // 依作者篩選
  if (currentAuthor.value) {
    filtered = filtered.filter(article => article.author === currentAuthor.value);
  }
  
  // 依標籤篩選
  if (currentTag.value) {
    filtered = filtered.filter(article => article.tags.includes(currentTag.value));
  }
  
  return filtered;
});

// 查看文章詳情
const viewArticle = (id) => {
  selectedArticle.value = articles.value.find(article => article.id === id);
  document.body.style.overflow = 'hidden'; // 防止滾動
}

// 取得所有已發布文章
const fetchAllPublishedArticles = async () => {
  try {
    const db = getFirestore();
    const articlesRef = collection(db, "articles");
    const q = query(
      articlesRef,
      where("published", "==", true),
      orderBy("publishedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const articlesList = [];
    
    querySnapshot.forEach((doc) => {
      articlesList.push({ 
        id: doc.id,
        ...doc.data() 
      });
    });
    
    articles.value = articlesList;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

// 初始化數據
onMounted(async () => {
  await fetchAllPublishedArticles();
});

// 清理
onBeforeUnmount(() => {
  document.body.style.overflow = ''; // 恢復滾動
});
</script>

<style scoped>
/* 文章列表動畫 */
.article-list-enter-active,
.article-list-leave-active {
  transition: all 0.5s ease;
}
.article-list-enter-from,
.article-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
