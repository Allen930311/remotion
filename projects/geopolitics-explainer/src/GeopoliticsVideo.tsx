import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Market } from "./scenes/Scene2Market";
import { Scene3Strategy } from "./scenes/Scene3Strategy";
import { Scene4Conclusion } from "./scenes/Scene4Conclusion";

export const GeopoliticsVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#FAF8F5" }}>
            <Series>
                {/* Hook: 0 - 10s (300 frames) */}
                <Series.Sequence durationInFrames={300}>
                    <Scene1Hook />
                </Series.Sequence>

                {/* Market: 10s - 30s (600 frames + 30 overlap) */}
                <Series.Sequence durationInFrames={600} offset={-30}>
                    <Scene2Market />
                </Series.Sequence>

                {/* Strategy: 30s - 50s (600 frames + 30 overlap) */}
                <Series.Sequence durationInFrames={600} offset={-30}>
                    <Scene3Strategy />
                </Series.Sequence>

                {/* Conclusion: 50s - 60s (300 frames + 30 overlap) */}
                <Series.Sequence durationInFrames={300} offset={-30}>
                    <Scene4Conclusion />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
