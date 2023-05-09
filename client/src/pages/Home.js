import React, { useState, useEffect } from 'react';

import { Button, Container, Typography } from '@mui/material';
import Auth from '../utils/auth';

const Home = () => {
  return (
    <>
      {/* <Container fluid >
                <h1 className='mb-3'>Welcome to Fitness Focus</h1>
                <h3 className="mb-3">Get started by going to your My Programs Dashboard or simply start one of you workouts with the quick links below.</h3>
                <Button variant="contained" href='/programs'>Go to My Programs</Button>{' '}
            </Container> */}
      <Container maxWidth="md">
        <Typography variant="h1">Welcome to Fitness Focus</Typography>
        <Typography variant="h3">
          Get started by going to your My Programs Dashboard or simply start one of you workouts with the quick links
          below.
        </Typography>
      </Container>

      {Auth.loggedIn() ? (
        <Container maxWidth="md">
          <Button variant="contained" href="/programs">
            Go to My Programs
          </Button>
        </Container>
      ) : (
        <Typography variant="h2">Log in to view your programs!</Typography>
      )}
    </>
  );
};

export default Home;
