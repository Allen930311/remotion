import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
// 新增引入
import { AutoSkillIntro } from "../projects/auto-skill-intro/src/index";
import { RemotionSkillsShowcase } from "../projects/remotion-skills-showcase/src/index";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="MyComp"
                component={MyComposition}
                durationInFrames={150}
                fps={30}
                width={1920}
                height={1080}
            />
            {/* 註冊新專案影片 */}
            <Composition
                id="AutoSkillIntro"
                component={AutoSkillIntro}
                durationInFrames={1800} // 60s @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="SkillsShowcase"
                component={RemotionSkillsShowcase}
                durationInFrames={900} // 30s @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
