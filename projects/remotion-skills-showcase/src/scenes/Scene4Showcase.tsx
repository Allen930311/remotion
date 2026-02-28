import React from "react";
import { spring, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { COLOR_PALETTE, FPS } from "../constants";

export const Scene4Showcase: React.FC = () => {
    const frame = useCurrentFrame();

    const rotation = spring({
        frame,
        fps: FPS,
        config: { stiffness: 40, damping: 12, mass: 2 },
    });

    const scale = spring({
        frame: frame - 20,
        fps: FPS,
        config: { stiffness: 80, damping: 15 },
    });

    const rotateY = interpolate(rotation, [0, 1], [-15, 15]);
    const rotateX = interpolate(rotation, [0, 1], [10, -10]);

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", perspective: 1500 }}>
            <h2
                style={{
                    position: "absolute",
                    top: 80,
                    color: COLOR_PALETTE.secondary,
                    fontSize: 48,
                    fontFamily: "sans-serif",
                }}
            >
                2.5D Product Showcase
            </h2>
            <div
                style={{
                    width: 300,
                    height: 600,
                    backgroundColor: COLOR_PALETTE.card,
                    borderRadius: 40,
                    border: `8px solid ${COLOR_PALETTE.textMuted}`,
                    boxShadow: `0 50px 100px rgba(0,0,0,0.5), 0 0 40px ${COLOR_PALETTE.primary}33`,
                    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
                    display: "flex",
                    flexDirection: "column",
                    padding: 20,
                    overflow: "hidden",
                }}
            >
                <div style={{ width: "100%", height: 30, backgroundColor: "#111", borderRadius: 15, marginBottom: 20 }} />
                <div style={{ flex: 1, backgroundColor: "#000", borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            background: `linear-gradient(45deg, ${COLOR_PALETTE.primary}, ${COLOR_PALETTE.accent})`,
                            animation: "pulse 2s infinite ease-in-out",
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    marginTop: 40,
                    color: COLOR_PALETTE.textMuted,
                    fontSize: 24,
                    fontFamily: "sans-serif",
                    opacity: rotation,
                    position: "absolute",
                    bottom: 120,
                }}
            >
                3D Transforms + Physics
            </div>
        </AbsoluteFill>
    );
};
