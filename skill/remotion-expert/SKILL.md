---
name: remotion-expert
description: Encyclopedia for advanced Remotion tricks, spring physics, easing curves, complex transitions, and render configuration. Use to polish animations, configure physics, apply best practices, and setup render outputs.
---

# Remotion Expert

This skill acts as an encyclopedia of advanced Remotion knowledge. It provides the final layer of polish to videos by configuring animations, transitions, and rendering parameters.

## What This Skill Does
1. **Animation Configurations**: Sets up `spring()` physics, interpolation mappings, and easing curves.
2. **Best Practices**: Recommends solutions for common Remotion pitfalls (e.g., audio syncing, 3D rendering, large asset handling).
3. **Render Configurations**: Provides optimized JSON or CLI commands for rendering the final `output.mp4` tailored to YouTube, Twitter, Instagram, etc.

## 1. Animation Configurations (`ANIMATION_CONFIG.md`)

Use `spring()` for natural motion. Interpolate the spring value from `0` to `1` to drive scales, translations, etc.

### Spring Configurations
- **Smooth** (No bounce, elegant): `damping: 200, stiffness: 100`
- **Snappy** (Quick settle): `damping: 20, stiffness: 200`
- **Bouncy** (Playful): `damping: 8, stiffness: 100`

### Easing Curve Alternatives
If a spring is too "wobbly", use `Easing.bezier` or `Easing.inOut`:
```tsx
const progress = interpolate(frame, [0, 30], [0, 1], {
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  extrapolateRight: 'clamp' // Always clamp to prevent overshoot!
});
```

### Staggered Reveal Pattern
To stagger items, offset the `frame` by an index:
```tsx
const delay = index * 5; // 5 frames between items
const itemProgress = spring({
  frame: frame - delay,
  fps,
  config: { damping: 20, stiffness: 200 }
});
```

## 2. Best Practices & Troubleshooting

### Cross-Fades vs. Hard Cuts
For a professional feel, use `TransitionSeries` or overlap `<Sequence>` components by 15-30 frames, applying fade in/out interpolations.

### Handling 3D / 2.5D
Wrap a standard 2D view (like an image) in a container with `perspective` and `rotateY`/`rotateX` applied to create depth. Use a heavy mass spring (`mass: 2`) for 3D rotations so they feel substantial.

### Text Typolgraphy
Video text needs to be much larger than web text. Ensure titles are 64px+ and body is 28px+.

## 3. Render Configurations (`RENDER_CONFIG.md`)

When testing is complete, recommend the appropriate specific rendering command.

### Standard Render Command
```bash
npx remotion render src/index.tsx MyVideo output.mp4 \
  --codec=h264 \
  --crf=18 \
  --pixel-format=yuv420p \
  --audio-codec=aac \
  --audio-bitrate=320k
```

### Platform Specs
- **YouTube**: MP4 (H.264), 1920x1080 (16:9), 30fps.
- **Instagram Reels / TikTok**: MP4 (H.264), 1080x1920 (9:16), 30fps. Length < 60s.
- **Twitter**: Compress slightly more (`--crf=23`).

## AI Agent Instructions
Review the generated components from `remotion-developer`. Identify animations that look clunky or mechanical. Replace linear interpolations with `spring()`. Add overlap to transitions. Finally, output the recommended render command based on the target platform.
