import React from 'react';

import {
    Container,
    Typography
  } from '@mui/material';

import ProgramForm from '../components/ProgramForm';

const AddProgram = () => {
    return (
        <>
            <Container maxWidth='sm'>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={6} marginBottom={2}>
                        Add Program
                    </Typography>
                </Container>
                <ProgramForm></ProgramForm>
            </Container>
        </>
    )
}

export default AddProgram;