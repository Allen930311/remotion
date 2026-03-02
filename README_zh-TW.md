<div align="center">

**中文** | [**English**](./README.md)

# Remotion Video Studio
### AI 驅動的「代碼即影片」生產流水線 🚀

[![Remotion](https://img.shields.io/badge/Remotion-v4.0.0-blue?style=flat-square&logo=react)](https://www.remotion.dev/)
[![React](https://img.shields.io/badge/React-v18.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

## 📖 專案簡介

基於 **Remotion** 的影片製作工作室，將 React 開發生態與專業影片製作流程無痛結合。本 Monorepo 包含多個影片專案以及一套 AI 驅動的技能系統，能串接從創意簡報到雲端渲染 MP4 的完整流水線。

核心特色：
- **影格確定性渲染**：所有動畫完全由 `useCurrentFrame()` 數據驅動，徹底杜絕渲染閃爍。
- **多庫深度整合**：D3.js、GSAP、Framer Motion、Anime.js、Lottie — 全部同步至 Remotion 影格時鐘。
- **雲端一鍵渲染**：透過 Google Colab 一鍵渲染，自動輸出至 Google Drive。

## 🚀 專案清單

| 專案 | 說明 | 格式 |
|---|---|---|
| **Geopolitics Explainer** | 中東地緣政治分析 + 動態圖表 | 1080×1920 / 60s |
| **Crypto Payment Animation** | 2.5D 手機展示 + 比特幣元素 | 1080×1920 / 10s |
| **Colab Showcase** | 雲端渲染示範 | 1920×1080 / 10s |
| **Animation Playground** | 多動畫庫測試場 | 1920×1080 |
| **Auto-Skill Intro** | AI auto-skill 系統開場影片 | 1920×1080 |
| **Skills Showcase** | Remotion 核心技能展示 | 1920×1080 |
| **Digital Pet Playground** | 互動數位寵物動畫 | 1920×1080 |

## 🛠️ AI 技能系統

本專案內建一套專為影片製作設計的 AI 技能系統：

| 技能 | 角色 |
|---|---|
| `remotion-master` | 🎛️ 流程編排器 — 唯一入口 |
| `remotion-designer` | 🎨 動態設計師 — 產出 VIDEO_SPEC.md |
| `remotion-developer` | 💻 程式碼生成 — 腳手架 & 場景組件 |
| `remotion-assets` | 📦 素材管理 — TTS / 圖片 / 編碼 |
| `remotion-official` | 📚 知識庫 — 26 份官方規則 + 4 份自訂擴充 |

## ⌨️ 快速開始

```bash
# 複製與安裝
git clone https://github.com/Allen930311/remotion.git
cd remotion && npm install

# 啟動 Remotion Studio 預覽
npm start

# 渲染特定影片
npx remotion render src/index.ts GeopoliticsExplainer out/geopolitics_explainer.mp4
```

## ☁️ 雲端渲染 (Google Colab)

1. 將最新代碼推送至 GitHub：`git push`。
2. 在 Google Colab 開啟 `render_colab.ipynb`。
3. 依序執行 **Cell 0** (環境) → **Cell 1** (安裝) → **Cell 2** (渲染)。
4. 只需修改 `COMP_NAME` — 輸出檔名自動推導 (CamelCase → snake_case)。
5. 渲染完成後自動複製至 Google Drive (`remotion_assets/`)。

## 📁 專案結構

```
remotion/
├── src/Root.tsx              # Composition 註冊中心
├── projects/                 # 所有影片專案
│   ├── geopolitics-explainer/
│   ├── crypto-payment-animation/
│   └── ...
├── skill/                    # AI 技能系統
│   ├── remotion-official/    # 知識庫 (rules/ + rules-custom/)
│   ├── remotion-master/      # 流程編排器
│   ├── remotion-designer/    # 設計規格
│   ├── remotion-developer/   # 程式碼生成
│   └── remotion-assets/      # 素材管理
├── render_colab.ipynb        # 雲端渲染筆記本
└── .auto-skill-local.md      # 專案踩坑經驗快取
```

## 🤝 如何貢獻

1. **Fork** 本倉庫並在 `projects/` 下建立新專案資料夾。
2. 在 `src/Root.tsx` 中註冊您的 `Composition`。
3. **提交 PR** 並附上說明或預覽影像。

---
Built with ❤️ by [Allen](https://github.com/Allen930311) using [Remotion](https://www.remotion.dev/).
