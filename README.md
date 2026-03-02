<div align="center">

[**中文**](./README_zh-TW.md) | **English**

# Remotion Video Studio
### AI-Powered "Video as Code" Production Pipeline 🚀

[![Remotion](https://img.shields.io/badge/Remotion-v4.0.0-blue?style=flat-square&logo=react)](https://www.remotion.dev/)
[![React](https://img.shields.io/badge/React-v18.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

## 📖 Project Overview

A **Remotion**-based video production studio that combines the React ecosystem with professional video workflows. This monorepo houses multiple video projects and an AI-driven skill system that orchestrates the entire pipeline — from creative brief to cloud-rendered MP4.

Key innovations:
- **Frame-deterministic rendering**: All animations are strictly driven by `useCurrentFrame()`, ensuring 100% flicker-free output.
- **Multi-library integration**: D3.js, GSAP, Framer Motion, Anime.js, Lottie — all synchronized to Remotion's frame clock.
- **Cloud rendering**: One-click render via Google Colab with automatic Google Drive output.

## 🚀 Projects

| Project | Description | Format |
|---|---|---|
| **Geopolitics Explainer** | Middle East geopolitical analysis with animated charts | 1080×1920 / 60s |
| **Crypto Payment Animation** | 2.5D phone showcase with Bitcoin elements | 1080×1920 / 10s |
| **Colab Showcase** | Cloud rendering demo | 1920×1080 / 10s |
| **Animation Playground** | Multi-library animation testing ground | 1920×1080 |
| **Auto-Skill Intro** | AI auto-skill system intro video | 1920×1080 |
| **Skills Showcase** | Remotion core capabilities demo | 1920×1080 |
| **Digital Pet Playground** | Interactive digital pet animations | 1920×1080 |

## 🛠️ AI Skill System

This project includes a purpose-built AI skill system for video production:

| Skill | Role |
|---|---|
| `remotion-master` | 🎛️ Pipeline orchestrator — single entry point |
| `remotion-designer` | 🎨 Motion designer — generates VIDEO_SPEC.md |
| `remotion-developer` | 💻 Code generator — scaffolds projects & scenes |
| `remotion-assets` | 📦 Asset manager — TTS, images, encoding |
| `remotion-official` | 📚 Knowledge base — 26 official rules + 4 custom extensions |

## ⌨️ Getting Started

```bash
# Clone & install
git clone https://github.com/Allen930311/remotion.git
cd remotion && npm install

# Preview in Remotion Studio
npm start

# Render a specific composition
npx remotion render src/index.ts GeopoliticsExplainer out/geopolitics_explainer.mp4
```

## ☁️ Cloud Rendering (Google Colab)

1. `git push` your latest changes to GitHub.
2. Open `render_colab.ipynb` in Google Colab.
3. Run **Cell 0** (clone/pull) → **Cell 1** (install) → **Cell 2** (render).
4. Only change `COMP_NAME` — the output filename is auto-derived.
5. Output is automatically copied to Google Drive (`remotion_assets/`).

## 📁 Project Structure

```
remotion/
├── src/Root.tsx              # Composition registry
├── projects/                 # All video projects
│   ├── geopolitics-explainer/
│   ├── crypto-payment-animation/
│   └── ...
├── skill/                    # AI skill system
│   ├── remotion-official/    # Knowledge base (rules/ + rules-custom/)
│   ├── remotion-master/      # Pipeline orchestrator
│   ├── remotion-designer/    # Design specs
│   ├── remotion-developer/   # Code generation
│   └── remotion-assets/      # Asset management
├── render_colab.ipynb        # Cloud rendering notebook
└── .auto-skill-local.md      # Project-specific experience cache
```

## 🤝 Contributing

1. **Fork** this repo and create a new folder under `projects/`.
2. Register your composition in `src/Root.tsx`.
3. **Submit a PR** with a description and preview media.

---
Built with ❤️ by [Allen](https://github.com/Allen930311) using [Remotion](https://www.remotion.dev/).
