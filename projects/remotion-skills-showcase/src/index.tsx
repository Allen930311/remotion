import React from "react";
import { AbsoluteFill, Sequence } from "remotion";

import { ANIMATION_TIMING, COLOR_PALETTE } from "./constants";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Skills } from "./scenes/Scene2Skills";
import { Scene3Organization } from "./scenes/Scene3Organization";
import { Scene4Showcase } from "./scenes/Scene4Showcase";
import { Scene5Outro } from "./scenes/Scene5Outro";

export const RemotionSkillsShowcase: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_PALETTE.background }}>
            <Sequence from={ANIMATION_TIMING.intro.start} durationInFrames={ANIMATION_TIMING.intro.duration}>
                <Scene1Intro />
            </Sequence>
            <Sequence from={ANIMATION_TIMING.skills.start} durationInFrames={ANIMATION_TIMING.skills.duration}>
                <Scene2Skills />
            </Sequence>
            <Sequence from={ANIMATION_TIMING.organization.start} durationInFrames={ANIMATION_TIMING.organization.duration}>
                <Scene3Organization />
            </Sequence>
            <Sequence from={ANIMATION_TIMING.showcase.start} durationInFrames={ANIMATION_TIMING.showcase.duration}>
                <Scene4Showcase />
            </Sequence>
            <Sequence from={ANIMATION_TIMING.outro.start} durationInFrames={ANIMATION_TIMING.outro.duration}>
                <Scene5Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
