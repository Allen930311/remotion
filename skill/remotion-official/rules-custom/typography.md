---
description: CJK Font support and Theme-based styling in Remotion
---

# 視覺規範與中文字型支持 (Typography & Theming)

## CJK (中文) 字型支持鐵律

在 Remotion 中若需要顯示中文字，必須解決不同渲染環境（如 Google Colab）缺失字型的問題。單純載入 WebFont 在 Headless 環境中經常因載入過慢導致 Tofu (方塊) 現象。

**核心做法：**
1. **載入最佳實踐**：使用 `@remotion/google-fonts` 時標配 `loadFont()`。**嚴禁手動限制 `subsets: ["latin"]`**，這會強制剔除所有中文字符。
2. **Colab 穩定方案 (必備)**：Headless Chromium 渲染速度極快，經常來不及下載 WebFonts。**最強制且穩定的解決方案是在系統底層安裝字體**。

```tsx
// src/fonts.ts 推薦配置
import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";

// 直接使用 loadFont()，由 Remotion 自動處理 CJK 字符分塊載入
const noto = loadNotoSansTC();

export const FONT_FAMILY = noto.fontFamily;
```

**Colab OS 層級補救指令：**
在 Colab Notebook 的安裝步驟中加入以下指令，確保 Puppeteer 絕對能抓到本地字體：
```bash
!sudo apt-get update && sudo apt-get install -y fonts-noto-cjk
```

## 視覺規範化 (Theme Module)

複雜的影片專案應優先抽離主題色票與字型配置，而非在組件中散裝樣式。

**優點：**
- **快速切換風格**：例如從 Risograph 轉為深色新聞風只需修改 `theme.ts`。
- **維護一致性**：確保所有場景的玻璃擬態 (Glassmorphism) 或邊線粗細一致。

```tsx
// src/theme.ts
export const THEME = {
    bg: "#0A0A1A",
    red: "#E63946",
    text: "#F1FAEE",
    bgCard: "rgba(255,255,255,0.06)",
} as const;
```
