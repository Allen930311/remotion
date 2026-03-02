import React from "react";
import { spring, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { COLOR_PALETTE, FPS } from "../constants";

export const Scene5Outro: React.FC = () => {
    const frame = useCurrentFrame();

    const logoSpring = spring({
        frame,
        fps: FPS,
        config: { stiffness: 120, damping: 10, mass: 1 },
    });

    const textOpacity = interpolate(frame, [40, 70], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div
                style={{
                    width: 160,
                    height: 160,
                    borderRadius: 40,
                    background: `linear-gradient(135deg, ${COLOR_PALETTE.primary}, ${COLOR_PALETTE.secondary})`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 80,
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    transform: `scale(${logoSpring}) rotate(${logoSpring * 360}deg)`,
                    boxShadow: `0 20px 50px ${COLOR_PALETTE.primary}66`,
                }}
            >
                R
            </div>
            <div
                style={{
                    marginTop: 60,
                    color: COLOR_PALETTE.text,
                    fontSize: 56,
                    fontWeight: 800,
                    opacity: textOpacity,
                    fontFamily: "sans-serif",
                    textAlign: "center",
                }}
            >
                Master Remotion<br />
                <span style={{ color: COLOR_PALETTE.accent, fontSize: 32 }}>Built with Auto-Skill</span>
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: 60,
                    color: COLOR_PALETTE.textMuted,
                    fontSize: 20,
                    letterSpacing: 2,
                    fontFamily: "sans-serif",
                    opacity: textOpacity,
                }}
            >
                ALLEN PROJECTS © 2026
            </div>
        </AbsoluteFill>
    );
};
