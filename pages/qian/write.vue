<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
    <AppHeader userName="芊" userPath="qian" />
    
    <div class="max-w-4xl mx-auto p-6">
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
        <div class="bg-emerald-600 px-6 py-3 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="text-white text-sm">字數: {{ wordCount }}</span>
            <span class="text-emerald-200 text-sm">|</span>
            <span class="text-white text-sm">{{ currentTime }}</span>
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
              class="flex items-center space-x-1 bg-pink-500 hover:bg-pink-400 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
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
            class="w-full h-96 resize-none border-none outline-none text-gray-700 text-lg leading-relaxed placeholder-gray-400"
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
import { navigateTo } from '#app'

// 密碼驗證
onMounted(() => {
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('writeapp_authenticated')
    if (isAuthenticated !== 'true') {
      navigateTo('/')
      return
    }
  }
})

// 文章數據
const article = ref({
  title: '',
  content: '',
  tags: [],
  author: '芊',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft' // draft, published
})

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
watch([() => article.value.title, () => article.value.content], () => {
  if (article.value.title || article.value.content) {
    // 自動保存草稿 (防抖)
    clearTimeout(autoSaveTimer)
    autoSaveTimer = setTimeout(() => {
      saveDraftSilently()
    }, 3000)
  }
})

let autoSaveTimer = null

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

// 保存草稿
const saveDraft = async () => {
  if (!article.value.title && !article.value.content) return
  
  saving.value = true
  statusMessage.value = ''

  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, addDoc, updateDoc, doc } = await import('firebase/firestore')
      
      const articleData = {
        ...article.value,
        updatedAt: new Date(),
        status: 'draft'
      }

      await addDoc(collection(db, 'qian_articles'), articleData)
      statusMessage.value = '草稿已儲存！'
      
      setTimeout(() => {
        statusMessage.value = ''
      }, 3000)
    }
  } catch (error) {
    console.error('儲存草稿失敗:', error)
    statusMessage.value = '儲存失敗，請重試'
  } finally {
    saving.value = false
  }
}

// 靜默保存草稿
const saveDraftSilently = async () => {
  if (!article.value.title && !article.value.content) return
  
  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, addDoc } = await import('firebase/firestore')
      
      const articleData = {
        ...article.value,
        updatedAt: new Date(),
        status: 'auto-draft'
      }

      await addDoc(collection(db, 'qian_articles'), articleData)
    }
  } catch (error) {
    console.error('自動儲存失敗:', error)
  }
}

// 發布文章
const publishArticle = async () => {
  if (!canPublish.value) return
  
  publishing.value = true
  statusMessage.value = ''

  try {
    if (process.client) {
      const { db } = await import('~/plugins/firebase.client')
      const { collection, addDoc } = await import('firebase/firestore')
      
      const articleData = {
        ...article.value,
        updatedAt: new Date(),
        publishedAt: new Date(),
        status: 'published'
      }

      await addDoc(collection(db, 'qian_articles'), articleData)
      statusMessage.value = '文章已發布！'
      
      // 清空編輯器
      setTimeout(() => {
        article.value = {
          title: '',
          content: '',
          tags: [],
          author: '芊',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'draft'
        }
        statusMessage.value = ''
      }, 2000)
    }
  } catch (error) {
    console.error('發布文章失敗:', error)
    statusMessage.value = '發布失敗，請重試'
  } finally {
    publishing.value = false
  }
}

// 設置頁面標題
useHead({
  title: '芊的寫作空間 - WriteApp',
  meta: [
    { name: 'description', content: '芊的寫作空間' }
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
  background: #10b981;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
</style>
