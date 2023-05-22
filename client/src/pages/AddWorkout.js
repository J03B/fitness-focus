import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Typography
  } from '@mui/material';

import WorkoutForm from '../components/WorkoutForm';
import BreadcrumbNav from '../components/BreadcrumbNav';

const AddWorkout = () => {
    // Look for optional phase ID
    const phaseId = useParams().phaseId;

    const breadcrumbs = [
        {
          'name': 'Add Workout',
          'href': '/add-workout'
        }
    ];

    return (
        <>
            <Container maxWidth='sm'>
                <BreadcrumbNav breadcrumbs={breadcrumbs}></BreadcrumbNav>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={2} marginBottom={2}>
                        Add Workout
                    </Typography>
                </Container>
                <WorkoutForm phaseId={phaseId}></WorkoutForm>
            </Container>
        </>
    )
}

export default AddWorkout;