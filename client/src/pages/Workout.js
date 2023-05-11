import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TimelineIcon from '@mui/icons-material/Timeline';
import Stack from '@mui/material/Stack';

import NoMatch from './NoMatch';
import ExerciseHeader from '../components/exerciseComponents/ExerciseHeader';
import ExDataForm from '../components/exerciseComponents/ExDataForm';
import RestingTimer from '../components/exerciseComponents/RestingTimer';

import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_EXERCISES } from '../utils/queries';
import { Container } from '@mui/material';

const StartWorkout = () => {
    let { workoutId } = useParams();
    const [progressPercent, setProgressPercent] = useState(1);
    const [currentExercise, setCurrentExercise] = useState(1);
    const [currentSetNum, setCurrentSetNum] = useState(1)
    const [finishButton, setFinishButton] = useState(false);
    const [onRestBtwnExs, setOnRestBtwnExs] = useState(false);
    const [lastRepAndWt, setLastRepAndWt] = useState([0, 0]);

    // Query to get all the current workout
    const { loading, error, data } = useQuery(QUERY_WORKOUTS, {
        variables: { workId: workoutId },
    });
    if (loading) { return <CircularProgress /> }
    if (error) { return <NoMatch /> }
    let workData = data?.workouts || {};
    console.log(workData);

    // handler function for when the user clicks the previous button
    const viewPreviousData = () => { };

    // handler function for when the user clicks the next button
    const handleNextButton = ({ setsInExer, goalReps, goalWeight, reps, weight }) => {
        // Move on to the next exercise (first check set num, then adjust exercise)
        if (currentSetNum < setsInExer) {
            setCurrentSetNum(currentSetNum + 1);
        } else {
            setCurrentExercise(currentExercise + 1);
            setCurrentSetNum(1);
        }
        // Calculate the percent done for the progress bar
        setProgressPercent(Math.min(progressPercent + (100 / workData.totalSetsCount) - 1, 100));
        if (progressPercent > 99.9) {
            setFinishButton(true);
        }
        setLastRepAndWt([goalReps, goalWeight, reps, weight])
        setOnRestBtwnExs(true);
    }

    const handlePreviousButton = () => { 
        setCurrentSetNum(currentSetNum - 1);
        setOnRestBtwnExs(true);
    };

    const handlePreviousButtonOnRest = () => { 
        setOnRestBtwnExs(false);
    };
    const handleNextButtonOnRest = () => { 
        setOnRestBtwnExs(false);
    };

    const getLastComment = (exerData) => {
        const lastIndex = exerData.exDatasCount - 1;
        return exerData.exDatas[lastIndex]?.comment || 'No previous comment';
    }

    const handleFormSubmit = () => {
        // If last workout was just finished, go to the finish workout page
        if (progressPercent >= 100) {
            setFinishButton(true);
            return;
        }
    }

    const QueryContainer = ({ exId }) => {
        const { loading: l2, error: e2, data: d2 } = useQuery(QUERY_EXERCISES, {
            variables: { exerId: exId },
        });
        let exerData = d2?.exercise || {};
        if (l2) { return (<CircularProgress />) };
        if (e2) { return (`Error... ${e2.message} |`) };
        console.log(exerData);
        return (
            <>
                {currentExercise != exerData.position ?
                    <Box sx={{ display: 'none' }} /> :

                    <Box>
                        {onRestBtwnExs ?
                            <RestingTimer
                                handlePrevious={() => handlePreviousButtonOnRest()}
                                handleNext={() => handleNextButtonOnRest()}
                                restTime={exerData.secBtwnSets}
                                goalReps={lastRepAndWt[0]}
                                goalWeight={lastRepAndWt[1]}
                                reps={lastRepAndWt[2]}
                                weight={lastRepAndWt[3]}
                            /> :
                            <Box>
                                {/* Exercise Header for the current workout */}
                                <ExerciseHeader
                                    exName={exerData.name}
                                    exImage={exerData.image}
                                    exDescription={exerData.description}
                                />

                                {/* Icon to bring forward the past data for the same workout */}
                                <TimelineIcon onClick={() => viewPreviousData(exerData)} />

                                {/* Form to enter the current exercise's ExData and move between exercises*/}

                                <ExDataForm
                                    handleNextButton={() => handleNextButton({ setsInExer: exerData.numSets, goalReps: exerData.goalReps, goalWeight: exerData.goalWeight, reps: exerData.reps, weight: exerData.weight })}
                                    handlePrevButton={() => handlePreviousButton()}
                                    showFinishButton={finishButton}
                                    handleFinishButton={handleFormSubmit}
                                    prevComment={() => getLastComment(exerData)}
                                    goalReps={exerData.goalReps}
                                    goalWeight={exerData.goalWeight}
                                    goalUnits={exerData.goalUnits}
                                />
                            </Box>
                        }

                    </ Box>}
            </>
        );
    }

    return (
        <>
            {/* Show progress bar at the top */}
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progressPercent} />
            </Box>

            <Stack
                textAlign="center"
                width={'70%'}
                marginLeft="auto"
                marginRight={'auto'}
                marginTop={4}
            >

                {workData.exercises.map((exId) => {
                    return (
                        <Stack
                            key={exId._id}
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <QueryContainer exId={exId._id} />
                        </Stack>
                    );
                })}
            </Stack>
        </>
    );
};

export default StartWorkout;
