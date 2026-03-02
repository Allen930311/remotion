import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { FONT_FAMILY, FONT_MONO } from "../fonts";
import { THEME } from "../theme";

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Heavy mass spring for title slam
    const titleScale = spring({
        frame,
        fps,
        config: { mass: 5, damping: 15, stiffness: 100 },
    });

    // Red pulse overlay
    const pulseOpacity = interpolate(
        Math.sin(frame * 0.15),
        [-1, 1],
        [0.05, 0.2]
    );

    // Subtitle fade in
    const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
    const subtitleY = interpolate(frame, [40, 60], [30, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

    // Warning labels stagger
    const label1Opacity = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" });
    const label1X = interpolate(frame, [70, 85], [-100, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
    const label2Opacity = interpolate(frame, [85, 100], [0, 1], { extrapolateRight: "clamp" });
    const label2X = interpolate(frame, [85, 100], [100, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

    // Breaking news ticker
    const tickerOffset = interpolate(frame, [0, 300], [1080, -2000]);

    // LIVE indicator blink
    const liveOpacity = Math.sin(frame * 0.2) > 0 ? 1 : 0.3;

    return (
        <AbsoluteFill style={{ background: THEME.gradient }}>
            {/* Subtle grid pattern */}
            <AbsoluteFill style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }} />

            {/* Red pulse overlay */}
            <AbsoluteFill style={{
                backgroundColor: THEME.red,
                opacity: pulseOpacity,
            }} />

            {/* LIVE indicator */}
            <div style={{
                position: "absolute", top: 60, left: 60,
                display: "flex", alignItems: "center", gap: 12,
                opacity: liveOpacity,
            }}>
                <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    backgroundColor: THEME.red,
                    boxShadow: `0 0 20px ${THEME.red}`,
                }} />
                <span style={{
                    fontFamily: FONT_MONO, fontSize: 28,
                    fontWeight: "bold", color: THEME.red,
                    letterSpacing: 4,
                }}>LIVE</span>
            </div>

            {/* Main content */}
            <div style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center",
                height: "100%", padding: "0 60px",
            }}>
                {/* Breaking badge */}
                <div style={{
                    backgroundColor: THEME.red,
                    color: THEME.text,
                    fontFamily: FONT_FAMILY,
                    fontSize: 32, fontWeight: 700,
                    padding: "10px 40px",
                    letterSpacing: 6,
                    marginBottom: 40,
                    opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
                }}>
                    ⚡ 突發新聞
                </div>

                {/* Main title */}
                <div style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 88, fontWeight: 900,
                    color: THEME.text,
                    textAlign: "center",
                    transform: `scale(${titleScale})`,
                    lineHeight: 1.2,
                    textShadow: `0 0 60px rgba(230, 57, 70, 0.4)`,
                }}>
                    美以聯合空襲
                </div>

                {/* Subtitle with highlight */}
                <div style={{
                    marginTop: 30,
                    opacity: subtitleOpacity,
                    transform: `translateY(${subtitleY}px)`,
                }}>
                    <span style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 72, fontWeight: 900,
                        color: THEME.red,
                        backgroundColor: "rgba(230,57,70,0.15)",
                        padding: "8px 30px",
                        borderLeft: `6px solid ${THEME.red}`,
                    }}>
                        伊朗最高領袖身亡
                    </span>
                </div>

                {/* Warning labels */}
                <div style={{
                    marginTop: 80,
                    display: "flex", gap: 20,
                    flexDirection: "column", alignItems: "center",
                }}>
                    <div style={{
                        backgroundColor: THEME.navy,
                        color: THEME.text,
                        fontSize: 42, fontFamily: FONT_FAMILY, fontWeight: 700,
                        padding: "18px 50px",
                        borderRadius: 8,
                        opacity: label1Opacity,
                        transform: `translateX(${label1X}px)`,
                        boxShadow: `0 0 30px rgba(29, 53, 87, 0.6)`,
                    }}>全國哀悼 40 天</div>
                    <div style={{
                        backgroundColor: THEME.red,
                        color: THEME.text,
                        fontSize: 42, fontFamily: FONT_FAMILY, fontWeight: 700,
                        padding: "18px 50px",
                        borderRadius: 8,
                        opacity: label2Opacity,
                        transform: `translateX(${label2X}px)`,
                        boxShadow: `0 0 30px rgba(230, 57, 70, 0.6)`,
                    }}>⚠️ 報復警告</div>
                </div>
            </div>

            {/* Breaking news ticker bar */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 60, backgroundColor: THEME.red,
                display: "flex", alignItems: "center",
                overflow: "hidden",
            }}>
                <div style={{
                    whiteSpace: "nowrap",
                    fontFamily: FONT_FAMILY, fontSize: 30, fontWeight: 700,
                    color: THEME.text,
                    transform: `translateX(${tickerOffset}px)`,
                }}>
                    🔴 伊朗證實最高領袖哈梅內伊於空襲中身亡 ● 中東局勢全面升溫 ● 伊朗誓言報復 ● 原油暴漲 13% ● 全球市場劇烈震盪 ● 霍爾木茲海峽戰爭保險費率大漲 50%
                </div>
            </div>
        </AbsoluteFill>
    );
};
