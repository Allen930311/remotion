import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { AnimatedChart } from "../components/AnimatedChart";
import { FONT_FAMILY, FONT_MONO } from "../fonts";
import { THEME } from "../theme";

// Animated counter component
const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string; frame: number; delay: number; color?: string }> = ({
    value, prefix = "", suffix = "", frame, delay, color = THEME.gold,
}) => {
    const progress = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
    const displayVal = Math.round(value * progress);
    return (
        <span style={{ fontFamily: FONT_MONO, fontSize: 64, fontWeight: "bold", color }}>
            {prefix}{displayVal}{suffix}
        </span>
    );
};

// Glass card component
const GlassCard: React.FC<{
    children: React.ReactNode;
    frame: number;
    delay: number;
    accentColor?: string;
}> = ({ children, frame, delay, accentColor = THEME.red }) => {
    const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 18, stiffness: 150 } });
    return (
        <div style={{
            transform: `scale(${scale})`,
            background: THEME.bgCard,
            backdropFilter: "blur(20px)",
            border: `1px solid ${THEME.bgCardBorder}`,
            borderLeft: `4px solid ${accentColor}`,
            borderRadius: 16,
            padding: "30px 40px",
            boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 40px ${accentColor}22`,
        }}>
            {children}
        </div>
    );
};

// Progress bar component
const ProgressBar: React.FC<{ value: number; frame: number; delay: number; color: string; label: string }> = ({
    value, frame, delay, color, label,
}) => {
    const progress = interpolate(frame - delay, [0, 40], [0, value / 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
    return (
        <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: FONT_FAMILY, fontSize: 28, color: THEME.text, fontWeight: 700 }}>{label}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 28, color, fontWeight: 700 }}>+{Math.round(value * (progress / (value / 100)))}%</span>
            </div>
            <div style={{ height: 12, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{
                    height: "100%", width: `${progress * 100}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    borderRadius: 6,
                    boxShadow: `0 0 20px ${color}66`,
                }} />
            </div>
        </div>
    );
};

export const Scene2Market: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ background: THEME.gradient }}>
            {/* Grid texture */}
            <AbsoluteFill style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }} />

            <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Section header */}
                <div>
                    <div style={{
                        fontFamily: FONT_MONO, fontSize: 24,
                        color: THEME.red, letterSpacing: 4, fontWeight: 700,
                        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
                    }}>MARKET IMPACT</div>
                    <h1 style={{
                        fontFamily: FONT_FAMILY, fontSize: 72, fontWeight: 900,
                        color: THEME.text, margin: "10px 0 0 0",
                        opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" }),
                    }}>金融市場劇烈震盪</h1>
                </div>

                {/* Oil card */}
                <div style={{ marginTop: 50 }}>
                    <GlassCard frame={frame} delay={20} accentColor={THEME.red}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, color: THEME.textMuted, fontWeight: 700 }}>🛢️ 布蘭特原油</div>
                                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 8 }}>
                                    <AnimatedNumber value={13} prefix="+" suffix="%" frame={frame} delay={30} color={THEME.red} />
                                    <span style={{ fontFamily: FONT_MONO, fontSize: 28, color: THEME.textMuted }}>$82.3 /桶</span>
                                </div>
                            </div>
                        </div>
                        <ProgressBar value={13} frame={frame} delay={30} color={THEME.red} label="七個月新高" />
                    </GlassCard>
                </div>

                {/* War insurance card */}
                <div style={{ marginTop: 24 }}>
                    <GlassCard frame={frame} delay={60} accentColor={THEME.gold}>
                        <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, color: THEME.textMuted, fontWeight: 700 }}>⚠️ 霍爾木茲海峽戰爭保險費</div>
                        <div style={{ marginTop: 8 }}>
                            <AnimatedNumber value={50} prefix="+" suffix="%" frame={frame} delay={70} color={THEME.gold} />
                        </div>
                        <ProgressBar value={50} frame={frame} delay={70} color={THEME.gold} label="保費率暴增" />
                    </GlassCard>
                </div>

                {/* Gold card + chart */}
                <div style={{ display: "flex", gap: 24, marginTop: 24, flex: 1 }}>
                    <div style={{ flex: 1 }}>
                        <GlassCard frame={frame} delay={100} accentColor={THEME.green}>
                            <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, color: THEME.textMuted, fontWeight: 700 }}>💰 避險資產</div>
                            <div style={{ display: "flex", gap: 40, marginTop: 16 }}>
                                <div>
                                    <div style={{ fontFamily: FONT_FAMILY, fontSize: 24, color: THEME.textMuted }}>黃金</div>
                                    <AnimatedNumber value={22} prefix="+" suffix="%" frame={frame} delay={110} color={THEME.green} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: FONT_FAMILY, fontSize: 24, color: THEME.textMuted }}>白銀</div>
                                    <AnimatedNumber value={18} prefix="+" suffix="%" frame={frame} delay={120} color={THEME.green} />
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Chart */}
                    <div style={{
                        flex: 1,
                        opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateRight: "clamp" }),
                    }}>
                        <AnimatedChart delay={130} />
                    </div>
                </div>
            </div>

            {/* Bottom ticker */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 50, backgroundColor: THEME.navy,
                display: "flex", alignItems: "center",
                borderTop: `2px solid ${THEME.red}`,
            }}>
                <div style={{
                    fontFamily: FONT_MONO, fontSize: 22, color: THEME.textMuted,
                    whiteSpace: "nowrap",
                    transform: `translateX(${interpolate(frame, [0, 600], [1080, -3000])}px)`,
                }}>
                    BRENT +13% ● WTI +9% ● GOLD +22% ● SILVER +18% ● VIX +35% ● S&P 500 -2.1% ● NASDAQ -3.4% ● EUR/USD -0.8%
                </div>
            </div>
        </AbsoluteFill>
    );
};
