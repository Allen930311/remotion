import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig, AbsoluteFill } from 'remotion';
import * as d3 from 'd3';

export const D3Test: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const data = useMemo(() => [40, 80, 150, 100, 200, 120, 180, 250, 140, 220], []);

    const margin = { top: 150, right: 100, bottom: 150, left: 100 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, chartWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data) || 0])
        .range([chartHeight, 0]);

    const progress = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.exp)
    });

    return (
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ marginBottom: 20, fontSize: 60 }}>D3.js Data Driven Chart</h1>
            <svg width={width} height={height} style={{ overflow: 'visible' }}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {data.map((d, i) => {
                        const h = (chartHeight - yScale(d)) * progress;
                        return (
                            <rect
                                key={i}
                                x={xScale(i.toString())}
                                y={chartHeight - h}
                                width={xScale.bandwidth()}
                                height={h}
                                fill={`hsl(${i * 36}, 70%, 50%)`}
                                rx={10}
                            />
                        );
                    })}
                </g>
            </svg>
        </AbsoluteFill>
    );
};
