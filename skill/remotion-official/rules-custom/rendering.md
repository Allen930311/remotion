---
description: Remotion rendering commands, platform specs, and Colab/Windows compatibility
---

# Rendering & Platform Configuration

## Standard Render Command

```bash
npx remotion render src/index.ts MyVideo output.mp4 \
  --codec=h264 \
  --crf=18 \
  --pixel-format=yuv420p \
  --audio-codec=aac \
  --audio-bitrate=320k
```

## Platform Specs

| Platform | Codec | Resolution | FPS | Notes |
|---|---|---|---|---|
| YouTube | H.264 (MP4) | 1920×1080 (16:9) | 30 | `--crf=18` |
| Instagram Reels / TikTok | H.264 (MP4) | 1080×1920 (9:16) | 30 | Length < 60s |
| Twitter | H.264 (MP4) | 1920×1080 | 30 | `--crf=23` (slightly more compressed) |

## Windows Compatibility (Critical)

FFmpeg 輸出 `.mp4` 務必攜帶以下參數，否則 Windows Media Player 可能只有聲音沒影像：

```bash
-pix_fmt yuv420p -movflags +faststart
```

- `yuv444p` / `yuv422p` → ❌ Windows 不支援
- `yuv420p` → ✅ 通用相容

## Google Colab Rendering

1. **依賴修復**：自動移除 `eslint-config-remotion` 以防 Colab 安裝報錯。
2. **渲染指令**：使用 `npx remotion render` 搭配 `--pixel-format=yuv420p --codec=h264 --concurrency=2`。
3. **代碼同步**：每次本地開發完成後，**必須** `git push` 才能在 Colab 渲染，否則會報 `Could not find composition`。
4. **Drive 連結**：Remotion 的 `public/` 若被 `.gitignore` 阻擋，使用 `git add -f public/props.json` 強制保留。
