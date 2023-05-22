import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Typography
  } from '@mui/material';

import ExerciseForm from '../components/ExerciseForm';
import BreadcrumbNav from '../components/BreadcrumbNav';

const AddExercise = () => {
    // Look for optional phase ID
    const workoutId = useParams().workoutId;

    const breadcrumbs = [
        {
          'name': 'Add Exercise',
          'href': '/add-exercise'
        }
    ];

    return (
        <>
            <Container maxWidth='sm'>
                <BreadcrumbNav breadcrumbs={breadcrumbs}></BreadcrumbNav>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={2} marginBottom={2}>
                        Add Exercise
                    </Typography>
                </Container>
                <ExerciseForm workoutId={workoutId}></ExerciseForm>
            </Container>
        </>
    )
}

export default AddExercise;