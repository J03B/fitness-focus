import React from 'react';

import {
    Container,
    Typography
  } from '@mui/material';

import ProgramForm from '../components/ProgramForm';
import BreadcrumbNav from '../components/BreadcrumbNav';

const AddProgram = () => {
    const breadcrumbs = [
        {
          'name': 'Add Program',
          'href': '/add-program'
        }
    ];

    return (
        <>
            <Container maxWidth='sm'>
                <BreadcrumbNav breadcrumbs={breadcrumbs}></BreadcrumbNav>
                <Container>
                    <Typography variant="h3" component="div" textAlign={'center'} marginTop={2} marginBottom={2}>
                        Add Program
                    </Typography>
                </Container>
                <ProgramForm></ProgramForm>
            </Container>
        </>
    )
}

export default AddProgram;