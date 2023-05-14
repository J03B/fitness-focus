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
import { ADD_EXDATA } from '../utils/mutations';

const StartWorkout = () => {
    let { workoutId } = useParams();
    const [progressPercent, setProgressPercent] = useState(1);
    const [currentExercise, setCurrentExercise] = useState(1);
    const [currentSetNum, setCurrentSetNum] = useState(1)
    const [finishButton, setFinishButton] = useState(false);
    const [onRestBtwnExs, setOnRestBtwnExs] = useState(false);
    const [lastRepAndWt, setLastRepAndWt] = useState([0, 0]);
    const [ addExData ] = useMutation( ADD_EXDATA );

    // Query to get all the current workout
    const { loading, error, data } = useQuery(QUERY_WORKOUTS, {
        variables: { workId: workoutId },
    });
    if (loading) { return <CircularProgress /> }
    if (error) { return <NoMatch /> }
    let workData = data?.workouts || {};

    // Button handling for all previous, next, and finish buttons
    // handler function for when the user clicks the next button
    const handleNextButton = ({ setsInExer, goalReps, goalWeight, reps, weight, comment, exId }) => {
        // Save the data first 
        postExData({ exId: exId, reps: reps, weight: weight, comment: comment });
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
        if (currentSetNum === 1) {
            setCurrentExercise(currentExercise - 1);
            setCurrentSetNum(setsInExer - .5);
        } else {
            setCurrentSetNum(currentSetNum - .5);
        }
        setProgressPercent(Math.min(progressPercent - (50 / workData.totalSetsCount), 100));
        setOnRestBtwnExs(true);
    };

    const handlePreviousButtonOnRest = ( { setsInExer } ) => { 
        if (currentSetNum === .5) {
            // setCurrentExercise(currentExercise - 1);
            setCurrentSetNum(setsInExer);
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

    // TODO - POSSIBLY JUST SUBMIT THE LAST DATA AND GO BACK TO THE HOME PAGE
    const handleFormSubmit = () => {
        // If last workout was just finished, go to the finish workout page
        if (progressPercent >= 100) {
            setFinishButton(true);
            return;
        }
    }

    // Functions to get/post data from/to the user's exercises models
    const getLastComment = (exerData) => {
        const lastIndex = exerData.exDatasCount - 1;
        return exerData.exDatas[lastIndex]?.comment || 'No previous comment';
    }

    const postExData = async ({ exId, reps, weight, comment }) => {
        console.log({ exId, reps, weight, comment, currentSetNum });
        try {
            let unitConfig;
            if (weight) { 
                if (weight === 1) { 
                    unitConfig = 'lb' 
                } else { 
                    unitConfig = "lbs"
                } 
            } else { unitConfig = "bw"};
            const { data } = await addExData({
                variables: {
                    exerciseId: exId,
                    setNum: currentSetNum,
                    reps: parseInt(reps),
                    weight: parseInt(weight), 
                    units: unitConfig,
                    comment: comment
                },
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
        //     setProgFormData({ name: '', description: '', image: 'deadlift.jpg' });
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
        // console.log(exerData);
        if (exerData.exDatasCount) {
            for (let i = 0; i < exerData.exDatasCount; i++) {
                const exData = exerData.exDatas[i];
                prevSetArray.push(exData.setNum);
                prevRepsArray.push(exData.reps);
                prevWeightArray.push(`${exData.weight} ${exData.units}`);
                prevCommentArray.push(exData.comment);
                prevDateArray.push(exData.createdAt);
            }
        } 
        return (
            <>
                {currentExercise !== exerData.position ?
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
                                    handleNextButton={handleNextButton}
                                    handlePrevButton={() => handlePreviousButton({ setsInExer: exerData.numSets })}
                                    showFinishButton={finishButton}
                                    handleFinishButton={handleFormSubmit}
                                    prevComment={() => getLastComment(exerData)}
                                    hidePrevButton={((currentExercise === 1) && (currentSetNum < 2))}
                                    performanceData={exerData}
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
