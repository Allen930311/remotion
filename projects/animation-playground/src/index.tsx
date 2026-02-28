import React from 'react';
import { Series, AbsoluteFill } from 'remotion';
import { D3Test } from './components/D3Test';
import { GSAPTest } from './components/GSAPTest';
import { LottieTestComp } from './components/LottieTest';
import { CanvasTest } from './components/CanvasTest';

export const AnimationPlayground: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
            <Series>
                <Series.Sequence durationInFrames={150}>
                    <D3Test />
                </Series.Sequence>
                <Series.Sequence durationInFrames={150}>
                    <GSAPTest />
                </Series.Sequence>
                <Series.Sequence durationInFrames={150}>
                    <LottieTestComp />
                </Series.Sequence>
                <Series.Sequence durationInFrames={150}>
                    <CanvasTest />
                </Series.Sequence>
            </Series>

            {/* Global Overlay */}
            <div style={{
                position: 'absolute',
                bottom: 40,
                left: 40,
                fontSize: 48,
                fontWeight: 'bold',
                textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                zIndex: 100
            }}>
                Remotion Animation Playground (Safe Mode)
            </div>
        </AbsoluteFill>
    );
};
