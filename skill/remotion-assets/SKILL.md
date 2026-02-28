---
name: remotion-assets
description: Handles media assets for Remotion videos. Coordinates text-to-speech (ElevenLabs), image generation (Risograph/Skill Stack), audio/video encoding, and cross-platform compatibility (Windows/Colab).
allowed-tools: Bash, Bash(node:*), Bash(npx:*)
---

# Remotion Assets

This skill manages all media assets—audio, images, and fonts—required for the Remotion project. It parses the video spec, recommends missing assets, fetches existing ones, or generates new ones.

## What This Skill Does

1. **Asset Manifest Mapping**: Creates an `ASSET_MANIFEST.md` listing everything needed (Images, Audio, Fonts).
2. **Speech Generation**: Integrates with ElevenLabs for voiceovers (`elevenlabs-remotion`).
3. **Format Conversion**: Uses FFmpeg to convert assets to browser-decodable formats.
4. **Import Snippets**: Generates `staticFile()` snippet tests.

## 1. Asset Manifest & Directory Structure

All assets go into the `public/` directory:
```
public/
├── images/     (e.g., logo.png, background.jpg)
├── audio/
│   ├── voices/ (e.g., scene1_vo.mp3)
│   ├── sfx/    (e.g., whoosh.mp3)
│   └── music/  (e.g., bgm.mp3)
└── fonts/      (if not using @remotion/google-fonts)
```
Create these directories if they don't exist. Check for missing assets.

## 2. Voiceover Generation (ElevenLabs)

Generate professional AI voiceovers for Remotion videos using the ElevenLabs API script.

### Using the script
Script location: `.claude/skills/elevenlabs-remotion-skill/generate.js` (or globally if installed)

```bash
# Generate single voiceover with narrator character
node generate.js --text "Hello world" --character narrator --output public/audio/voices/scene1.mp3
```

### Character Presets
- `narrator` (default for explainers): Professional, engaging storyteller.
- `expert`: Confident, authoritative (good for tutorials).
- `salesperson`: Energetic, persuasive.

### Stitching & Multi-scene
To maintain consistent prosody across multiple scenes, create a `scenes.json` and generate them in batch.
```json
{
  "voice": "George",
  "character": "narrator",
  "scenes": [
    { "id": "scene1", "text": "First sentence.", "duration": 4.0 },
    { "id": "scene2", "text": "Next thought." }
  ]
}
```
Command: `node generate.js --scenes scenes.json --output-dir public/audio/voices/`

## 3. Format & Encoding Standard

Remotion relies on Chrome/Chromium to decode media.
- **Images**: PNG (transparency) or JPEG.
- **Video**: H.264 (MP4) is safest.
- **Audio**: MP3 (`192k` or `320k`) or AAC.

### Colab & Windows Compatibility
When using FFmpeg to encode assets (especially video) for Windows playback:
- **Mandatory Flags**: `-pix_fmt yuv420p` + `-movflags +faststart`.
- Using `yuv444p` or `yuv422p` will fail on Windows Media Player.

Example conversion:
```bash
ffmpeg -i input.wav -c:a libmp3lame -b:a 192k public/audio/sfx/whoosh.mp3
```

## AI Agent Instructions
For new video projects:
1. Parse the `VIDEO_SPEC.md` to identify required images, background music, and script for voiceovers.
2. Formulate `ASSET_MANIFEST.md` in the pipeline folder.
3. If voiceover text is present, generate it via ElevenLabs script.
4. Verify all listed files exist in the `public/` folder exactly matching their paths.
