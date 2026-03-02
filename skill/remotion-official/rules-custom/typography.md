---
description: CJK Font support and Theme-based styling in Remotion
---

# 視覺規範與中文字型支持 (Typography & Theming)

## CJK (中文) 字型支持鐵律

在 Remotion 中若需要顯示中文字，必須解決不同渲染環境（如 Google Colab）缺失字型的問題。

**核心做法：**
1. **安裝支持庫**：`npm install @remotion/google-fonts`
2. **建立 `fonts.ts` 集中管理**：使用 `loadFont` 載入支持 CJK 的字型（如 `NotoSansTC`）。
3. **阻塞渲染**：`@remotion/google-fonts` 會自動確保字型載入完成後才開始影格渲染，避免 Tofu (方塊) 現象。

```tsx
// src/fonts.ts
import { loadFont as loadNotoSansTC } from "@remotion/google-fonts/NotoSansTC";

const noto = loadNotoSansTC("normal", {
    weights: ["400", "700", "900"],
    subsets: ["latin"],
});

export const FONT_FAMILY = noto.fontFamily;
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
