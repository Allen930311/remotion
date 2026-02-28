---
name: remotion-developer
description: Generates React/Remotion code. Scaffolds project directories, creates `Sequence` timelines, and generates individual scene `.tsx` components based on a video spec.
---

# Remotion Developer

This skill focuses strictly on React and Remotion implementation. It takes the `VIDEO_SPEC.md` and scaffold out the project, calculates timelines, and builds the visual components.

## What This Skill Does

1. **Scaffolding**: Creates directories, `index.tsx`, `constants.ts`, and registers the `<Composition>`.
2. **Composition Structure**: Writes the main file organizing `<Sequence>` components with accurate `from` and `durationInFrames` props.
3. **Component Generation**: Implements each UI layout (e.g., `Scene1.tsx`, `Scene2.tsx`) based on the visual description in the spec.

## 1. Project Scaffolding
Always structure videos to support multiple formats if needed:
```
src/remotion/compositions/MyVideo/
├── index.tsx           # Main file with Sequences
├── constants.ts        # Colors, SCENE_TIMING
└── scenes/
    ├── Scene1.tsx
    └── Scene2.tsx
```

## 2. Sequence Layout (Composition)
Transform the `VIDEO_SPEC.md` timing into frame-exact `SCENE_TIMING` constants (assume 30fps). Overlap scenes for cross-fade transitions.

```tsx
<AbsoluteFill>
  <Sequence from={0} durationInFrames={150}>
    <Scene1 />
  </Sequence>
  {/* Overlap by 15 frames for transition */}
  <Sequence from={135} durationInFrames={300}>
    <Scene2 />
  </Sequence>
</AbsoluteFill>
```

## 3. Component Generation
- Use `AbsoluteFill` for containers.
- Avoid `position: absolute; left: 50%; top: 50%`. Use flexbox (`justifyContent: 'center'`, `alignItems: 'center'`).
- Ensure all text uses robust typography rules defined in the designer spec.
- Set up placeholder interpolation variables (the `remotion-expert` will refine the math and springs).

Example Scene:
```tsx
import { AbsoluteFill, useVideoConfig, useCurrentFrame } from "remotion";
import { Img, staticFile } from "remotion";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  // Animation hooks to be refined by remotion-expert...
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#FAF8F5', justifyContent: 'center', alignItems: 'center' }}>
       {/* Generate UI based on spec */}
       <h1 style={{ fontSize: 64, color: '#1E4D4D' }}>Title</h1>
    </AbsoluteFill>
  );
};
```

## AI Agent Instructions
Execute these tasks systematically. First create the folder and constants, then the main Sequence index, and finally iterate through every Scene. When components are generated, hand off to `remotion-expert` for animation polishing.
