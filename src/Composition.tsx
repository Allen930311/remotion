import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";


export const MyComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 100,
            }}
        >
            <div style={{ opacity }}>Hello Remotion!</div>
        </AbsoluteFill>
    );
};
