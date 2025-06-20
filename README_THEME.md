# WriteApp 使用指南

## 組件架構

本應用採用單一 AppHeader_NEW 組件來處理不同用戶的頁頭顯示，通過傳入參數來區分不同用戶：

```vue
<AppHeader_NEW userName="璟" userPath="jing" />
```

或

```vue
<AppHeader_NEW userName="芊" userPath="qian" />
```

## 主題使用

應用定義了兩套顏色主題：

1. **璟的主題** - 以綠松石/墨綠色調為主
2. **芊的主題** - 以粉紅/玫瑰色調為主

這些主題色彩已預先定義在 `assets/css/theme.css` 文件中，可以通過 CSS 變量使用：

```css
/* 璟的顏色 */
rgb(var(--color-jing-primary))
rgb(var(--color-jing-secondary))
rgb(var(--color-jing-accent))
rgb(var(--color-jing-light))
rgb(var(--color-jing-dark))

/* 芊的顏色 */
rgb(var(--color-qian-primary))
rgb(var(--color-qian-secondary))
rgb(var(--color-qian-accent))
rgb(var(--color-qian-light))
rgb(var(--color-qian-dark))
```

對於帶透明度的顏色，可使用：

```css
rgba(var(--color-jing-primary), 0.5)
```

## 頁面結構

每個用戶（璟/芊）都有三個主要頁面：

1. **個人首頁** - `/jing` 或 `/qian`
2. **寫作空間** - `/jing/write` 或 `/qian/write`
3. **觀賞空間** - `/jing/read` 或 `/qian/read`

每個用戶都可以訪問對方的公開文章。

## 顏色映射建議

- 璟的頁面：使用綠色系列
  - 主色：`rgb(var(--color-jing-primary))` (綠松石)
  - 強調：`rgb(var(--color-jing-accent))` (墨綠色)

- 芊的頁面：使用粉色系列
  - 主色：`rgb(var(--color-qian-primary))` (粉紅色)
  - 強調：`rgb(var(--color-qian-accent))` (亮粉紅)

## Tailwind 配置

Tailwind 已設置自定義顏色主題，可直接使用：

```html
<div class="bg-jing-primary text-jing-light">璟的元素</div>
<div class="bg-qian-primary text-qian-light">芊的元素</div>
```

## 未來擴展建議

如需添加新用戶，請在 `theme.css` 中定義新的顏色變量。
