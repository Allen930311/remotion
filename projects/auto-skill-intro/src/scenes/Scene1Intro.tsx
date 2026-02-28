import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";

import { SPRING_CONFIGS, COLORS } from "../constants";

export const Scene1Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.heavy,
    });

    const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateRight: "clamp",
    });

    const scale = interpolate(entrance, [0, 1], [0.8, 1]);

    return (
        <AbsoluteFill>
            <Img
                src={staticFile("images/scene1_hero.png")}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale})`,
                    opacity: entrance
                }}
            />
            <AbsoluteFill style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(15, 23, 42, 0.4)"
            }}>
                <h1 style={{
                    color: COLORS.accent,
                    fontSize: 120,
                    fontWeight: "bold",
                    opacity: titleOpacity,
                    textShadow: "0 0 20px rgba(0,0,0,0.5)"
                }}>
                    auto-skill
                </h1>
                <p style={{
                    color: COLORS.white,
                    fontSize: 40,
                    opacity: titleOpacity,
                    marginTop: 20
                }}>
                    您的自進化知識助手
                </p>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
