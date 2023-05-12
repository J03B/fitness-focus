import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import NoMatch from './NoMatch';
import ExerciseHeader from '../components/exerciseComponents/ExerciseHeader';
import ExDataForm from '../components/exerciseComponents/ExDataForm';
import RestingTimer from '../components/exerciseComponents/RestingTimer';
import ViewPrevious from '../components/exerciseComponents/ViewPrevious';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_EXERCISES } from '../utils/queries';

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

    // handler function for when the user clicks the next button
    const handleNextButton = ({ setsInExer, goalReps, goalWeight, reps, weight }) => {
        // Move on to the next exercise (first check set num, then adjust exercise)
        if (currentSetNum < setsInExer) {
            setCurrentSetNum(currentSetNum + 0.5);
        } else {
            setCurrentExercise(currentExercise + 1);
            setCurrentSetNum(0.5);
        }
        // Calculate the percent done for the progress bar
        setProgressPercent(Math.min(progressPercent + (50 / workData.totalSetsCount), 100));        
        setLastRepAndWt([goalReps, goalWeight, reps, weight]);
        setOnRestBtwnExs(true);
    }

    const handlePreviousButton = ( { setsInExer } ) => {
        if (currentSetNum == .5) {
            setCurrentExercise(currentExercise - 1);
            setCurrentSetNum(setsInExer + .5);
        } else {
            setCurrentSetNum(currentSetNum - .5);
        }
        setProgressPercent(Math.min(progressPercent - (50 / workData.totalSetsCount), 100));
        setOnRestBtwnExs(true);
    };

    const handlePreviousButtonOnRest = ( { setsInExer } ) => { 
        if (currentSetNum == .5) {
            setCurrentExercise(currentExercise - 1);
            setCurrentSetNum(setsInExer + .5);
        } else {
            setCurrentSetNum(currentSetNum - .5);
        }        
        setProgressPercent(Math.min(progressPercent - (50 / workData.totalSetsCount), 100));
        setOnRestBtwnExs(false);
    };
    const handleNextButtonOnRest = ( { setsInExer } ) => { 
        if (currentSetNum < setsInExer) {
            setCurrentSetNum(currentSetNum + 0.5);
        } else {
            setCurrentExercise(currentExercise + 1);
            setCurrentSetNum(0.5);
        }
        // Calculate the percent done for the progress bar
        setProgressPercent(Math.min(progressPercent + (50 / workData.totalSetsCount), 100));
        setOnRestBtwnExs(false);
    };

    const getLastComment = (exerData) => {
        const lastIndex = exerData.exDatasCount - 1;
        return exerData.exDatas[lastIndex]?.comment || 'No previous comment';
    }

    // TODO - POSSIBLY JUST SUBMIT THE LAST DATA AND GO BACK TO THE HOME PAGE
    const handleFormSubmit = () => {
        // If last workout was just finished, go to the finish workout page
        if (progressPercent >= 100) {
            setFinishButton(true);
            return;
        }
    }
    
    const QueryContainer = ({ exId }) => {
        useEffect(() => {
            if (progressPercent >= (100 - (100 / workData.totalSetsCount))) {
                setFinishButton(true);
            }
        });
        const prevSetArray=[];
        const prevRepsArray=[];
        const prevWeightArray=[];
        const prevCommentArray=[];
        const prevDateArray=[];
        const { loading: l2, error: e2, data: d2 } = useQuery(QUERY_EXERCISES, {
            variables: { exerId: exId },
        });
        let exerData = d2?.exercise || {};
        if (l2) { return (<CircularProgress />) };
        if (e2) { return (`Error... ${e2.message} |`) };
        console.log(exerData);
        if (exerData.exDatasCount) {
            for (let i = 0; i < exerData.exDatasCount; i++) {
                const exData = exerData.exDatas[i];
                prevSetArray.push(exData.setNum);
                prevRepsArray.push(exData.reps);
                prevWeightArray.push(`${exData.weight} + ${exData.units}`);
                prevCommentArray.push(exData.comment);
                prevDateArray.push(exData.createdAt.toLocaleDateString("en-US"));
            }
        } // TODO - REMOVE THIS BEFORE GO-LIVE - FOR TESTING ONLY
        else {
            prevSetArray.push(1,2,3);
            prevRepsArray.push(18,6,10);
            prevWeightArray.push("100 lbs","160 lbs","145 lbs");
            prevCommentArray.push("Go heavier","Go lighter","Just right");
            prevDateArray.push("5/10/23","5/10/23","5/10/23");
        }
        return (
            <>
                {currentExercise != exerData.position ?
                    <Box sx={{ display: 'none' }} /> :

                    <Box>
                        {onRestBtwnExs ?
                            <RestingTimer
                                handlePrevious={() => handlePreviousButtonOnRest({ setsInExer: exerData.numSets })}
                                handleNext={() => handleNextButtonOnRest({ setsInExer: exerData.numSets })}
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
                                <ViewPrevious 
                                    prevSetArray={prevSetArray}
                                    prevRepsArray={prevRepsArray}
                                    prevWeightArray={prevWeightArray}
                                    prevCommentArray={prevCommentArray}
                                    prevDateArray={prevDateArray}
                                />

                                {/* Form to enter the current exercise's ExData and move between exercises*/}

                                <ExDataForm
                                    handleNextButton={() => handleNextButton({ setsInExer: exerData.numSets, goalReps: exerData.goalReps, goalWeight: exerData.goalWeight, reps: exerData.reps, weight: exerData.weight })}
                                    handlePrevButton={() => handlePreviousButton({ setsInExer: exerData.numSets })}
                                    showFinishButton={finishButton}
                                    handleFinishButton={handleFormSubmit}
                                    prevComment={() => getLastComment(exerData)}
                                    goalReps={exerData.goalReps}
                                    goalWeight={exerData.goalWeight}
                                    goalUnits={exerData.goalUnits}
                                    hidePrevButton={((currentExercise == 1) && (currentSetNum < 2))}
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
