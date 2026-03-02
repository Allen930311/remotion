import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const PhoneContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 3D rotation animations
    const rotateY = spring({
        fps,
        frame,
        config: {
            damping: 200,
            stiffness: 100,
            mass: 2, // Heavy mass for grand feel
        },
    });

    // Starts rotated 45 deg, ends at 15 deg
    const mappedRotateY = interpolate(rotateY, [0, 1], [-45, 15]);

    const elevate = spring({
        fps,
        frame,
        config: {
            damping: 20,
            stiffness: 50,
        },
    });

    const translateY = interpolate(elevate, [0, 1], [300, 0]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                perspective: 1500, // Important for 3D effect
            }}
        >
            {/* The Phone Box */}
            <div
                style={{
                    width: 450,
                    height: 900,
                    backgroundColor: '#1e293b',
                    borderRadius: 60,
                    padding: 16,
                    boxShadow: `
						-20px 40px 80px rgba(0,0,0,0.6),
						inset 0 0 10px rgba(255,255,255,0.1),
						inset 2px 2px 5px rgba(255,255,255,0.2)
					`,
                    transform: `translateY(${translateY}px) rotateY(${mappedRotateY}deg) rotateX(10deg)`,
                    transformStyle: 'preserve-3d',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '2px solid #334155',
                }}
            >
                {/* The Screen */}
                <div
                    style={{
                        flex: 1,
                        backgroundColor: '#020617',
                        borderRadius: 44,
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                    }}
                >
                    {/* Screen header / notch area */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 150,
                            height: 30,
                            backgroundColor: '#1e293b',
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            zIndex: 10,
                        }}
                    />
                    {/* Inner children (e.g., UI, Bitcoin, etc.) */}
                    {children}
                </div>
            </div>
        </div>
    );
};
