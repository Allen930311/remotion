import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { AnimatedChart } from "../components/AnimatedChart";
export const Scene2Market: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Simple staggered fade in for elements
    const opacityText1 = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
    const opacityText2 = interpolate(frame, [90, 105], [0, 1], { extrapolateRight: "clamp" });

    // 3D rotation for Gold/Silver
    const rotateYGold = spring({ frame: frame - 150, fps, config: { damping: 10 } }) * 360;

    return (
        <AbsoluteFill style={{ backgroundColor: "#FAF8F5", padding: "80px" }}>
            {/* Title */}
            <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "80px", color: "#1E4D4D", margin: 0 }}>危機蔓延</h1>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "60px", color: "#1C1C1C", marginTop: 20 }}>金融市場劇烈震盪</h2>

            {/* Oil & Assets container */}
            <div style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 60 }}>

                {/* Oil */}
                <div style={{ display: "flex", alignItems: "center", gap: 40, opacity: opacityText1 }}>
                    <div style={{ width: 120, height: 120, backgroundColor: "#1C1C1C", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 40 }}>🛢️</div>
                    <div>
                        <div style={{ fontSize: 50, fontFamily: "Inter", fontWeight: "bold" }}>布蘭特原油</div>
                        <div style={{ fontSize: 80, fontFamily: "JetBrains Mono", color: "#D4694A", fontWeight: "bold" }}>+13%</div>
                    </div>
                </div>

                {/* War Insurance Warning */}
                <div style={{
                    backgroundColor: "#D4694A",
                    padding: 40,
                    borderRadius: 20,
                    color: "#FAF8F5",
                    opacity: opacityText2,
                    transform: `scale(${interpolate(frame, [90, 100], [0.8, 1], { extrapolateRight: "clamp" })})`
                }}>
                    <div style={{ fontSize: 40, fontFamily: "Inter", fontWeight: "bold" }}>⚠️ 戰爭保險費暴增</div>
                    <div style={{ fontSize: 70, fontFamily: "JetBrains Mono", fontWeight: "bold", marginTop: 10 }}>+50%</div>
                </div>

                {/* 3D Gold / Silver and Chart */}
                <div style={{ display: "flex", gap: 60, marginTop: 40, alignItems: "center" }}>
                    <div style={{
                        width: 250,
                        height: 250,
                        backgroundColor: "#E6C200",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        transform: `perspective(1000px) rotateY(${rotateYGold}deg)`,
                        opacity: interpolate(frame, [150, 160], [0, 1], { extrapolateRight: "clamp" })
                    }}>
                        <span style={{ fontSize: 80 }}>💰</span>
                        <span style={{ fontSize: 50, fontWeight: "bold", fontFamily: "Inter" }}>黃金 +22%</span>
                    </div>

                    <div style={{ opacity: interpolate(frame, [160, 175], [0, 1], { extrapolateRight: "clamp" }) }}>
                        <AnimatedChart delay={150} />
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
