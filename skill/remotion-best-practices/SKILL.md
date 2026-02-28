---
name: remotion-best-practices
description: Remotion 最佳實踐大全集（動畫、字幕、轉場、3D、圖表等）。收錄一系列從實戰中總結的進階技巧、提示詞框架和物理引擎調校指南。
---

# Remotion 最佳實踐 (Best Practices)

這份文件收錄了 Remotion 開發中的高等級實戰經驗。當你需要調整動畫的「手感」、解決非線性時間軸的計算、或是要為 AI 生成高品質的提示詞時，請完整參考以下指南。

## 🔧 1. Spring 動畫讓畫面有「手感」
**情境：** 動畫看起來生硬、不自然
**解法：**
- 絕對優先使用 `spring()` 取代線性的 `interpolate`。
- 依據影片氛圍選擇不同的 preset 參數：
  - **Smooth** (平滑、優雅、無回彈)：`damping: 200, stiffness: 100`。適合嚴肅或正式內容。
  - **Snappy** (俐落、快速定調)：`damping: 20, stiffness: 200`。適合資訊量大的快播報。
  - **Bouncy** (活潑、彈力大)：`damping: 8, stiffness: 100`。適合輕鬆娛樂。
  - **Heavy** (沉穩、大質量)：`mass: 2` 等等。適合 3D 旋轉或巨大物件出現。
- 參數優先順序：damping（阻尼）→ stiffness（剛度）→ mass（質量）。

## 🔧 2. 用 Easing 提升非物理動畫質感
**情境：** 透明度 (Opacity) 或淡入淡出變化太機械，而 `spring()` 不適用於這些非座標/縮放的屬性。
**解法：**
- 使用 `Easing.bezier(0.25, 0.1, 0.25, 1)` 或 `Easing.inOut(Easing.ease)`。
- **務必**配合 `extrapolateRight: 'clamp'`，避免時間超過邊界值後，數值爆掉。

## 🔧 3. 用 Series / Sequence 組織場景時間軸
**情境：** 多個場景的時間軸直接寫死 `from`，一旦前面積分改變，後面的時間軸全部大亂。
**解法：**
- 使用 `<Series>` 管理線性敘事，不必手算 `from`。
- 如果只需要時間軸控制而不需要額外的 DOM 節點包裹，記得使用 `<Sequence layout="none">` 來避免破壞 Flexbox/Grid 佈局。
- 想要場景重疊或交叉淡入？善用 `<Series.Sequence offset={-15}>`（負數 Offset）來做 15 frame 的交疊。

## 🔧 4. TransitionSeries 做專業轉場
**情境：** 場景切換只有單調的淡入淡出（Cross-fade），視覺質感不夠。
**解法：**
- 使用 `@remotion/transitions` 官方套件。
- 以 `Slide`、`Wipe` 或 `Flip` 等取代普通的淡入。
- 將場景統一用 `TransitionSeries` 管理，讓轉場與 Timing 整合一次解決。

## 🔧 5. 提示詞框架：內容/時間/動作/風格
**情境：** 請 AI 產出動畫程式碼時，結果往往不符合預期或跑版。
**解法：**
在 Prompting 時，嚴格遵照以下 4 個維度書寫指示：
- **Content (內容)**：畫面上要有什麼？（例如：標題、兩行副標題、背景影片）
- **Timing (時間)**：在第幾個 Frame 進場？哪個 Frame 出場？（例如：標題第 0 幀入，副標題第 10 幀入，Stagger Delay）
- **Motion (動作)**：如何動？（例如：從左側滑入配 Snappy Spring，搭配 Easing Opacity Fade In）
- **Style (風格)**：顏色、排版（例如：主色調為珊瑚紅，字體大小大於 64px 避免影片糊掉）。
- **要求**：強制所有動畫與效果皆由 `useCurrentFrame()` 和 `useVideoConfig()` 來驅動，拒絕使用 CSS keyframes。

## 🔧 6. 2.5D 產品展示：手機容器 + 3D 旋轉 + SVG 線條
**情境：** 產品截圖展示畫面太過平面，缺乏高級感。
**解法：**
- **包裹**：將螢幕截圖放入手機外框容器中（加上圓角與陰影）。
- **3D 旋轉**：外層加上 3D transform (`perspective`, `rotateY`, `rotateX`)，並設定 heavy mass 的 `spring` 做進場轉動。
- **點綴**：在容器後方加入 SVG 背景線條，並利用 `stroke-dashoffset` 結合 `interpolate` 做出動態畫線的效果。

## 🔧 7. 開發與渲染避坑指南 (Colab / Windows)
**情境：** 在特殊環境渲染發生錯誤、素材遺失，或是影片無法在 Windows 正常播放。
**解法：**
- **依賴處理**：在 Colab 中安裝包容易遇到 `eslint-config-remotion` 報錯，記得透過腳本自動把它刪除。
- **渲染指令**：避免單純 `npx remotion` 崩潰，改以 `npm run render -- [params]` 執行。
- **Windows 相容性**：FFmpeg 輸出 `.mp4` 務必攜帶 `-pix_fmt yuv420p` 和 `-movflags +faststart`，否則本機播放器可能只有聲音沒影像。
- **Drive 連結**：Remotion 的 `public` 若被 `.gitignore` 阻擋，會導致打包失敗，強制使用 `git add -f public/props.json` 保留必要結構。
