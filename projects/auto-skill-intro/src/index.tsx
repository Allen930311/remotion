import React from "react";
import { AbsoluteFill, Sequence } from "remotion";

import { ANIMATION_TIMING } from "./constants";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { Scene4Evolution } from "./scenes/Scene4Evolution";
import { Scene5Outro } from "./scenes/Scene5Outro";

export const AutoSkillIntro: React.FC = () => {
    const { scenes } = ANIMATION_TIMING;

    return (
        <AbsoluteFill style={{ backgroundColor: "#0F172A" }}>
            <Sequence from={scenes.intro.start} durationInFrames={scenes.intro.duration}>
                <Scene1Intro />
            </Sequence>
            <Sequence from={scenes.problem.start} durationInFrames={scenes.problem.duration}>
                <Scene2Problem />
            </Sequence>
            <Sequence from={scenes.solution.start} durationInFrames={scenes.solution.duration}>
                <Scene3Solution />
            </Sequence>
            <Sequence from={scenes.evolution.start} durationInFrames={scenes.evolution.duration}>
                <Scene4Evolution />
            </Sequence>
            <Sequence from={scenes.outro.start} durationInFrames={scenes.outro.duration}>
                <Scene5Outro />
            </Sequence>
        </AbsoluteFill>
    );
};
