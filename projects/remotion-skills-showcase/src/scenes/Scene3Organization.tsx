import React from "react";
import { spring, useCurrentFrame, interpolate, AbsoluteFill, Series } from "remotion";
import { COLOR_PALETTE, FPS } from "../constants";

const TimelineBlock: React.FC<{ label: string; color: string; progress: number }> = ({ label, color, progress }) => (
    <div
        style={{
            flex: 1,
            height: 120,
            backgroundColor: COLOR_PALETTE.card,
            borderRadius: 16,
            margin: "0 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: `2px solid ${color}`,
            transform: `translateY(${(1 - progress) * 50}px)`,
            opacity: progress,
        }}
    >
        <div style={{ color, fontSize: 32, fontWeight: "bold", fontFamily: "sans-serif" }}>{label}</div>
        <div style={{ color: COLOR_PALETTE.textMuted, fontSize: 18, marginTop: 8 }}>{Math.round(progress * 100)}%</div>
    </div>
);

export const Scene3Organization: React.FC = () => {
    const frame = useCurrentFrame();

    const progress = (delay: number) =>
        spring({
            frame: frame - delay,
            fps: FPS,
            config: { stiffness: 60 },
        });

    return (
        <AbsoluteFill style={{ padding: 80, justifyContent: "center", alignItems: "center" }}>
            <h2 style={{ color: COLOR_PALETTE.primary, fontSize: 56, marginBottom: 80, fontFamily: "sans-serif" }}>
                Series & Sequence
            </h2>
            <div style={{ display: "flex", width: "100%", maxWidth: 1200 }}>
                <TimelineBlock label="Scene A" color={COLOR_PALETTE.primary} progress={progress(0)} />
                <div style={{ alignSelf: "center", color: COLOR_PALETTE.text, fontSize: 48, margin: "0 20px" }}>→</div>
                <TimelineBlock label="Scene B" color={COLOR_PALETTE.secondary} progress={progress(30)} />
                <div style={{ alignSelf: "center", color: COLOR_PALETTE.text, fontSize: 48, margin: "0 20px" }}>→</div>
                <TimelineBlock label="Scene C" color={COLOR_PALETTE.accent} progress={progress(60)} />
            </div>
            <div
                style={{
                    marginTop: 60,
                    color: COLOR_PALETTE.text,
                    fontSize: 28,
                    textAlign: "center",
                    maxWidth: 800,
                    fontFamily: "sans-serif",
                    lineHeight: 1.6,
                }}
            >
                Automatic timing management.<br />
                No more manual frame counting!
            </div>
        </AbsoluteFill>
    );
};
