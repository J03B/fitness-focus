import React, { useState, useEffect } from 'react';

import { Button, Container, Typography } from '@mui/material';
import Auth from '../utils/auth';

const Home = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h2">Welcome to Fitness Focus</Typography>
        <Typography variant="h3" sx={{ my: 4 }}>
          Get started by going to your My Programs Dashboard or simply start one of you workouts with the quick links
          below.
        </Typography>
      </Container>

      {Auth.loggedIn() ? (
        <Container maxWidth="md" sx={{ mb: 2 }}>
          <Button variant="contained" href="/programs">
            Go to My Programs
          </Button>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Typography variant="h2" color={'primary'}>
            Log in to view your programs!{' '}
          </Typography>
        </Container>
      )}
    </>
  );
};

export default Home;
