import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { SPRING_CONFIGS, COLORS } from "../constants";

export const Scene2Problem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
    });

    const shake = Math.sin(frame * 0.5) * 5;

    const errorOpacity = interpolate(frame, [15, 30, 45, 60], [0, 1, 0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill>
            <Img
                src={staticFile("images/character_frustrated.png")}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `translateX(${shake}px)`,
                    opacity: entrance
                }}
            />
            <AbsoluteFill style={{ padding: 100, justifyContent: "flex-end" }}>
                <div style={{
                    backgroundColor: "rgba(239, 68, 68, 0.8)",
                    padding: 40,
                    borderRadius: 20,
                    color: "white",
                    fontSize: 40,
                    opacity: errorOpacity,
                    width: "fit-content"
                }}>
                    ⚠️ 又是同樣的錯誤？
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
