---
description: Structured prompting framework for AI-generated Remotion animation code
---

# Remotion Prompting Framework

## 情境
請 AI 產出動畫程式碼時，結果往往不符合預期或跑版。

## 四維度提示詞框架

在 Prompting 時，嚴格遵照以下 4 個維度書寫指示：

### 1. Content (內容)
畫面上要有什麼？
> 例如：標題、兩行副標題、背景影片

### 2. Timing (時間)
在第幾個 Frame 進場？哪個 Frame 出場？
> 例如：標題第 0 幀入，副標題第 10 幀入，Stagger Delay 5 frames

### 3. Motion (動作)
如何動？
> 例如：從左側滑入配 Snappy Spring (`damping: 20, stiffness: 200`)，搭配 Easing Opacity Fade In

### 4. Style (風格)
顏色、排版
> 例如：主色調為珊瑚紅 `#D4694A`，字體大小 ≥ 64px 避免影片糊掉

## 強制規則

- ✅ 所有動畫由 `useCurrentFrame()` 和 `useVideoConfig()` 驅動
- ❌ 禁止 CSS `@keyframes` 和 `animation` 屬性
- ❌ 禁止 `requestAnimationFrame` 或 `setTimeout`
- ✅ 明確指定 `spring()` / `Easing` 參數
- ✅ 要求 Stagger、TransitionSeries 等具體技法
