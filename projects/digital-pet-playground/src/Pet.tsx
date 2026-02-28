import React, { useEffect } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';

interface PetProps {
    mouseX: number;
    mouseY: number;
    isDizzy: boolean;
    isSleeping: boolean;
}

const Pet: React.FC<PetProps> = ({ mouseX, mouseY, isDizzy, isSleeping }) => {
    // Using a sample Rive file. In a real project, this would be a local .riv file.
    const { rive, RiveComponent } = useRive({
        src: 'https://cdn.rive.app/animations/vehicles.riv', // Placeholder URL
        stateMachines: 'bumpy', // Change this to your state machine name
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center,
        }),
    });

    // Example inputs (adjust based on your actual Rive state machine)
    const xAxisInput = useStateMachineInput(rive, 'bumpy', 'xAxis');
    const yAxisInput = useStateMachineInput(rive, 'bumpy', 'yAxis');
    const dizzyInput = useStateMachineInput(rive, 'bumpy', 'isDizzy');
    const sleepInput = useStateMachineInput(rive, 'bumpy', 'isSleeping');

    useEffect(() => {
        if (xAxisInput) xAxisInput.value = (mouseX / window.innerWidth) * 100;
        if (yAxisInput) yAxisInput.value = (mouseY / window.innerHeight) * 100;
    }, [mouseX, mouseY, xAxisInput, yAxisInput]);

    useEffect(() => {
        if (dizzyInput) dizzyInput.value = isDizzy;
    }, [isDizzy, dizzyInput]);

    useEffect(() => {
        if (sleepInput) sleepInput.value = isSleeping;
    }, [isSleeping, sleepInput]);

    return (
        <div className="pet-container">
            <RiveComponent />
        </div>
    );
};

export default Pet;
