/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // 主題相關顏色
        'theme': {
          'primary': 'var(--color-primary)',
          'primary-dark': 'var(--color-primary-dark)',
          'primary-light': 'var(--color-primary-light)',
        },
        // 璟的顏色主題
        'jing': {
          'primary': 'var(--color-jing-primary)',
          'secondary': 'var(--color-jing-secondary)',
          'accent': 'var(--color-jing-accent)',
          'light': 'var(--color-jing-light)',
          'dark': 'var(--color-jing-dark)',
        },
        // 芊的顏色主題
        'qian': {
          'primary': 'var(--color-qian-primary)',
          'secondary': 'var(--color-qian-secondary)',
          'accent': 'var(--color-qian-accent)',
          'light': 'var(--color-qian-light)',
          'dark': 'var(--color-qian-dark)',
        }
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
        'theme-xl': 'var(--shadow-xl)',
      },
      borderRadius: {
        'theme-sm': 'var(--border-radius-sm)',
        'theme-md': 'var(--border-radius-md)',
        'theme-lg': 'var(--border-radius-lg)',
        'theme-xl': 'var(--border-radius-xl)',
      },
    },
  },
  plugins: [],
}
