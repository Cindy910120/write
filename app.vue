<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup>
// 設置全局頁面配置
useHead({
  title: 'WriteApp',
  meta: [
    { name: 'description', content: '個人寫作應用程序' }
  ]
})
</script>
