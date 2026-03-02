import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Scene3Strategy: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Typewriter effect
    const fullText = "週末戰爭模式：控制在24小時內，避免經濟恐慌";
    const typewriterProgress = interpolate(frame, [30, 90], [0, fullText.length], { extrapolateRight: "clamp" });
    const displayedText = fullText.slice(0, Math.floor(typewriterProgress));

    return (
        <AbsoluteFill style={{ backgroundColor: "#1E4D4D", padding: "80px", color: "#FAF8F5" }}>
            <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "80px", margin: 0 }}>幕後算計</h1>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "60px", color: "#D4694A", marginTop: 20 }}>川普的戰略佈局</h2>

            {/* Typewriter text */}
            <div style={{
                marginTop: 60,
                fontSize: "48px",
                fontFamily: "JetBrains Mono, monospace",
                backgroundColor: "#1C1C1C",
                padding: "40px",
                borderRadius: "16px",
                borderLeft: "8px solid #D4694A",
                minHeight: "150px"
            }}>
                &gt; {displayedText}
                <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>_</span>
            </div>

            {/* Nodes / Connections simulation */}
            <div style={{ marginTop: 80, position: "relative", height: 400 }}>
                <Node label="US" x={100} y={100} frame={frame} delay={120} />
                <Node label="IRAN" x={450} y={250} frame={frame} delay={150} />
                <Node label="CHINA (Energy Supply)" x={800} y={150} frame={frame} delay={180} />

                {/* Lines between nodes */}
                <Connection startX={150} startY={125} endX={450} endY={275} frame={frame} delay={135} />
                <Connection startX={500} startY={275} endX={800} endY={175} frame={frame} delay={165} color="#D4694A" label="切斷廉價原油" />
            </div>
        </AbsoluteFill>
    );
};

const Node: React.FC<{ label: string; x: number; y: number; frame: number; delay: number }> = ({ label, x, y, frame, delay }) => {
    const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 12 } });
    return (
        <div style={{
            position: "absolute", left: x, top: y,
            transform: `scale(${scale})`,
            backgroundColor: "#FAF8F5", color: "#1C1C1C",
            padding: "20px 30px", borderRadius: "30px",
            fontFamily: "Inter", fontWeight: "bold", fontSize: "36px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}>
            {label}
        </div>
    );
};

const Connection: React.FC<{ startX: number; startY: number; endX: number; endY: number; frame: number; delay: number; color?: string; label?: string }> = ({ startX, startY, endX, endY, frame, delay, color = "rgba(250, 248, 245, 0.5)", label }) => {
    const progress = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });

    if (progress === 0) return null;

    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX);

    return (
        <div style={{
            position: "absolute", left: startX, top: startY,
            width: length * progress, height: 4,
            backgroundColor: color,
            transformOrigin: "0 0",
            transform: `rotate(${angle}rad)`,
            display: "flex", justifyContent: "center"
        }}>
            {label && progress > 0.8 && (
                <span style={{
                    position: "absolute", top: -40, color: color, fontSize: 30, fontFamily: "Inter", fontWeight: "bold",
                    transform: `rotate(${-angle}rad)`, whiteSpace: "nowrap"
                }}>
                    {label}
                </span>
            )}
        </div>
    );
};
