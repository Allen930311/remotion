import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Easing } from 'remotion';
import { BackgroundEffects } from './BackgroundEffects';
import { PhoneContainer } from './PhoneContainer';
import { BitcoinElement } from './BitcoinElement';

const MainAnimation: React.FC = () => {
    const frame = useCurrentFrame();

    // Global fade in
    const opacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.ease),
    });

    // Simple UI elements for the phone screen
    const uiOpacity = interpolate(frame - 60, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ opacity }}>
            <BackgroundEffects />

            <PhoneContainer>
                {/* Phone Screen Background */}
                <AbsoluteFill style={{ backgroundColor: '#020617' }}>

                    {/* Mock App UI */}
                    <div style={{ padding: 40, paddingTop: 100, opacity: uiOpacity, color: 'white', fontFamily: 'sans-serif' }}>
                        <h1 style={{ fontSize: 48, margin: 0, fontWeight: 800, background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Payment Sent
                        </h1>
                        <p style={{ fontSize: 28, color: '#94a3b8', marginTop: 20 }}>
                            To: Satoshi Nakamoto
                        </p>
                        <div style={{ marginTop: 40, height: 2, backgroundColor: '#334155' }} />
                        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', fontSize: 32 }}>
                            <span style={{ color: '#94a3b8' }}>Amount</span>
                            <span style={{ fontWeight: 800 }}>1.5 BTC</span>
                        </div>
                    </div>

                    {/* Bitcoin Element pops out slightly delayed */}
                    <Sequence from={70}>
                        <BitcoinElement />
                    </Sequence>
                </AbsoluteFill>
            </PhoneContainer>
        </AbsoluteFill>
    );
};

export const CryptoPaymentShowcase: React.FC = () => {
    return (
        <React.Fragment>
            <MainAnimation />
        </React.Fragment>
    );
};
