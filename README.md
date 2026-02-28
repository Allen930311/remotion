# Remotion Projects Showcase & Animation Playground 🎬
> **Bilingual Documentation: [English](#english) | [繁體中文](#繁體中文)**

---

<a name="english"></a>
## English

A collection of high-quality Remotion projects and experimental animation tests. This repository showcases advanced "Video as Code" techniques, focusing on performance, smooth physics-based animations, and multi-library integration.

### 🚀 Projects in this Monorepo
- **Animation Playground**: A dedicated space for testing animation libraries (D3.js, GSAP, Lottie, Canvas 2D) within Remotion.
- **Auto-Skill Intro**: An automated video introduction for the AI auto-skill system.
- **Remotion Skills Showcase**: High-end visual demonstration of Remotion's core capabilities.

### 🛠️ Key Features
- **Performance First**: All animations are driven by `useCurrentFrame()`, avoiding flickering and ensuring frame-perfect rendering.
- **Advanced Physics**: Extensive use of `spring()` and `Easing` for premium motion quality.
- **Library Integration**: Seamlessly combining D3.js (Data-driven), GSAP (Timelines), and Lottie (Vector) in a single video flux.
- **Robust Layouts**: Standardized use of `<AbsoluteFill>` to prevent CSS collapse and "white screen" issues.

### ⌨️ Getting Started
Ensure you have [Node.js](https://nodejs.org/) installed.

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Allen930311/remotion.git
   cd remotion
   npm install
   ```
2. **Preview**:
   ```bash
   npm start
   ```
3. **Render**:
   ```bash
   # Render the default composition
   npm run render
   # Render a specific composition (e.g., Animation Playground)
   npx remotion render src/index.ts AnimationPlayground out/playground.mp4
   ```

### 🤝 How to Contribute / Upload Your Results
We welcome community contributions! If you've created a new animation component or improved an existing project:
1. **Fork** this repository.
2. Create a new folder under `projects/` for your work.
3. Register your composition in `src/Root.tsx`.
4. **Pull Request**: Submit your PR with a brief description and a preview GIF/Video if possible.
5. **Issue**: Found a bug or compatibility issue? Please open an issue!

---

<a name="繁體中文"></a>
## 繁體中文

這是一個高品質 Remotion 專案與動畫實驗的集合空間。本倉庫展示了先進的「代碼即影片 (Video as Code)」技術，專注於渲染效能、物理感動畫以及多種第三方圖表庫的深度整合。

### 🚀 專案清單
- **Animation Playground (動畫實驗室)**：測試 D3.js, GSAP, Lottie, Canvas 2D 等在庫在 Remotion 中的整合效能。
- **Auto-Skill Intro**：自動化生成 auto-skill 系統的開場影片。
- **Remotion Skills Showcase**：Remotion 核心開發技能的高級視覺展示。

### 🛠️ 技術亮點
- **效能鐵律**：所有動畫完全由 `useCurrentFrame()` 數據驅動，徹底杜絕渲染閃爍。
- **高級動效**：深度運用 `spring()` 與 `Easing` 達成具有「手感」的物理動畫。
- **多庫整合**：在同一個影格流中流暢運行 D3.js (數據驅動)、GSAP (時間軸同步) 與 Lottie (向量圖形)。
- **強健佈局**：全面採用 `<AbsoluteFill>` 標準化佈局，解決 Remotion 預覽中的坍塌與白畫面問題。

### ⌨️ 快速開始
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
   # 渲染預設組合
   npm run render
   # 渲染特定組合 (例如：動畫實驗室)
   npx remotion render src/index.ts AnimationPlayground out/playground.mp4
   ```

### 🤝 如何貢獻 / 上傳您的成果
歡迎社區開發者參與貢獻！如果您開發了新的動畫組件或優化了現有專案：
1. **Fork** 本倉庫。
2. 在 `projects/` 目錄下為您的成果建立獨立資料夾。
3. 在 `src/Root.tsx` 中註冊您的 `Composition`。
4. **提交 PR**：發起 Pull Request 並附上說明，若能提供預覽 GIF/影片更佳。
5. **回報問題**：若遇到編譯錯誤 (例如 Three.js 相容性問題)，請提交 Issue 讓我們一起修復。

---
Built with ❤️ using [Remotion](https://www.remotion.dev/).
