import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TimelineIcon from '@mui/icons-material/Timeline';
import Stack from '@mui/material/Stack';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import NoMatch from './NoMatch';
import ExerciseHeader from '../components/exerciseComponents/ExerciseHeader';
import ExDataForm from '../components/exerciseComponents/ExDataForm';

import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_EXERCISES } from '../utils/queries';
import { Container } from '@mui/material';

const StartWorkout = () => {
  let { workoutId } = useParams();
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [allExercises, setAllExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({});
  const [currentSetNum, setCurrentSetNum] = useState(1);
  const [finishButton, setFinishButton] = useState(false);
  const [onRestBtwnExs, setOnRestBtwnExs] = useState(false);

  const { loading, error, data } = useQuery(QUERY_WORKOUTS, {
    variables: { workId: workoutId },
  });

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <NoMatch />;
  }

  let workData = data?.workouts || {};
  console.log(workData);

  const viewPreviousData = () => {};

  const handleNextButton = () => {
    // If last workout was just finished, go to the finish workout page
    //if (progressPercent >= 100) {
    //    setFinishButton(true);
    //    return;
    //}
    //
    //// Move on to the next exercise (first check set Num, then adjust exercise)
    //if (currentSetNum < currentExercise.numSets) {
    //    setCurrentSetNum(currentSetNum + 1);
    //} else {
    //    setCurrentExerciseIndex(currentExerciseIndex + 1);
    //    setCurrentExercise(allExercises[currentExerciseIndex]);
    //}
    //
    //// Calculate the percent done for the progress bar
    //setProgressPercent(Math.min(progressPercent + (100 / workData.totalSetsCount), 100));
    //if (progressPercent > 99.9) {
    //    setFinishButton(true);
    //}
  };

  const handlePreviousButton = () => {};

  const getLastComment = (exerData) => {
    // const lastIndex = exerData.exDatasCount - 1;
    return 'No previous comment'; // exerData.exDatas[lastIndex].comment || 'No previous comment';
  };

  const QueryContainer = ({ exId }) => {
    const {
      loading: l2,
      error: e2,
      data: d2,
    } = useQuery(QUERY_EXERCISES, {
      variables: { exerId: exId },
    });
    let exerData = d2?.exercise || {};
    if (l2) {
      return <CircularProgress />;
    }
    if (e2) {
      return `Error... ${e2.message} |`;
    }
    // setAllExercises({ ...allExercises, exerData });
    console.log(exerData);
    return (
      <Box display={currentExerciseIndex === exerData.position ? 'none' : 'block'}>
        {/* Exercise Header for the current workout */}
        <ExerciseHeader exName={exerData.name} exImage={exerData.image} exDescription={exerData.description} />
        {/* Icon to bring forward the past data for the same workout */}
        <TimelineIcon onClick={() => viewPreviousData(exerData)} />

        {/* Form to enter the current exercise's ExData and move between exercises*/}
        <ExDataForm
          prevComment={() => getLastComment(exerData)}
          handleFormSubmit={() => handleNextButton()}
          handlePrevButton={() => handlePreviousButton()}
        />
      </Box>
    );
  };

  return (
    <Stack
      textAlign="center"
      marginTop={8}
      width={'70%'}
      marginLeft="auto"
      marginRight={'auto'}
      spacing={8}
      marginBottom={10}
    >
      {/* Show progress bar at the top */}
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progressPercent} />
      </Box>

      {workData.exercises.map((exId) => {
        return (
          <Stack key={exId._id}>
            <QueryContainer exId={exId._id} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default StartWorkout;
