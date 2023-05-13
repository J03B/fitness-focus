import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Typography
  } from '@mui/material';

import WorkoutForm from '../components/WorkoutForm';

const AddWorkout = () => {
    // Look for optional phase ID
    const phaseId = useParams().programId;
    console.log('Phase Id: ' + phaseId);

    return (
        <>
            <Container maxWidth='sm'>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={6} marginBottom={2}>
                        Add Workout
                    </Typography>
                </Container>
                <WorkoutForm programId={phaseId}></WorkoutForm>
            </Container>
        </>
    )
}

export default AddWorkout;