import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const BackgroundEffects: React.FC = () => {
    const frame = useCurrentFrame();

    // Line animation
    const dashOffset = (frame * 15) % 1000;

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', overflow: 'hidden' }}>
            {/* Grid Lines */}
            <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.3 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 100}
                        x2="100%"
                        y2={i * 100}
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="100 200"
                        strokeDashoffset={dashOffset + i * 50}
                    />
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                    <line
                        key={`v-${i}`}
                        x1={i * 100}
                        y1="0"
                        x2={i * 100}
                        y2="100%"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="100 200"
                        strokeDashoffset={-dashOffset + i * 50}
                    />
                ))}
            </svg>

            {/* Glowing Orb in Center */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    height: 800,
                    background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(15,23,42,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />
        </AbsoluteFill>
    );
};
