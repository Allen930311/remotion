import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AnimatedChart } from "../components/AnimatedChart";

export const Scene4Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Staggered pills
    const renderPill = (text: string, delay: number, bg: string = "#1C1C1C", color: string = "#FAF8F5") => {
        const scale = spring({ frame: frame - delay, fps, config: { damping: 14 } });
        return (
            <div style={{
                transform: `scale(${scale})`,
                backgroundColor: bg,
                color: color,
                padding: "20px 40px",
                borderRadius: "40px",
                fontSize: "40px",
                fontFamily: "Inter",
                fontWeight: "bold",
                border: bg === "#FAF8F5" ? "4px solid #1C1C1C" : "none"
            }}>
                {text}
            </div>
        );
    };

    return (
        <AbsoluteFill style={{ backgroundColor: "#FAF8F5", padding: "80px" }}>
            <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "80px", color: "#1C1C1C", margin: 0 }}>內憂浮現</h1>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "60px", color: "#D4694A", marginTop: 20 }}>美國民意反撲</h2>

            {/* Chart container */}
            <div style={{ marginTop: 60, display: "flex", gap: 80 }}>
                {/* Support Bar Chart (Simplified using standard divs for layout, but animated properly) */}
                <div style={{ width: 300, height: 400, borderLeft: "4px solid #1C1C1C", borderBottom: "4px solid #1C1C1C", position: "relative", display: "flex", alignItems: "flex-end", padding: "0 40px" }}>
                    <div style={{
                        width: "100%",
                        backgroundColor: "#1E4D4D",
                        height: `${spring({ frame: frame - 60, fps, config: { damping: 20 } }) * 25}%`,
                        position: "relative",
                        display: "flex", justifyContent: "center"
                    }}>
                        <span style={{ position: "absolute", top: -50, fontSize: 40, fontFamily: "JetBrains Mono", fontWeight: "bold" }}>25%</span>
                    </div>
                    <div style={{ position: "absolute", bottom: -60, left: 0, width: "100%", textAlign: "center", fontSize: 32, fontFamily: "Inter", fontWeight: "bold" }}>支持攻擊</div>
                </div>

                {/* Labels / Word cloud */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 30, alignContent: "center", flex: 1 }}>
                    {renderPill("通膨壓力", 90, "#D4694A")}
                    {renderPill("生活成本", 100, "#FAF8F5", "#1C1C1C")}
                    {renderPill("反對海外軍費", 110)}
                </div>
            </div>

            {/* Outro CTA */}
            <div style={{
                position: "absolute", bottom: 80, left: 80, right: 80,
                opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
                textAlign: "center",
                fontSize: "50px",
                fontFamily: "Inter",
                fontWeight: "800",
                color: "#1E4D4D"
            }}>
                你怎麼看這次衝突？留言討論 👇
            </div>
        </AbsoluteFill>
    );
};
