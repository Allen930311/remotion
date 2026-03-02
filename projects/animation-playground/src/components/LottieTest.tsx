import React, { useEffect, useState, useCallback } from 'react';
import { useCurrentFrame, AbsoluteFill, continueRender, delayRender, interpolate, Easing } from 'remotion';
import { Lottie, LottieAnimationData } from '@remotion/lottie';

const LOTTIE_URL = "https://assets9.lottiefiles.com/packages/lf20_Z39888.json";

export const LottieTestComp: React.FC = () => {
    const frame = useCurrentFrame();
    const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);
    const [handle] = useState(() => delayRender('Loading Lottie animation...'));

    const fetchAnimation = useCallback(async () => {
        try {
            const response = await fetch(LOTTIE_URL);
            const data = await response.json();
            setAnimationData(data as LottieAnimationData);
            continueRender(handle);
        } catch (err) {
            console.error('Failed to load Lottie animation:', err);
            continueRender(handle);
        }
    }, [handle]);

    useEffect(() => {
        fetchAnimation();
    }, [fetchAnimation]);

    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        }}>
            <h1 style={{
                fontSize: 60,
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                opacity: titleOpacity,
                marginBottom: 20,
            }}>
                Lottie (@remotion/lottie)
            </h1>
            <div style={{ width: 600, height: 600 }}>
                {animationData ? (
                    <Lottie animationData={animationData} />
                ) : (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: 24,
                    }}>
                        Loading animation...
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
