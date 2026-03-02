import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { FONT_FAMILY, FONT_MONO } from "../fonts";
import { THEME } from "../theme";

// Country node with flag and glow ring
const CountryNode: React.FC<{
    flag: string; name: string; subtitle: string;
    x: number; y: number; frame: number; delay: number;
    glowColor?: string;
}> = ({ flag, name, subtitle, x, y, frame, delay, glowColor = THEME.red }) => {
    const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 12, stiffness: 120 } });
    // Pulsing ring
    const ringScale = interpolate(Math.sin((frame - delay) * 0.1), [-1, 1], [1, 1.15]);
    const ringOpacity = interpolate(Math.sin((frame - delay) * 0.1), [-1, 1], [0.3, 0.7]);

    return (
        <div style={{
            position: "absolute", left: x, top: y,
            transform: `translate(-50%, -50%) scale(${scale})`,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        }}>
            {/* Glow ring */}
            <div style={{ position: "relative" }}>
                <div style={{
                    position: "absolute", inset: -12,
                    borderRadius: "50%",
                    border: `3px solid ${glowColor}`,
                    transform: `scale(${ringScale})`,
                    opacity: ringOpacity,
                    boxShadow: `0 0 30px ${glowColor}66`,
                }} />
                <div style={{
                    width: 100, height: 100, borderRadius: "50%",
                    background: THEME.bgCard,
                    border: `3px solid ${glowColor}`,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    fontSize: 50,
                    boxShadow: `0 0 40px ${glowColor}44`,
                }}>
                    {flag}
                </div>
            </div>
            <div style={{
                fontFamily: FONT_FAMILY, fontSize: 30, fontWeight: 900,
                color: THEME.text, textAlign: "center",
            }}>{name}</div>
            <div style={{
                fontFamily: FONT_FAMILY, fontSize: 20,
                color: THEME.textMuted, textAlign: "center",
            }}>{subtitle}</div>
        </div>
    );
};

// SVG animated connection line
const ConnectionLine: React.FC<{
    x1: number; y1: number; x2: number; y2: number;
    frame: number; delay: number; color?: string; label?: string;
}> = ({ x1, y1, x2, y2, frame, delay, color = "rgba(241,250,238,0.3)", label }) => {
    const progress = interpolate(frame - delay, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
        <>
            <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={color} strokeWidth={3}
                strokeDasharray={length}
                strokeDashoffset={length * (1 - progress)}
                strokeLinecap="round"
            />
            {/* Arrow head */}
            {progress > 0.9 && (
                <circle cx={x2} cy={y2} r={6} fill={color} opacity={interpolate(progress, [0.9, 1], [0, 1])} />
            )}
            {/* Label */}
            {label && progress > 0.7 && (
                <foreignObject x={midX - 120} y={midY - 30} width={240} height={40}>
                    <div style={{
                        fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 700,
                        color, textAlign: "center",
                        backgroundColor: "rgba(10,10,26,0.8)",
                        padding: "4px 16px", borderRadius: 8,
                        opacity: interpolate(progress, [0.7, 0.9], [0, 1], { extrapolateRight: "clamp" }),
                    }}>{label}</div>
                </foreignObject>
            )}
        </>
    );
};

export const Scene3Strategy: React.FC = () => {
    const frame = useCurrentFrame();

    // Typewriter effect
    const fullText = "週末戰爭模式：控制在24小時內，避免經濟恐慌";
    const typewriterProgress = interpolate(frame, [30, 90], [0, fullText.length], { extrapolateRight: "clamp" });
    const displayedText = fullText.slice(0, Math.floor(typewriterProgress));

    return (
        <AbsoluteFill style={{ background: THEME.gradient }}>
            {/* Grid texture */}
            <AbsoluteFill style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }} />

            <div style={{ padding: "80px 60px" }}>
                {/* Section header */}
                <div style={{
                    fontFamily: FONT_MONO, fontSize: 24,
                    color: THEME.gold, letterSpacing: 4, fontWeight: 700,
                    opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
                }}>STRATEGIC ANALYSIS</div>
                <h1 style={{
                    fontFamily: FONT_FAMILY, fontSize: 72, fontWeight: 900,
                    color: THEME.text, margin: "10px 0 0 0",
                }}>幕後算計</h1>
                <h2 style={{
                    fontFamily: FONT_FAMILY, fontSize: 48,
                    color: THEME.gold, marginTop: 10, fontWeight: 700,
                }}>川普的戰略佈局</h2>

                {/* Terminal typewriter */}
                <div style={{
                    marginTop: 40,
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid ${THEME.bgCardBorder}`,
                    borderLeft: `4px solid ${THEME.gold}`,
                    borderRadius: 12,
                    padding: "30px 36px",
                    fontFamily: FONT_MONO, fontSize: 36,
                    color: THEME.green,
                    minHeight: 120,
                }}>
                    <span style={{ color: THEME.gold }}>{'>'}</span>{' '}{displayedText}
                    <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0, color: THEME.gold }}>▌</span>
                </div>

                {/* Geopolitical nodes SVG overlay */}
                <div style={{ position: "relative", height: 420, marginTop: 40 }}>
                    <svg width="100%" height="100%" viewBox="0 0 960 420" style={{ position: "absolute", top: 0, left: 0 }}>
                        <ConnectionLine x1={240} y1={140} x2={480} y2={280} frame={frame} delay={140} color="rgba(241,250,238,0.3)" />
                        <ConnectionLine x1={480} y1={280} x2={720} y2={160} frame={frame} delay={170} color={THEME.red} label="切斷廉價原油" />
                        <ConnectionLine x1={240} y1={140} x2={720} y2={160} frame={frame} delay={200} color={THEME.gold} label="能源博弈" />
                    </svg>

                    <CountryNode flag="🇺🇸" name="美國" subtitle="發動空襲" x={240} y={140} frame={frame} delay={110} glowColor={THEME.navy} />
                    <CountryNode flag="🇮🇷" name="伊朗" subtitle="誓言報復" x={480} y={280} frame={frame} delay={140} glowColor={THEME.red} />
                    <CountryNode flag="🇨🇳" name="中國" subtitle="能源供應鏈" x={720} y={160} frame={frame} delay={170} glowColor={THEME.gold} />
                </div>
            </div>
        </AbsoluteFill>
    );
};
