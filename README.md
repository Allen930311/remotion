<div align="center">

[**中文**](./README_zh-TW.md) | **English**

# Remotion Animation Playground
### High-Performance "Video as Code" Showcase with Multi-Library Integration 🚀

[![Remotion](https://img.shields.io/badge/Remotion-v4.0.0-blue?style=flat-square&logo=react)](https://www.remotion.dev/)
[![React](https://img.shields.io/badge/React-v18.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

## 📖 Project Overview

This is a high-quality animation laboratory and project showcase built with **Remotion**. We explore the frontiers of "Video as Code" technology, aiming to seamlessly integrate the React development ecosystem with professional video production workflows.

This project addresses the pain points of creating highly customized, dynamic, data-driven videos in a web environment. By deeply integrating popular animation libraries (such as D3.js, GSAP, Framer Motion, Anime.js) with Remotion's frame synchronization mechanism, we achieve 100% deterministic frame rendering and superior visual quality.

## 🌟 Core Features

* ✅ **Multi-Library Integration**: Seamlessly run D3.js (Data-driven), GSAP (Timeline sync), Lottie (Vector), Framer Motion, and Anime.js within a single frame flux.
* ✅ **Frame-Accurate Sync**: All animations are strictly driven by `useCurrentFrame()` to ensure 100% flicker-free and deterministic rendering for video export.
* ✅ **Physics-Based Motion**: Extensive use of `spring()` and `Easing` for a premium, tactile feel that elevates the visual experience.
* ✅ **Robust Layout System**: Standardized use of `<AbsoluteFill>` to prevent CSS collapse and "white screen" issues during preview.
* ✅ **One-Click Preview & Render**: Includes a full dev server and rendering scripts for rapid real-time preview and multi-threaded MP4 output.

## 🚀 Projects in this Monorepo

- **Animation Playground**: A dedicated space for testing major animation libraries within Remotion.
- **Auto-Skill Intro**: Automated video introduction for the AI auto-skill system.
- **Remotion Skills Showcase**: High-end visual demonstration of Remotion's core capabilities.

## ⌨️ Getting Started

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
   # Render a specific composition (e.g., Animation Playground)
   npx remotion render src/index.ts AnimationPlayground out/playground.mp4
   ```

## 🤝 Contributing

We welcome community contributions! If you've created a new animation component:
1. **Fork** this repository and create a new folder under `projects/`.
2. Register your composition in `src/Root.tsx`.
3. **Submit a PR** with a brief description and preview media if possible.

---
Built with ❤️ by [Allen](https://github.com/Allen930311) using [Remotion](https://www.remotion.dev/).
