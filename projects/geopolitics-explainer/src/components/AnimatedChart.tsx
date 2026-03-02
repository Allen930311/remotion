import React from "react";
import { evolvePath } from "@remotion/paths";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

export const AnimatedChart: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Based on Remotion official charts rule
    const path = "M 0 300 L 100 250 L 200 280 L 300 150 L 400 200 L 500 50";

    const progress = interpolate(frame - delay, [0, 2 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
    });

    const { strokeDasharray, strokeDashoffset } = evolvePath(progress, path);

    return (
        <div style={{ width: 500, height: 350, position: "relative" }}>
            <svg width="500" height="350" viewBox="0 0 500 350">
                <path
                    d={path}
                    fill="none"
                    stroke="#D4694A"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
            {/* Down -> Up annotation */}
            <div style={{
                position: "absolute", right: -50, top: 0,
                opacity: interpolate(progress, [0.8, 1], [0, 1], { extrapolateRight: "clamp" }),
                fontSize: 32, fontFamily: "Inter", fontWeight: "bold", color: "#1E4D4D",
                backgroundColor: "#FAF8F5", padding: "10px 20px", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
                降估值進場點?
            </div>
        </div>
    );
};
