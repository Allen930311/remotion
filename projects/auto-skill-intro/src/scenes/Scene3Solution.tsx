import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";

import { SPRING_CONFIGS, COLORS } from "../constants";

export const Scene3Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
    });

    const panelSlide = spring({
        frame: frame - 20,
        fps,
        config: SPRING_CONFIGS.snappy,
    });

    const xOffset = interpolate(panelSlide, [0, 1], [100, 0]);

    return (
        <AbsoluteFill>
            <Img
                src={staticFile("images/knowledge_library.png")}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: entrance
                }}
            />
            <AbsoluteFill style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 100
            }}>
                <div style={{
                    backgroundColor: COLORS.background,
                    border: `4px solid ${COLORS.accent}`,
                    padding: 40,
                    borderRadius: 20,
                    transform: `translateX(-${xOffset}px)`,
                    opacity: panelSlide
                }}>
                    <h2 style={{ color: COLORS.accent, fontSize: 50 }}>L1: 本地專案</h2>
                    <p style={{ color: "white", fontSize: 30 }}>快速命中踩坑紀錄</p>
                </div>
                <div style={{
                    backgroundColor: COLORS.background,
                    border: `4px solid ${COLORS.primary}`,
                    padding: 40,
                    borderRadius: 20,
                    transform: `translateX(${xOffset}px)`,
                    opacity: panelSlide
                }}>
                    <h2 style={{ color: COLORS.primary, fontSize: 50 }}>L2: 全域知識</h2>
                    <p style={{ color: "white", fontSize: 30 }}>跨專案最佳實踐</p>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
