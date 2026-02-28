import React, { useRef, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

export const CanvasTest: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        const particleCount = 200;
        const speed = 3;

        ctx.fillStyle = '#60a5fa';
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = (frame % 150) * speed;
            const x = width / 2 + Math.cos(angle) * distance;
            const y = height / 2 + Math.sin(angle) * distance;

            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.font = 'bold 60px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`Canvas Particle Frame: ${frame}`, width / 2, height / 2);

    }, [frame, width, height]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ color: 'white', position: 'absolute', top: 100, fontSize: 60 }}>Vanilla Canvas 2D Particles</h1>
            <canvas ref={canvasRef} width={width} height={height} style={{ width: '100%', height: '100%' }} />
        </AbsoluteFill>
    );
};
