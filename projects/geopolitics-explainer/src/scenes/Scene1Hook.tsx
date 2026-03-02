import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, Img, interpolate } from "remotion";

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Heavy mass spring for title
    const titleScale = spring({
        frame,
        fps,
        config: {
            mass: 5,
            damping: 15,
            stiffness: 100,
        },
    });

    // Flicker effect for background
    const flicker = Math.sin(frame * 0.5) > 0 ? 1 : 0.8;

    return (
        <AbsoluteFill style={{ backgroundColor: "#FAF8F5", justifyContent: "center", alignItems: "center" }}>
            {/* Background with subtle flicker */}
            <AbsoluteFill style={{
                opacity: interpolate(frame, [0, 10], [0, 1]) * flicker,
                backgroundColor: "#D4694A", // Coral background for tension
                mixBlendMode: "multiply",
            }}>
                {/* Placeholder for noise texture or map SVG */}
            </AbsoluteFill>

            {/* Main Hook Title */}
            <div
                style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "96px",
                    fontWeight: "bold",
                    color: "#1C1C1C",
                    textAlign: "center",
                    transform: `scale(${titleScale})`,
                    textShadow: "4px 4px 0px rgba(0,0,0,0.1)",
                    lineHeight: 1.1,
                    width: "90%",
                }}
            >
                美以聯合空襲<br />
                <span style={{ color: "#FAF8F5", backgroundColor: "#1C1C1C", padding: "0 20px" }}>伊朗最高領袖身亡</span>
            </div>

            {/* Warning Labels */}
            <div style={{
                position: "absolute",
                bottom: 150,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" }),
                transform: `translateY(${interpolate(frame, [30, 45], [50, 0], { extrapolateRight: "clamp" })}px)`
            }}>
                <div style={{ backgroundColor: "#1E4D4D", color: "#FAF8F5", fontSize: "48px", padding: "20px 40px", fontFamily: "Inter, sans-serif", fontWeight: 800 }}>全國哀悼 40 天</div>
                <div style={{ backgroundColor: "#D4694A", color: "#FAF8F5", fontSize: "48px", padding: "20px 40px", fontFamily: "Inter, sans-serif", fontWeight: 800 }}>報復警告</div>
            </div>
        </AbsoluteFill>
    );
};
