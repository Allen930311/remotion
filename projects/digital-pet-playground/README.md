# 👁️ Digital Pet Playground | 數位寵物實驗室

This is an interactive "Digital Pet" web experiment built with **Rive** and **GSAP**. The UI is designed to feel alive, reacting to your every move.

這是一個結合 **Rive** 動畫與 **GSAP** 效果的「數位寵物」網頁實驗。介面被賦予了生命力，會根據你的操作做出反應。

---

## 🎮 How to Play / 如何互動

### 1. The Watcher (Mouse Tracking) / 視線追蹤
The pet will always look at your cursor. Try moving your mouse around the screen to see it follow you.
寵物會永遠盯著你的游標。試著在螢幕上移動滑鼠，看看它如何跟隨你。

### 2. Dizzy State (Velocity Detection) / 暈眩模式
If you move your mouse **very fast**, the pet will get dizzy! A "Dizzy!" status will appear, and the character will enter a dizzy animation for 2 seconds.
如果你**快速晃動**滑鼠，寵物會感到暈眩！畫面上會顯示「Dizzy!」狀態，且角色會進入 2 秒的暈眩動畫。

### 3. Deep Sleep (Window Guard) / 深度睡眠
Move your cursor **outside the browser window**, and the pet will immediately fall asleep. The screen will dim to indicate it's resting.
將游標移出**瀏覽器視窗外**，寵物會立刻睡著。畫面會變暗，表示它正在休息。

### 4. Dynamic Aura (Ambient GSAP) / 動態氛圍
The background gradient (Aura) shifts its color and center point dynamically based on your mouse position.
背景的漸層氛圍會根據你的滑鼠位置動態改變顏色與中心點。

---

## 🚀 Getting Started / 如何啟動

1. **Install Dependencies / 安裝依賴**
   ```bash
   npm install
   ```

2. **Run Development Server / 啟動預覽**
   ```bash
   npm run dev
   ```

3. **Open in Browser / 瀏覽網頁**
   Open the URL shown in the terminal (usually `http://localhost:5173`).
   打開終端機顯示的網址（通常是 `http://localhost:5173`）。

---

## 🛠️ Tech Stack / 技術棧

- **Vite + React + TS**: Core framework.
- **Rive (@rive-app/react-canvas)**: High-performance interactive animations.
- **GSAP**: Smooth environmental transitions.
- **Vanilla CSS**: Glassmorphism & Premium UI design.

---

> [!TIP]
> **Customization / 自定義**: 
> You can swap the Rive asset in `src/Pet.tsx` with your own `.riv` file to change the character!
> 你可以在 `src/Pet.tsx` 中替換 Rive 素材網址，換成你心儀的怪物或角色！
