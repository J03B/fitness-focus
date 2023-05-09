import React, { useState, useEffect } from 'react';
import {
    Col,
    Form,
    Button,
    Card,
    Row,
    ProgressBar
} from 'react-bootstrap';

import {Container} from '@mui/material'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Workout = (props) => {
    // Global defined variables
    let totalSets = 0;
    for (let i = 0; i < props.exercisesCount - 1; i++) {
        const exercise = props.exercise[i];

    }

    const [progressPercent, setProgressPercent] = useState(0);
    const [currentWorkout, setCurrentWorkout] = useState(props.exercises[0]);
    const [finishButton, setFinishButton] = useState(false);
    const [onRestBtwnExs, setOnRestBtwnExs] = useState(false);


    const handleNextButton = () => {
        // If last workout was just finished, go to the finish workout page

        // Calculate the percent done for the progress bar
        const percentDone = currentWorkout.position/props.exercisesCount;
        setProgressPercent(percentDone);
        if (percentDone) {
            setFinishButton(true);
        }


    }


    return (
        <>
            {/* Show progress bar at the top */}
            <ProgressBar animated now={progressPercent} />

            {/* Exercise Header for the current workout */}

            {/* Show the workout photo and details */}

            {/* Icon to bring forward the past data for the same workout */}

            {/* Form to enter the current exercise's ExData */}

            {/* Buttons to go to the previous and next parts of the workout */}

            {/* Progress Bar to show how much time is left */}
        </>
    );
};

export default Workout;