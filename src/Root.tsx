import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
// 新增引入
import { AutoSkillIntro } from "../projects/auto-skill-intro/src/index";
import { RemotionSkillsShowcase } from "../projects/remotion-skills-showcase/src/index";
import { AnimationPlayground } from "../projects/animation-playground/src/index";
import { ColabShowcase } from "../projects/colab-showcase/src/index";
import { CryptoPaymentShowcase } from "../projects/crypto-payment-animation/src/index";
import { GeopoliticsVideo } from "../projects/geopolitics-explainer/src/index";

export const RemotionRoot: React.FC = () => {
    return (
        <React.Fragment>

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
                id="ColabShowcase"
                component={ColabShowcase}
                durationInFrames={600} // 20s @ 30fps
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
            <Composition
                id="AnimationPlayground"
                component={AnimationPlayground}
                durationInFrames={900} // 30s @ 30fps (6 scenes * 150 frames)
                fps={30}
                width={1920}
                height={1080}
            />
            {/* 註冊新專案影片 */}
            <Composition
                id="CryptoPaymentAnimation"
                component={CryptoPaymentShowcase}
                durationInFrames={300} // 10s @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />
            {/* 新增地緣政治解說專案 */}
            <Composition
                id="GeopoliticsExplainer"
                component={GeopoliticsVideo}
                durationInFrames={1800} // 60s @ 30fps
                fps={30}
                width={1080} // Vertical layout
                height={1920}
            />

        </React.Fragment>
    );
};
