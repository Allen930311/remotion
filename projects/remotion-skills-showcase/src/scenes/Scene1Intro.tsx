import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from "remotion";
import { COLOR_PALETTE, FPS } from "../constants";

export const Scene1Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const titleSpring = spring({
        frame,
        fps: FPS,
        config: {
            stiffness: 100,
            damping: 10,
            mass: 1,
        },
    });

    const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <h1
                style={{
                    color: COLOR_PALETTE.primary,
                    fontSize: 120,
                    fontWeight: 900,
                    margin: 0,
                    transform: `scale(${titleSpring})`,
                    textShadow: `0 10px 30px rgba(56, 189, 248, 0.3)`,
                    fontFamily: "Inter, system-ui, sans-serif",
                }}
            >
                REMOTION
            </h1>
            <div
                style={{
                    color: COLOR_PALETTE.secondary,
                    fontSize: 48,
                    fontWeight: 600,
                    marginTop: 20,
                    opacity: subtitleOpacity,
                    letterSpacing: 4,
                    fontFamily: "Inter, system-ui, sans-serif",
                }}
            >
                SKILLS MASTERY
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: 100,
                    width: 200,
                    height: 4,
                    backgroundColor: COLOR_PALETTE.accent,
                    transform: `scaleX(${titleSpring})`,
                    borderRadius: 2,
                }}
            />
        </AbsoluteFill>
    );
};
