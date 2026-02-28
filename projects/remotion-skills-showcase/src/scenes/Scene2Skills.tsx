import React from "react";
import { spring, useCurrentFrame, interpolate, AbsoluteFill, Easing } from "remotion";
import { COLOR_PALETTE, FPS } from "../constants";

const SkillBox: React.FC<{
    label: string;
    value: number;
    color: string;
    delay: number;
}> = ({ label, value, color, delay }) => {
    return (
        <div style={{ marginBottom: 40, width: "100%" }}>
            <div style={{ color: COLOR_PALETTE.text, fontSize: 24, marginBottom: 10, fontFamily: "sans-serif" }}>
                {label}
            </div>
            <div
                style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: COLOR_PALETTE.card,
                    borderRadius: 12,
                    overflow: "hidden",
                    border: `1px solid ${color}44`,
                }}
            >
                <div
                    style={{
                        width: `${value * 100}%`,
                        height: "100%",
                        backgroundColor: color,
                        boxShadow: `0 0 20px ${color}66`,
                    }}
                />
            </div>
        </div>
    );
};

export const Scene2Skills: React.FC = () => {
    const frame = useCurrentFrame();

    const springVal = spring({
        frame: frame - 20,
        fps: FPS,
        config: { stiffness: 100, damping: 10 },
    });

    const easingVal = interpolate(frame - 40, [0, 60], [0, 1], {
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const linearVal = interpolate(frame - 60, [0, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ padding: 100, justifyContent: "center" }}>
            <h2 style={{ color: COLOR_PALETTE.accent, fontSize: 48, marginBottom: 60, fontFamily: "sans-serif" }}>
                Animation Physics
            </h2>
            <SkillBox label="Spring (Dynamic)" value={springVal} color={COLOR_PALETTE.primary} delay={20} />
            <SkillBox label="Easing (Smooth)" value={easingVal} color={COLOR_PALETTE.secondary} delay={40} />
            <SkillBox label="Linear (Rigid)" value={linearVal} color={COLOR_PALETTE.textMuted} delay={60} />
        </AbsoluteFill>
    );
};
