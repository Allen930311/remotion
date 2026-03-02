import React, { useMemo } from 'react';
import {
    useCurrentFrame,
    interpolate,
    Easing,
    AbsoluteFill,
    spring,
    useVideoConfig,
} from 'remotion';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/**
 * FramerMotionTest — Framer Motion + Remotion hybrid demo.
 *
 * Strategy: Use Remotion's `useCurrentFrame()` + `interpolate()` to drive
 * `MotionValue`s, so Framer Motion handles the rendering while Remotion
 * controls the timeline (frame-accurate, deterministic).
 */

const CARD_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'];
const CARD_LABELS = ['Layout', 'Gesture', 'Variant', 'Spring'];

export const FramerMotionTest: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Title fade-in ---
    const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });
    const titleY = interpolate(frame, [0, 20], [-40, 0], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // --- Subtitle ---
    const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // --- Card stagger + spring entrance ---
    const cards = useMemo(() => {
        return CARD_COLORS.map((color, i) => {
            const delay = 25 + i * 12;

            const scale = spring({
                frame: frame - delay,
                fps,
                config: { damping: 12, stiffness: 120, mass: 0.8 },
            });

            const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            });

            const rotate = interpolate(
                frame,
                [delay, delay + 30],
                [-15, 0],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.back(1.5)),
                }
            );

            return { color, scale, cardOpacity, rotate, label: CARD_LABELS[i] };
        });
    }, [frame, fps]);

    // --- Orbit ring rotation ---
    const ringRotation = interpolate(frame, [0, 150], [0, 360], {
        extrapolateRight: 'clamp',
    });

    // --- Pulse glow keyframe ---
    const glowScale = interpolate(
        frame,
        [60, 80, 100, 120, 140],
        [1, 1.15, 1, 1.1, 1],
        { extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Decorative orbit ring */}
            <div
                style={{
                    position: 'absolute',
                    width: 700,
                    height: 700,
                    border: '2px solid rgba(255,255,255,0.08)',
                    borderRadius: '50%',
                    transform: `rotate(${ringRotation}deg)`,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    transform: `rotate(${-ringRotation * 0.6}deg)`,
                }}
            />

            {/* Title */}
            <h1
                style={{
                    fontSize: 72,
                    fontWeight: 900,
                    fontFamily: 'Inter, sans-serif',
                    background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    marginBottom: 8,
                    letterSpacing: -2,
                }}
            >
                Framer Motion
            </h1>

            {/* Subtitle */}
            <p
                style={{
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'Inter, sans-serif',
                    opacity: subtitleOpacity,
                    marginBottom: 60,
                    letterSpacing: 2,
                }}
            >
                Production-Ready React Animation Library
            </p>

            {/* Cards row */}
            <div
                style={{
                    display: 'flex',
                    gap: 32,
                    transform: `scale(${glowScale})`,
                }}
            >
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: 200,
                            height: 260,
                            borderRadius: 24,
                            background: `linear-gradient(160deg, ${card.color}, ${card.color}88)`,
                            boxShadow: `0 20px 60px ${card.color}44`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: card.cardOpacity,
                            transform: `scale(${card.scale}) rotate(${card.rotate}deg)`,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                    >
                        <span
                            style={{
                                fontSize: 48,
                                marginBottom: 16,
                            }}
                        >
                            {['⬡', '✋', '◆', '🌀'][i]}
                        </span>
                        <span
                            style={{
                                fontSize: 22,
                                fontWeight: 700,
                                color: 'white',
                                fontFamily: 'Inter, sans-serif',
                                letterSpacing: 1,
                            }}
                        >
                            {card.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Badge */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 60,
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.35)',
                    fontFamily: 'monospace',
                    opacity: interpolate(frame, [80, 100], [0, 1], {
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                framer-motion v12 · Driven by useCurrentFrame()
            </div>
        </AbsoluteFill>
    );
};
