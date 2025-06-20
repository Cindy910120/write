<template>
  <ThemeProvider>
    <div class="app-container">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </ThemeProvider>
</template>

<script setup>
// 設置全局頁面配置
useHead({
  title: 'WriteApp',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: '個人寫作應用程序' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
@import '~/assets/css/utilities.css';
@import '~/assets/css/reset.css';
@import '~/assets/css/theme.css';

/* Any additional global styles can go here */
</style>
