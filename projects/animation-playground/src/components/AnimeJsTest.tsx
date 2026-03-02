import React, { useRef, useLayoutEffect } from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate, Easing } from 'remotion';
import { createTimeline, stagger, utils } from 'animejs';

/**
 * AnimeJsTest — Anime.js v4 + Remotion hybrid demo.
 *
 * Strategy: Create an anime.js timeline (autoplay: false), then seek to the
 * Remotion-driven timestamp on each frame. Same pattern as the GSAP demo.
 *
 * Anime.js v4 API:
 *   - createTimeline({ autoplay: false, defaults: {...} })
 *   - tl.add(targets, { ...props }, timeOffset)
 *   - tl.seek(timeMs)
 */

const DOT_COUNT = 12;
const DOT_COLORS = [
    '#f43f5e', '#fb923c', '#facc15', '#4ade80',
    '#22d3ee', '#818cf8', '#e879f9', '#f43f5e',
    '#fb923c', '#facc15', '#4ade80', '#22d3ee',
];

export const AnimeJsTest: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const dotsRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);

    // --- Build anime.js v4 timeline once ---
    useLayoutEffect(() => {
        if (!dotsRef.current || !textRef.current) return;

        const dots = dotsRef.current.querySelectorAll('.anime-dot');
        const textEl = textRef.current;

        const tl = createTimeline({
            autoplay: false,
            defaults: {
                ease: 'outExpo',
                duration: 800,
            },
        });

        // Phase 1: dots spiral-in (0ms)
        tl.add(dots, {
            translateX: [utils.random(-600, 600), 0],
            translateY: [utils.random(-400, 400), 0],
            scale: [0, 1],
            opacity: [0, 1],
            delay: stagger(80),
            ease: 'outBack',
        }, 0);

        // Phase 2: dots orbit in circle (1200ms)
        // Pre-compute orbit positions to avoid function callback type issues in v4
        dots.forEach((dot, i) => {
            const targetX = Math.cos((i / DOT_COUNT) * Math.PI * 2) * 250;
            const targetY = Math.sin((i / DOT_COUNT) * Math.PI * 2) * 250;
            tl.add(dot, {
                translateX: targetX,
                translateY: targetY,
                scale: 1.3,
                duration: 1200,
                ease: 'inOutQuad',
            }, 1200);
        });

        // Phase 3: text fade-in (2000ms)
        tl.add(textEl, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
        }, 2000);

        // Phase 4: dots pulse (2800ms)
        tl.add(dots, {
            scale: [1.3, 1.6, 1],
            duration: 800,
            delay: stagger(50),
            ease: 'inOutSine',
        }, 2800);

        timelineRef.current = tl;

        return () => {
            tl.pause();
        };
    }, []);

    // --- Seek timeline to current frame ---
    useLayoutEffect(() => {
        if (timelineRef.current) {
            const timeMs = (frame / fps) * 1000;
            timelineRef.current.seek(timeMs);
        }
    }, [frame, fps]);

    // --- Title entrance (pure Remotion) ---
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });
    const titleY = interpolate(frame, [0, 20], [-50, 0], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0c0a1a 0%, #1a1145 50%, #0d1b2a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                fontFamily: 'Inter, sans-serif',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            {/* Title */}
            <h1
                style={{
                    fontSize: 72,
                    fontWeight: 900,
                    color: 'white',
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    marginBottom: 80,
                    letterSpacing: -2,
                    textShadow: '0 0 40px rgba(139,92,246,0.5)',
                    zIndex: 10,
                }}
            >
                Anime.js
            </h1>

            {/* Dots container */}
            <div
                ref={dotsRef}
                style={{
                    position: 'relative',
                    width: 600,
                    height: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {Array.from({ length: DOT_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className="anime-dot"
                        style={{
                            position: 'absolute',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: `radial-gradient(circle at 30% 30%, ${DOT_COLORS[i]}, ${DOT_COLORS[i]}88)`,
                            boxShadow: `0 0 20px ${DOT_COLORS[i]}66`,
                        }}
                    />
                ))}

                {/* Center text — controlled by anime.js */}
                <div
                    ref={textRef}
                    style={{
                        position: 'absolute',
                        fontSize: 26,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.7)',
                        opacity: 0,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                    }}
                >
                    Stagger · Timeline · Seek
                </div>
            </div>

            {/* Badge */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 60,
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: 'monospace',
                    opacity: interpolate(frame, [100, 120], [0, 1], {
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                animejs v4 · Paused Timeline + seek(frame / fps)
            </div>
        </AbsoluteFill>
    );
};
