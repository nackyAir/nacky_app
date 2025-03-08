/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/web/app/**/*.{js,ts,jsx,tsx}',
    // 他の必要なパス
  ],
  theme: {
    extend: {
      // 既存の拡張設定
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // 他のプラグイン
  ],
}
