# 專案實作紀錄：digital-pet-playground
* **📅 日期**：2026-02-28
* **🏷️ 標籤**：`#Project` `#DevLog` `#Rive` `#Interactivity`

---

> 🎯 **本次進度摘要**
> 完成「數位寵物」互動網頁實作，結合 Rive 狀態機與 JS 物理偵測模型，達成具備生命力的 UI 體驗。

### 🛠️ 執行細節與變更
* **核心檔案異動**：
  * 📄 `src/Pet.tsx`：實作 Rive Runtime 封裝，對接 `xAxis`, `yAxis`, `isDizzy`, `isSleeping` 狀態機輸入。
  * 📄 `src/App.tsx`：實作滑鼠座標追蹤、速度 (Velocity) 偵測邏輯，以及 GSAP 背景動態渲染。
  * 📄 `src/App.css`：套用 Glassmorphism 風格、漸層背景與睡眠模式濾鏡。
  * 📄 `README.md`：建立中英雙語互動指南與開發文件。
* **技術實作**：
  * 成功將 Rive 的 Look-at 邏輯（0-100 映射）與網頁視窗座標整合。
  * 透過判斷滑鼠移動速率 `dist/dt` 實現「暈眩」狀態的自動觸發。

### 🚨 問題與解法 (Troubleshooting)
> 🐛 **遇到困難**：Vite 初始化時因 `npx` 互動模式導致自動化腳本卡死。
> 💡 **解決方案**：改用 `npm create vite@latest ... -- --template react-ts` 並手動發送 Enter 鍵完成初始化。

### ⏭️ 下一步計畫 (Next Steps)
- [ ] 尋找或製作更精美的專屬 Rive 角色（目前使用 vehicles 佔位符）。
- [ ] 加入音效反饋（如寵物叫聲或背景氛圍音）。
- [ ] 嘗試將此互動模式整合進 Remotion 影片開場。
