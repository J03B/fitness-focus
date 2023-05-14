import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Typography
  } from '@mui/material';

import ExerciseForm from '../components/ExerciseForm';

const AddExercise = () => {
    // Look for optional phase ID
    const workoutId = useParams().workoutId;
    console.log('Workout Id: ' + workoutId);

    return (
        <>
            <Container maxWidth='sm'>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={6} marginBottom={2}>
                        Add Exercise
                    </Typography>
                </Container>
                <ExerciseForm workoutId={workoutId}></ExerciseForm>
            </Container>
        </>
    )
}

export default AddExercise;