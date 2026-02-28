import React from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import { Lottie } from '@remotion/lottie';

const LOTTIE_URL = "https://assets9.lottiefiles.com/packages/lf20_Z39888.json";

export const LottieTestComp: React.FC = () => {
    return (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: 60 }}>Lottie (@remotion/lottie)</h1>
            <div style={{ width: 800, height: 800 }}>
                <Lottie src={LOTTIE_URL} />
            </div>
        </AbsoluteFill>
    );
};
