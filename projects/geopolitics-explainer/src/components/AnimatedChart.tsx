import React from "react";
import { evolvePath } from "@remotion/paths";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { FONT_FAMILY, FONT_MONO } from "../fonts";
import { THEME } from "../theme";

export const AnimatedChart: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const W = 480;
    const H = 320;
    const padL = 50;
    const padB = 40;
    const padT = 20;
    const padR = 20;

    // Data points (oil price in $)
    const data = [65, 68, 66, 70, 72, 69, 74, 82];
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Now"];
    const maxVal = 90;
    const minVal = 60;

    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    // Build path from data
    const points = data.map((v, i) => {
        const x = padL + (i / (data.length - 1)) * chartW;
        const y = padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
        return { x, y };
    });

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

    // Gradient fill path (closed polygon under the line)
    const fillD = `${pathD} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;

    const progress = interpolate(frame - delay, [0, 2 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
    });

    const evolved = evolvePath(progress, pathD);

    // Y-axis grid lines
    const yTicks = [60, 70, 80, 90];

    return (
        <div style={{
            background: THEME.bgCard,
            border: `1px solid ${THEME.bgCardBorder}`,
            borderRadius: 16,
            padding: 20,
        }}>
            <div style={{
                fontFamily: FONT_FAMILY, fontSize: 22,
                color: THEME.textMuted, marginBottom: 8, fontWeight: 700,
            }}>📊 布蘭特原油走勢 ($/桶)</div>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
                <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={THEME.red} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={THEME.red} stopOpacity={0.02} />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {yTicks.map((tick) => {
                    const y = padT + chartH - ((tick - minVal) / (maxVal - minVal)) * chartH;
                    return (
                        <g key={tick}>
                            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
                            <text x={padL - 8} y={y + 5} fill={THEME.textMuted} fontSize={14} fontFamily="JetBrains Mono" textAnchor="end">{tick}</text>
                        </g>
                    );
                })}

                {/* X-axis labels */}
                {labels.map((label, i) => {
                    const x = padL + (i / (labels.length - 1)) * chartW;
                    return (
                        <text key={i} x={x} y={H - 8} fill={THEME.textMuted} fontSize={14} fontFamily="JetBrains Mono" textAnchor="middle">{label}</text>
                    );
                })}

                {/* Gradient fill under curve */}
                <path d={fillD} fill="url(#chartFill)" opacity={progress} />

                {/* Animated line */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={THEME.red}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray={evolved.strokeDasharray}
                    strokeDashoffset={evolved.strokeDashoffset}
                />

                {/* Data point dots */}
                {points.map((p, i) => {
                    const dotProgress = interpolate(frame - delay, [i * 6, i * 6 + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    return (
                        <circle key={i} cx={p.x} cy={p.y} r={dotProgress * 5}
                            fill={i === points.length - 1 ? THEME.gold : THEME.red}
                            stroke={THEME.bg} strokeWidth={2}
                        />
                    );
                })}

                {/* Last value label */}
                {progress > 0.8 && (
                    <foreignObject x={points[points.length - 1].x - 60} y={points[points.length - 1].y - 50} width={120} height={36}>
                        <div style={{
                            fontFamily: FONT_MONO, fontSize: 20, fontWeight: "bold",
                            color: THEME.gold,
                            backgroundColor: "rgba(10,10,26,0.8)",
                            padding: "4px 12px", borderRadius: 8,
                            textAlign: "center",
                            border: `1px solid ${THEME.gold}44`,
                            opacity: interpolate(progress, [0.8, 1], [0, 1], { extrapolateRight: "clamp" }),
                        }}>$82.3 🔺</div>
                    </foreignObject>
                )}
            </svg>
        </div>
    );
};
