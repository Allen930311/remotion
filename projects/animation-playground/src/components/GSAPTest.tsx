import React, { useLayoutEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { gsap } from 'gsap';

export const GSAPTest: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const boxRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline>();

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true })
            .to(boxRef.current, { x: 800, rotation: 360, duration: 2, ease: "power2.inOut" })
            .to(boxRef.current, { y: 300, scale: 3, duration: 1, ease: "bounce.out" })
            .to(boxRef.current, { opacity: 0, duration: 1 });

        return () => {
            tl.current?.kill();
        };
    }, []);

    useLayoutEffect(() => {
        if (tl.current) {
            tl.current.seek(frame / fps);
        }
    }, [frame, fps]);

    return (
        <AbsoluteFill style={{ padding: 100 }}>
            <h1 style={{ fontSize: 60 }}>GSAP Timeline Integration</h1>
            <div
                ref={boxRef}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#fbbf24',
                    borderRadius: 40,
                    marginTop: 150,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontSize: 40,
                    fontWeight: 'bold'
                }}
            >
                GSAP
            </div>
        </AbsoluteFill>
    );
};
