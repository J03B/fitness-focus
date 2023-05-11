import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Typography
  } from '@mui/material';

import PhaseForm from '../components/PhaseForm';

const AddPhase = () => {
    // Look for optional program ID
    const programId = useParams().programId;
    console.log('Program Id: ' + programId);

    return (
        <>
            <Container maxWidth='sm'>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={6} marginBottom={2}>
                        Add Phase
                    </Typography>
                </Container>
                <PhaseForm></PhaseForm>
            </Container>
        </>
    )
}

export default AddPhase;