import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const Node: React.FC<{
    title: string;
    icon: string;
    x: number;
    y: number;
    progress: number;
}> = ({ title, icon, x, y, progress }) => {
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) scale(${progress})`,
                width: 160,
                height: 160,
                backgroundColor: "white",
                border: "4px solid #333",
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ fontSize: 60, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>{title}</div>
        </div>
    );
};

const Connection: React.FC<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    progress: number;
}> = ({ startX, startY, endX, endY, progress }) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return (
        <div
            style={{
                position: "absolute",
                left: startX,
                top: startY,
                width: distance * progress,
                height: 8,
                backgroundColor: "#F9AB00", // Colab Orange
                transformOrigin: "0% 50%",
                transform: `rotate(${angle}deg)`,
                borderRadius: 4,
                opacity: progress > 0 ? 1 : 0,
            }}
        />
    );
};

export const Scene2Architecture: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Positions
    const localPos = { x: 400, y: 540 };
    const githubPos = { x: 960, y: 540 };
    const colabPos = { x: 1520, y: 540 };

    // Pop-in animations
    const localScale = spring({ frame, fps, config: { damping: 12 } });
    const githubScale = spring({ frame: frame - 60, fps, config: { damping: 12 } });
    const colabScale = spring({ frame: frame - 180, fps, config: { damping: 12 } });

    // Connection animations
    const line1Progress = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const line2Progress = interpolate(frame, [120, 180], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={{ backgroundColor: "white" }}>

            {/* Title */}
            <h1
                style={{
                    position: "absolute",
                    top: 100,
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    fontSize: 80,
                    fontFamily: "sans-serif",
                    color: "#333",
                    opacity: spring({ frame: frame - 200, fps })
                }}
            >
                Automated Render Pipeline
            </h1>

            {/* Connections (Lines) */}
            <Connection
                startX={localPos.x + 80}
                startY={localPos.y}
                endX={githubPos.x - 80}
                endY={githubPos.y}
                progress={line1Progress}
            />
            <Connection
                startX={githubPos.x + 80}
                startY={githubPos.y}
                endX={colabPos.x - 80}
                endY={colabPos.y}
                progress={line2Progress}
            />

            {/* Nodes */}
            <Node
                title="Local PC"
                icon="💻"
                x={localPos.x}
                y={localPos.y}
                progress={localScale}
            />
            <Node
                title="GitHub"
                icon="🐙"
                x={githubPos.x}
                y={githubPos.y}
                progress={githubScale}
            />
            <Node
                title="Colab GPU"
                icon="⚡"
                x={colabPos.x}
                y={colabPos.y}
                progress={colabScale}
            />
        </AbsoluteFill>
    );
};
