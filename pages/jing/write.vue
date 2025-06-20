<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
    <AppHeader userName="璟" userPath="jing" />
    
    <div class="max-w-5xl mx-auto p-6">
      <!-- 控制欄位 -->
      <div class="mb-6 p-4 bg-white rounded-xl shadow-md">
        <div class="flex flex-wrap items-center gap-4 justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <button 
              @click="newArticle"
              class="text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-lg transition-colors"
            >
              新建文章
            </button>
          </div>
          
          <div v-if="userArticles.length > 0" class="flex flex-wrap gap-2">
            <label class="text-sm font-medium text-gray-700">編輯已存在的文章:</label>
            <select 
              v-model="selectedArticleId" 
              @change="loadSelectedArticle"
              class="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="">-- 選擇文章 --</option>
              <option v-for="article in userArticles" :key="article.id" :value="article.id">
                {{ article.title }} ({{ article.status === 'published' ? '已發布' : '草稿' }})
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- 寫作區域 -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- 文章標題輸入 -->
        <div class="bg-emerald-700 p-6">
          <input
            v-model="article.title"
            type="text"
            placeholder="請輸入文章標題..."
            class="w-full bg-white/10 border border-emerald-500/50 rounded-xl px-4 py-3 text-white text-xl placeholder-emerald-200 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/50"
          />
        </div>

        <!-- 寫作工具欄 -->
        <div class="bg-emerald-600 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center space-x-4 flex-wrap gap-2">
            <span class="text-white text-sm">字數: {{ wordCount }}</span>
            <span class="text-emerald-200 text-sm">|</span>
            <span class="text-white text-sm">{{ currentTime }}</span>
            <span class="text-emerald-200 text-sm">|</span>
            <div class="flex items-center space-x-2">
              <label class="text-white text-sm">文字顏色:</label>
              <div class="flex gap-1">
                <button 
                  v-for="color in textColors" 
                  :key="color.value" 
                  @click="article.textColor = color.value"
                  class="w-5 h-5 rounded-full border border-white"
                  :style="{ backgroundColor: color.value }"
                  :class="{ 'ring-2 ring-white': article.textColor === color.value }"
                ></button>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="flex items-center space-x-1 bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              <svg v-if="!saving" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ saving ? '儲存中...' : '儲存草稿' }}</span>
            </button>
            <button
              @click="publishArticle"
              :disabled="!canPublish || publishing"
              class="flex items-center space-x-1 bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              <svg v-if="!publishing" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ publishing ? '發布中...' : '發布文章' }}</span>
            </button>
          </div>
        </div>

        <!-- 文章內容編輯器 -->
        <div class="p-6">
          <textarea
            v-model="article.content"
            placeholder="開始您的創作..."
            :style="{ color: article.textColor || '#374151' }"
            class="w-full h-[50vh] resize-none border-none outline-none text-lg leading-relaxed placeholder-gray-400 p-2"
          ></textarea>
        </div>

        <!-- 標籤和分類 -->
        <div class="bg-gray-50 p-6 border-t">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-600">標籤:</label>
              <input
                v-model="newTag"
                @keyup.enter="addTag"
                type="text"
                placeholder="新增標籤"
                class="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                @click="addTag"
                class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                新增
              </button>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in article.tags"
              :key="index"
              class="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
            >
              {{ tag }}
              <button
                @click="removeTag(index)"
                class="ml-2 text-emerald-600 hover:text-emerald-800"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- 文章預覽 -->
      <div v-if="article.title || article.content" class="mt-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">文章預覽</h3>
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 border-b">
            <h2 class="text-2xl font-bold text-gray-800">{{ article.title || '未命名文章' }}</h2>
            <div class="flex items-center mt-2 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ currentTime }}</span>
              </div>
              <span class="mx-2">•</span>
              <span>{{ article.tags.join(', ') || '無標籤' }}</span>
              <span class="mx-2">•</span>
              <span>{{ wordCount }} 字</span>
            </div>
          </div>

          <div class="p-6">
            <div class="prose max-w-none">
              <p class="whitespace-pre-line" :style="{ color: article.textColor || '#374151' }">
                {{ article.content || '尚無內容...' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 狀態訊息 -->      
      <div v-if="statusMessage" class="mt-4 text-center">
        <div class="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg">
          {{ statusMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// 路由
const router = useRouter()

// 密碼驗證
onMounted(() => {
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('writeapp_authenticated')
    if (isAuthenticated !== 'true') {
      navigateTo('/')
      return
    }
    
    // 載入用戶已有的文章
    loadUserArticles()
  }
})

// 文章列表
const userArticles = ref([]);
const selectedArticleId = ref('');

// 文章數據
const article = ref({
  id: null,
  title: '',
  content: '',
  tags: [],
  author: 'jing',
  textColor: '#374151', // 默認文字顏色
  createdAt: new Date(),
  updatedAt: new Date(),
  published: false,
  publishedAt: null,
});

// 文字顏色選項
const textColors = [
  { name: '灰色', value: '#374151' },
  { name: '黑色', value: '#111827' }, 
  { name: '紅色', value: '#DC2626' },
  { name: '藍色', value: '#2563EB' },
  { name: '綠色', value: '#059669' },
  { name: '紫色', value: '#7C3AED' },
  { name: '青色', value: '#0D9488' }
];

const newTag = ref('')
const saving = ref(false)
const publishing = ref(false)
const statusMessage = ref('')

// 計算屬性
const wordCount = computed(() => {
  return article.value.content.length
})

const canPublish = computed(() => {
  return article.value.title.trim() && article.value.content.trim()
})

const currentTime = computed(() => {
  const now = new Date()
  return now.toLocaleString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// 自動保存
let autoSaveTimer = null
watch([() => article.value.title, () => article.value.content], () => {
  if (article.value.title || article.value.content) {
    // 自動保存草稿 (防抖)
    clearTimeout(autoSaveTimer)
    autoSaveTimer = setTimeout(() => {
      saveDraftSilently()
    }, 3000)
  }
})

// 標籤管理
const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !article.value.tags.includes(tag)) {
    article.value.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (index) => {
  article.value.tags.splice(index, 1)
}

// 載入用戶所有文章
const loadUserArticles = async () => {
  try {
    const { db } = await import('~/plugins/firebase.client')
    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')
    
    const articlesRef = collection(db, "articles");
    const q = query(
      articlesRef,
      where("author", "==", "jing"),
      orderBy("updatedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const articlesList = [];
    
    querySnapshot.forEach((doc) => {
      articlesList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    userArticles.value = articlesList;
  } catch (error) {
    console.error("Error loading user articles:", error);
  }
};

// 載入選中的文章
const loadSelectedArticle = async () => {
  if (!selectedArticleId.value) {
    newArticle();
    return;
  }
  
  try {
    const { db } = await import('~/plugins/firebase.client')
    const { doc, getDoc } = await import('firebase/firestore')
    
    const docRef = doc(db, "articles", selectedArticleId.value);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      
      // 轉換日期物件
      const createdAt = data.createdAt?.toDate?.() || data.createdAt || new Date();
      const updatedAt = data.updatedAt?.toDate?.() || data.updatedAt || new Date();
      const publishedAt = data.publishedAt?.toDate?.() || data.publishedAt || null;
      
      article.value = {
        id: docSnap.id,
        title: data.title || '',
        content: data.content || '',
        tags: data.tags || [],
        author: data.author || 'jing',
        textColor: data.textColor || '#374151',
        createdAt,
        updatedAt,
        published: data.published || false,
        publishedAt
      };
    }
  } catch (error) {
    console.error("Error loading article:", error);
    statusMessage.value = '載入文章失敗，請重試';
    
    setTimeout(() => {
      statusMessage.value = '';
    }, 3000);
  }
};

// 新建文章
const newArticle = () => {
  article.value = {
    id: null,
    title: '',
    content: '',
    tags: [],
    author: 'jing',
    textColor: '#374151',
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    publishedAt: null
  };
  
  selectedArticleId.value = '';
};

// 保存草稿
const saveDraft = async () => {
  if (!article.value.title && !article.value.content) return;
  
  saving.value = true;
  statusMessage.value = '';

  try {
    const { db } = await import('~/plugins/firebase.client')
    const { collection, addDoc, updateDoc, doc, serverTimestamp } = await import('firebase/firestore')
    
    const now = new Date();
    const articleData = {
      title: article.value.title,
      content: article.value.content,
      tags: article.value.tags,
      author: 'jing',
      textColor: article.value.textColor,
      updatedAt: now,
      published: article.value.published,
    };

    if (article.value.id) {
      // 更新現有文章
      const docRef = doc(db, 'articles', article.value.id);
      await updateDoc(docRef, articleData);
      statusMessage.value = '文章已更新！';
    } else {
      // 創建新文章
      articleData.createdAt = now;
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      article.value.id = docRef.id;
      selectedArticleId.value = docRef.id;
      statusMessage.value = '草稿已儲存！';
      
      // 重新載入文章列表
      await loadUserArticles();
    }
    
    setTimeout(() => {
      statusMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('儲存草稿失敗:', error);
    statusMessage.value = '儲存失敗，請重試';
  } finally {
    saving.value = false;
  }
};

// 靜默保存草稿
const saveDraftSilently = async () => {
  if (!article.value.title && !article.value.content) return;
  
  try {
    const { db } = await import('~/plugins/firebase.client')
    const { collection, addDoc, updateDoc, doc, serverTimestamp } = await import('firebase/firestore')
    
    const now = new Date();
    const articleData = {
      title: article.value.title,
      content: article.value.content,
      tags: article.value.tags,
      author: 'jing',
      textColor: article.value.textColor,
      updatedAt: now,
      published: article.value.published,
    };

    if (article.value.id) {
      // 更新現有文章
      const docRef = doc(db, 'articles', article.value.id);
      await updateDoc(docRef, articleData);
    } else {
      // 創建新文章
      articleData.createdAt = now;
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      article.value.id = docRef.id;
      selectedArticleId.value = docRef.id;
      
      // 重新載入文章列表
      await loadUserArticles();
    }
  } catch (error) {
    console.error('自動儲存失敗:', error);
  }
};

// 發布文章
const publishArticle = async () => {
  if (!canPublish.value) return;
  
  publishing.value = true;
  statusMessage.value = '';

  try {
    const { db } = await import('~/plugins/firebase.client')
    const { collection, addDoc, updateDoc, doc, serverTimestamp } = await import('firebase/firestore')
    
    const now = new Date();
    const articleData = {
      title: article.value.title,
      content: article.value.content,
      tags: article.value.tags,
      author: 'jing',
      textColor: article.value.textColor,
      updatedAt: now,
      published: true,
      publishedAt: now
    };

    if (article.value.id) {
      // 更新現有文章
      const docRef = doc(db, 'articles', article.value.id);
      await updateDoc(docRef, articleData);
      statusMessage.value = '文章已發布！';
      
      // 更新本地數據
      article.value.published = true;
      article.value.publishedAt = now;
    } else {
      // 創建新文章
      articleData.createdAt = now;
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      article.value = {
        id: docRef.id,
        ...articleData
      };
      selectedArticleId.value = docRef.id;
      statusMessage.value = '文章已發布！';
    }
    
    // 重新載入文章列表
    await loadUserArticles();
    
    // 延遲清空編輯器
    setTimeout(() => {
      statusMessage.value = '已發布！即將前往閱讀頁面...';
      
      setTimeout(() => {
        router.push('/jing/read');
      }, 1500);
    }, 1500);
  } catch (error) {
    console.error('發布文章失敗:', error);
    statusMessage.value = '發布失敗，請重試';
  } finally {
    publishing.value = false;
  }
};

// 設置頁面標題
useHead({
  title: '璟的寫作空間 - WriteApp',
  meta: [
    { name: 'description', content: '璟的寫作空間' }
  ]
})
</script>

<style scoped>
/* 確保 textarea 樣式正確 */
textarea {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

textarea:focus {
  outline: none;
}

/* 自定義滾動條 */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #059669;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #047857;
}
</style>
