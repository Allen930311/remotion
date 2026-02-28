import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

import { SPRING_CONFIGS, COLORS } from "../constants";

export const Scene5Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
    });

    const scale = interpolate(entrance, [0, 1], [0.9, 1]);

    return (
        <AbsoluteFill style={{
            backgroundColor: COLORS.background,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{ transform: `scale(${scale})`, opacity: entrance, textAlign: "center" }}>
                <h1 style={{ color: COLORS.accent, fontSize: 100, marginBottom: 40 }}>auto-skill</h1>
                <div style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "20px 40px",
                    borderRadius: 10,
                    fontFamily: "monospace",
                    fontSize: 40,
                    color: COLORS.primary
                }}>
                    {">"} auto-skill start
                </div>
                <p style={{ color: COLORS.secondary, fontSize: 30, marginTop: 60 }}>
                    讓每一次對話，都成為您的智庫
                </p>
            </div>
        </AbsoluteFill>
    );
};
