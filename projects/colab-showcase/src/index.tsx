import React from "react";
import { AbsoluteFill } from "remotion";
import {
    COMP_NAME,
    DURATION_IN_FRAMES,
    VIDEO_FPS,
    VIDEO_HEIGHT,
    VIDEO_WIDTH,
} from "./constants";
import { Scene1ColabLogo } from "./scenes/Scene1ColabLogo";
import { Scene2Architecture } from "./scenes/Scene2Architecture";
import { Sequence } from "remotion";

export const ColabShowcase: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "white" }}>
            <Sequence from={0} durationInFrames={150}>
                <Scene1ColabLogo />
            </Sequence>
            <Sequence from={150} durationInFrames={450}>
                <Scene2Architecture />
            </Sequence>
        </AbsoluteFill>
    );
};

