import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Typography
  } from '@mui/material';

import PhaseForm from '../components/PhaseForm';
import BreadcrumbNav from '../components/BreadcrumbNav';

const AddPhase = () => {
    // Look for optional program ID
    const programId = useParams().programId;

    const breadcrumbs = [
        {
          'name': 'Add Phase',
          'href': '/add-phase'
        }
    ];

    return (
        <>
            <Container maxWidth='sm'>
                <BreadcrumbNav breadcrumbs={breadcrumbs}></BreadcrumbNav>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={2} marginBottom={2}>
                        Add Phase
                    </Typography>
                </Container>
                <PhaseForm programId={programId}></PhaseForm>
            </Container>
        </>
    )
}

export default AddPhase;