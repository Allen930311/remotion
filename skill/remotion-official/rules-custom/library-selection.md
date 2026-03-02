---
description: Animation & visualization library selection guide for Remotion projects
---

# 動畫與視覺化元件庫選擇指南

**日期：** 2026-02-27

## 性能鐵律

所有第三方庫必須禁用內部的 `requestAnimationFrame` 循環，強制使用 Remotion 的 `useCurrentFrame()` 數據驅動，以避免渲染閃爍。

## 選型表

| 套件 | 類型 | 適用場景 | 核心優勢 | 學習曲線 |
| :--- | :--- | :--- | :--- | :--- |
| **D3.js** | 資料視覺化 | 圖表、地圖、數據驅動圖形 | 強大資料綁定、SVG 操控力 | ●●●●● |
| **Three.js** | 3D 圖形引擎 | 3D 場景、WebGL、沉浸式體驗 | 完整 3D 引擎、龐大生態系 | ●●●●● |
| **GSAP** | 動畫引擎 | UI 動畫、滾動特效、複雜時間軸 | 極致效能、精確時間軸控制 | ●●●○○ |
| **Anime.js** | JS 動畫 | DOM / SVG 動畫、交錯特效 | 語法簡潔、彈簧物理引擎 | ●●○○○ |
| **Popmotion** | 函數式動畫 | 數值驅動動畫、彈簧、衰減 | 純函數設計、FM 底層引擎 | ●●○○○ |
| **Framer Motion** | React 動畫 | 元件動畫 / 手勢 / 佈局動畫 | 宣告式 API、React 原生整合 | ●●○○○ |
| **Motion One** | 輕量動畫 | 簡潔動畫、滾動觸發、進場效果 | 極輕量、基於 WAAPI 封裝 | ●○○○○ |
| **Rive** | 互動動畫 | 狀態機動畫、互動圖形、遊戲 UI | 視覺化編輯器、極小檔案 | ●●○○○ |
| **Lottie** | 動態圖形 | AE 動畫匯出、微互動效果 | 設計師友善、JSON 輕量格式 | ●○○○○ |
| **CSS Keyframes** | CSS 原生 | 過渡效果、懸停、載入動畫 | 零依賴、GPU 加速、最輕量 | ●○○○○ |
| **WAAPI** | Web 原生 | JS 控制動畫、ScrollTimeline | 瀏覽器原生、可程式化控制 | ●●○○○ |
| **Flubber** | SVG 變形 | 形狀轉場、路徑插值動畫 | 平滑形狀插值、專注輕量 | ●○○○○ |
| **Canvas 類** | Canvas 2D | 2D 繪圖 / 圖片處理 / 互動畫布 | 像素級控制、高效能繪製 | ●●●○○ |

## Remotion 整合要點

| 套件 | 整合方式 |
|---|---|
| **GSAP** | `gsap.timeline({ paused: true })` → `tl.seek(frame / fps)` |
| **Anime.js** | `createTimeline({ autoplay: false })` → `tl.seek(frame / fps * 1000)` |
| **D3.js** | 禁用 D3 內置動畫，直接將 `useCurrentFrame()` 映射至 scale/attr |
| **Framer Motion** | 僅作渲染器，由 Remotion `interpolate/spring` 驅動樣式值 |
| **Lottie** | 配合 `delayRender` + `fetch` 載入 JSON，傳入 `animationData` |
| **Three.js** | ⚠️ `@react-three/fiber` 可能引發 bundler 錯誤，建議評估風險 |
