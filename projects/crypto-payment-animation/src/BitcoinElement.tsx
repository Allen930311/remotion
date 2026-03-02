import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const BitcoinElement: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        fps,
        frame,
        config: {
            damping: 10,
            stiffness: 100,
            mass: 1.5,
        },
    });

    const rotate = spring({
        fps,
        frame,
        config: {
            damping: 20,
            stiffness: 80,
            mass: 2,
        },
    });

    const rotateValue = rotate * 360; // Spin once

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <div
                style={{
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 20px 50px rgba(245, 158, 11, 0.5), inset 0 5px 15px rgba(255, 255, 255, 0.4)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: `scale(${scale}) rotateY(${rotateValue}deg) translateY(-80px)`,
                    position: 'relative',
                    zIndex: 20
                }}
            >
                {/* Inner circle */}
                <div
                    style={{
                        width: 210,
                        height: 210,
                        borderRadius: '50%',
                        border: '8px solid rgba(255, 255, 255, 0.6)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <span
                        style={{
                            fontSize: 140,
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'sans-serif',
                        }}
                    >
                        ₿
                    </span>
                </div>
            </div>
        </div>
    );
};
