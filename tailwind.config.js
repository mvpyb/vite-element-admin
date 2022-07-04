/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    // 解决 el-button的样式被 tailwind.css 的样式覆盖的bug
    function ({ addBase }) {
      addBase({
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,val(--el-color-white))'
        }
      })
    }
  ]
  // // tree shaking
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.vue',
  //   './src/**/*.jsx',
  //   './src/**/*.tsx'
  // ]
}
