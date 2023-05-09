import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material'
import Stack from '@mui/material/Stack';
import TimelineIcon from '@mui/icons-material/Timeline';

import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import NoMatch from "./NoMatch";

import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS, QUERY_EXERCISES } from "../utils/queries";

const StartWorkout = () => {
    let { workoutId } = useParams();
    const [progressPercent, setProgressPercent] = useState(0);
    const [currentExercise, setCurrentExercise] = useState({});
    const [finishButton, setFinishButton] = useState(false);
    const [onRestBtwnExs, setOnRestBtwnExs] = useState(false);

    const { loading, error, data } = useQuery(QUERY_WORKOUTS, {
        variables: { workId: workoutId },
    });

    if (error) { return (<NoMatch />) };
    if (loading) { return (<CircularProgress />) };
    
    let workData = data?.workouts || {};

    // Global defined variables
    let totalSets = 0;
    for (let i = 0; i < workData.exercisesCount - 1; i++) {
        const exercise = workData.exercise[i];
    }

    const handleNextButton = () => {
        // If last workout was just finished, go to the finish workout page

        // Calculate the percent done for the progress bar
        const percentDone = currentExercise.position / workData.exercisesCount;
        setProgressPercent(percentDone);
        if (percentDone) {
            setFinishButton(true);
        }
    }

    const ExerciseHeader = (exerId) => {
        const { loading: l2, error: e2, data: d2 } = useQuery(QUERY_EXERCISES, {
            variables: { exerId: exerId },
        });
        let exerData = d2?.exercises || {};
        if (l2) { return (<CircularProgress />) };
        if (e2) { return 'ERROR...' };

        return (
            <>
                <Stack spacing={1}>
                    <Typography variant='h5'>
                        {exerData.name}
                    </Typography>
                    <Avatar sx={{ width: "85%", height: "85%", maxWidth: 400, maxHeight: 400 }} src={`/images/${exerData.image}`} />
                    <Typography variant='subtitle1'>
                        {exerData.description}
                    </Typography>
                </Stack>
            </>
        );
    }

    const PreviousData = (exercise) => {

    }

    return (
        <>
            {/* Show progress bar at the top */}
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progressPercent} />
            </Box>

            {/* Exercise Header for the current workout */}
            <ExerciseHeader exerId={currentExercise.id} />

            {/* Icon to bring forward the past data for the same workout */}
            <TimelineIcon onClick={() => PreviousData(currentExercise)}/>

            {/* Form to enter the current exercise's ExData */}

            {/* Buttons to go to the previous and next parts of the workout */}

            {/* Progress Bar to show how much time is left */}
        </>
    );
};

export default StartWorkout;