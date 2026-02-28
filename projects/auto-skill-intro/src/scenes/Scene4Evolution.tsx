import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { SPRING_CONFIGS, COLORS } from "../constants";

export const Scene4Evolution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.heavy,
    });

    const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);

    return (
        <AbsoluteFill style={{
            backgroundColor: COLORS.background,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                width: 400 * progress,
                height: 600 * progress,
                backgroundColor: COLORS.accent,
                borderRadius: "0 20px 20px 0",
                boxShadow: `0 0 ${40 * glow}px ${COLORS.accent}`,
                display: "flex",
                flexDirection: "column",
                padding: 40
            }}>
                <div style={{ height: 10, width: "100%", backgroundColor: COLORS.background, marginBottom: 20 }} />
                <div style={{ height: 10, width: "80%", backgroundColor: COLORS.background, marginBottom: 20 }} />
                <div style={{ height: 10, width: "90%", backgroundColor: COLORS.background, marginBottom: 20 }} />
            </div>
            <h2 style={{
                position: "absolute",
                bottom: 150,
                color: COLORS.white,
                fontSize: 60,
                opacity: progress
            }}>
                自動蒸餾，不斷進化
            </h2>
        </AbsoluteFill>
    );
};
