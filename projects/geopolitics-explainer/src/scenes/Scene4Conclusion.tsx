import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { FONT_FAMILY, FONT_MONO } from "../fonts";
import { THEME } from "../theme";

// Animated bar component
const AnimatedBar: React.FC<{
    value: number; label: string; color: string;
    frame: number; delay: number; maxHeight: number;
}> = ({ value, label, color, frame, delay, maxHeight }) => {
    const progress = spring({ frame: frame - delay, fps: 30, config: { damping: 20, stiffness: 80 } });
    const barHeight = progress * (value / 100) * maxHeight;
    const displayValue = Math.round(value * progress);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flex: 1 }}>
            {/* Value label */}
            <span style={{
                fontFamily: FONT_MONO, fontSize: 48, fontWeight: "bold",
                color,
                opacity: interpolate(progress, [0.3, 0.6], [0, 1], { extrapolateRight: "clamp" }),
            }}>{displayValue}%</span>
            {/* Bar */}
            <div style={{
                width: "80%", height: maxHeight, borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                overflow: "hidden",
            }}>
                <div style={{
                    width: "100%", height: barHeight,
                    background: `linear-gradient(180deg, ${color}, ${color}88)`,
                    borderRadius: 12,
                    boxShadow: `0 0 30px ${color}44`,
                }} />
            </div>
            {/* Label */}
            <span style={{
                fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700,
                color: THEME.text, textAlign: "center",
            }}>{label}</span>
        </div>
    );
};

// Pill tag component
const PillTag: React.FC<{ text: string; frame: number; delay: number; color: string }> = ({ text, frame, delay, color }) => {
    const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 150 } });
    return (
        <div style={{
            transform: `scale(${scale})`,
            background: `${color}22`,
            border: `2px solid ${color}`,
            color: THEME.text,
            padding: "14px 32px",
            borderRadius: 40,
            fontSize: 34,
            fontFamily: FONT_FAMILY,
            fontWeight: 700,
            boxShadow: `0 0 20px ${color}33`,
        }}>
            {text}
        </div>
    );
};

export const Scene4Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: THEME.gradient }}>
            {/* Grid */}
            <AbsoluteFill style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }} />

            <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header */}
                <div>
                    <div style={{
                        fontFamily: FONT_MONO, fontSize: 24,
                        color: THEME.red, letterSpacing: 4, fontWeight: 700,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
                    }}>PUBLIC OPINION</div>
                    <h1 style={{
                        fontFamily: FONT_FAMILY, fontSize: 72, fontWeight: 900,
                        color: THEME.text, margin: "10px 0 0 0",
                    }}>美國民意反撲</h1>
                </div>

                {/* Dual bar chart */}
                <div style={{
                    marginTop: 50,
                    background: THEME.bgCard,
                    border: `1px solid ${THEME.bgCardBorder}`,
                    borderRadius: 20,
                    padding: "40px",
                    display: "flex", gap: 40,
                    flex: 0,
                }}>
                    <AnimatedBar value={25} label="支持攻擊" color={THEME.red} frame={frame} delay={30} maxHeight={280} />
                    <AnimatedBar value={68} label="反對介入" color={THEME.green} frame={frame} delay={45} maxHeight={280} />
                    <AnimatedBar value={7} label="無意見" color={THEME.textMuted} frame={frame} delay={60} maxHeight={280} />
                </div>

                {/* Concern pills */}
                <div style={{
                    marginTop: 40,
                    display: "flex", flexWrap: "wrap", gap: 16,
                    justifyContent: "center",
                }}>
                    <PillTag text="📈 通膨壓力" frame={frame} delay={90} color={THEME.red} />
                    <PillTag text="💸 生活成本" frame={frame} delay={100} color={THEME.gold} />
                    <PillTag text="🚫 反對海外軍費" frame={frame} delay={110} color={THEME.navy} />
                    <PillTag text="⛽ 油價飆漲" frame={frame} delay={120} color={THEME.red} />
                </div>

                {/* CTA */}
                <div style={{
                    marginTop: "auto",
                    textAlign: "center",
                    opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
                    transform: `translateY(${interpolate(frame, [180, 210], [30, 0], { extrapolateRight: "clamp" })}px)`,
                }}>
                    <div style={{
                        display: "inline-block",
                        background: `linear-gradient(135deg, ${THEME.red}, ${THEME.navy})`,
                        padding: "24px 60px",
                        borderRadius: 16,
                        fontSize: 44,
                        fontFamily: FONT_FAMILY,
                        fontWeight: 900,
                        color: THEME.text,
                        boxShadow: `0 8px 32px rgba(230, 57, 70, 0.4)`,
                    }}>
                        你怎麼看這次衝突？留言討論 👇
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
