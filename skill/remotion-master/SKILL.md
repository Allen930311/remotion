---
name: remotion-master
description: Master orchestrator that chains all Remotion video creation skills together. Single entry point for starting a video project. It understands the entire workflow (Spec -> Assets -> Code -> Render) and delegates tasks to sub-skills. Use when starting a new video from scratch, when asked to "create a video", "make a video", "build a complete video".
argument-hint: <creative-brief>
---

# Remotion Master

Master orchestrator skill that chains the entire Remotion video pipeline together. Takes a single creative brief and efficiently delegates tasks to specialized sub-skills.

## Architecture

This skill is the orchestrator for 3 specialized sub-skills + 1 knowledge provider:
1. **remotion-designer**: Generates `VIDEO_SPEC.md`
2. **remotion-assets**: Prepares `ASSET_MANIFEST.md` and generates/converts assets
3. **remotion-developer**: Scaffolds project, generates components, structures timeline
4. **remotion-official**: **Core Knowledge Provider**. Supplies official rules for 3D, Audio, Charts, advanced API usage, **rendering configurations**, and **animation physics**.

## Pipeline Execution

When invoked, execute this pipeline in order:

### Step 1: Design (Delegated to remotion-designer)
Pass the `$CREATIVE_BRIEF` to `remotion-designer` to generate `VIDEO_SPEC.md` inside `$PIPELINE_DIR/`.
- **Official Check**: Consult `remotion-official` for feasibility of requested features (e.g., `rules/charts.md`, `rules/3d.md`).

### Step 2: Assets (Delegated to remotion-assets)
Pass the `VIDEO_SPEC.md` to `remotion-assets` to generate `ASSET_MANIFEST.md`.
- **Official Check**: Follow `rules/assets.md` and `rules/fonts.md` for optimized loading.

### Step 3: Development (Delegated to remotion-developer)
Pass `VIDEO_SPEC.md` and `ASSET_MANIFEST.md` to `remotion-developer`.
- **Official Check**: Use `rules/sequencing.md` for timeline structures, `rules/timing.md` for spring physics and easing, `rules/transitions.md` for professional scene cuts. Refer to `rules-custom/prompting.md` for the 4-dimension prompting framework.

### Step 4: Polish & Render
Apply advanced animations directly using `remotion-official` rules:
- **Animation Polish**: `rules/timing.md` (spring presets, easing curves), `rules/animations.md` (stagger patterns)
- **Transitions**: `rules/transitions.md` (TransitionSeries, Slide, Wipe, Flip)
- **2.5D Effects**: `rules-custom/2.5d-showcase.md` (phone container + 3D rotation)
- **Render Config**: `rules-custom/rendering.md` (platform specs, Colab setup, Windows compatibility)

## Input Format

**Creative Brief**
```text
Create a 30-second product demo video for Vello, an AI task management app.
Show the main features: smart scheduling, team collaboration, and AI suggestions.
Use modern, clean aesthetic with the brand colors (orange #FF6B35, dark background).
Include upbeat background music and subtle sound effects for transitions.
Target platform: YouTube and Twitter.
```

## AI Agent Instructions
As the AI, your job in `remotion-master` is to NOT do the detailed work yourself, but to coordinate. You must explicitly tell the user which sub-skill you are invoking next, wait for its completion, and string the outputs together. **Always cross-reference `remotion-official` during each step to ensure code quality conforms to current best practices.**
