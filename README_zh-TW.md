<div align="center">

**中文** | [**English**](./README.md)

# Remotion Animation Playground
### 高性能「代碼即影片」展示空間，整合多圖表動畫庫 🚀

[![Remotion](https://img.shields.io/badge/Remotion-v4.0.0-blue?style=flat-square&logo=react)](https://www.remotion.dev/)
[![React](https://img.shields.io/badge/React-v18.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

## 📖 專案簡介

這是一個基於 **Remotion** 的高品質動畫實驗室與專案展示空間。我們探索「代碼即影片 (Video as Code)」的前沿技術，致力於將 React 的開發生態與專業影片製作流程無痛結合。

本專案解決了在網頁環境下製作高度客製化、動態數據驅動影片的痛點。透過將多種主流動畫庫（如 D3.js, GSAP, Framer Motion, Anime.js）與 Remotion 的影格同步機制深度整合，達成 100% 確定性的影格渲染與卓越的視覺質感。

## 🌟 核心功能

* ✅ **多庫深度整合**：在同一個影格流中流暢運行 D3.js (數據驅動)、GSAP (時間軸同步)、Lottie (向量圖形)、Framer Motion 與 Anime.js。
* ✅ **影格鐵律同步**：所有動畫完全由 `useCurrentFrame()` 數據驅動，徹底杜絕渲染閃爍，確保匯出影片每一格都精準無誤。
* ✅ **高級物理動效**：深度運用 `spring()` 與 `Easing` 達成具有「手感」的物理流體動畫，提升視覺高級感。
* ✅ **強健佈局系統**：全面採用 `<AbsoluteFill>` 標準化佈局，解決 Remotion 預覽中的 CSS 坍塌與白畫面問題。
- ✅ **一鍵預覽與渲染**：內建完整的開發伺服器與渲染腳本，支援快速即時預覽與高品質 MP4 輸出。

## 🚀 專案清單

- **Animation Playground (動畫實驗室)**：整合各大主流動畫庫的測試場景。
- **Auto-Skill Intro**：AI auto-skill 系統的自動化開場影片。
- **Remotion Skills Showcase**：Remotion 核心開發技能的視覺化展示。

## ⌨️ 快速開始

請確保您已安裝 [Node.js](https://nodejs.org/)。

1. **複製與安裝**：
   ```bash
   git clone https://github.com/Allen930311/remotion.git
   cd remotion
   npm install
   ```
2. **啟動預覽**：
   ```bash
   npm start
   ```
3. **渲染影片**：
   ```bash
   # 渲染特定組合 (例如：動畫實驗室)
   npx remotion render src/index.ts AnimationPlayground out/playground.mp4
   ```

## 🤝 如何貢獻

歡迎社區開發者參與貢獻！如果您開發了新的動畫組件：
1. **Fork** 本倉庫並在 `projects/` 下建立資料夾。
2. 在 `src/Root.tsx` 中註冊您的 `Composition`。
3. **提交 PR** 並附上說明或預覽影像。

---
Built with ❤️ by [Allen](https://github.com/Allen930311) using [Remotion](https://www.remotion.dev/).
