import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene1ColabLogo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animation
    const scale = spring({
        frame,
        fps,
        config: { damping: 12 },
    });

    // Continuous spinning
    const spin = interpolate(frame, [0, 150], [0, 360 * 2]);

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            {/* Fallback to simple CSS text styling if Colab logo is missing, or construct simple shapes as placeholder */}
            <div
                style={{
                    transform: `scale(${scale}) rotate(${spin}deg)`,
                    width: 300,
                    height: 300,
                    backgroundColor: "#F9AB00",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
            >
                <div style={{ fontSize: 80, fontWeight: "bold", color: "white" }}>
                    CO
                </div>
            </div>
            <div
                style={{
                    marginTop: 40,
                    fontSize: 60,
                    fontWeight: 800,
                    color: "#333",
                    fontFamily: "sans-serif",
                    opacity: interpolate(frame, [30, 45], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    })
                }}
            >
                Google Colab
            </div>
        </AbsoluteFill>
    );
};
