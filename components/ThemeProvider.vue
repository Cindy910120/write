<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
// This component ensures theme variables are loaded
</script>

<style>
/* Ensure theme variables are accessible globally */
:root {
  /* 主題基礎色彩 - 墨綠色調 */
  --color-primary: rgb(5, 150, 105);
  --color-primary-dark: rgb(4, 120, 87);
  --color-primary-light: rgb(16, 185, 129);
  
  /* 璟的主題色調 - 綠松石/墨綠色調 */
  --color-jing-primary: 20, 184, 166;
  --color-jing-secondary: 6, 78, 59;
  --color-jing-accent: 5, 150, 105;
  --color-jing-light: 209, 250, 229;
  --color-jing-dark: 6, 78, 59;
  --color-jing-gradient-from: 6, 78, 59;
  --color-jing-gradient-to: 17, 94, 89;
  
  /* 芊的主題色調 - 帶有粉紅色調 */
  --color-qian-primary: 219, 39, 119;
  --color-qian-secondary: 157, 23, 77;
  --color-qian-accent: 236, 72, 153;
  --color-qian-light: 252, 231, 243;
  --color-qian-dark: 112, 26, 117;
  --color-qian-gradient-from: 157, 23, 77;
  --color-qian-gradient-to: 112, 26, 117;
  
  /* 通用界面元素 */
  --color-background: rgb(15, 23, 42);
  --color-surface: rgb(30, 41, 59);
  --color-text-light: rgb(255, 255, 255);
  --color-text-dark: rgb(15, 23, 42);
  
  /* 交互狀態 */
  --color-hover: rgba(255, 255, 255, 0.1);
  --color-active: rgba(255, 255, 255, 0.2);
  
  /* 陰影效果 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* 共用特效 */
  --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --border-radius-sm: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;
}
</style>
