import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import {
  Stack,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Skeleton,
} from '@mui/material';

import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROGRAMS } from '../utils/queries';

const MyPrograms = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [OpenProgram, setOpenProgram] = useState({});

  let userData = data?.me || {};

  const ProgramCard = ({ progId }) => {
    const {
      loading: load2,
      error: err2,
      data: data2,
    } = useQuery(QUERY_PROGRAMS, {
      variables: { progId: progId },
    });
    let progData = data2?.programs || {};
    if (load2) {
      return 'Loading...';
    }
    if (err2) {
      return `Error!... ${err2 + ' ' + progData}`;
    }

    return (
      <Card key={progId} sx={{width: '350px'}} variant="outlined" onClick={() => handleOpenProgram(progId)}>
        {progData.image && (
          <CardMedia
            sx={{ height: 300 }}
            image={`/images/${progData.image}`}
            alt={`The cover for ${progData.name}`}
          ></CardMedia>
        )}
        <CardContent sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          {progData.name}
          <p className="small">Program Type: {progData.phasesCount} Phases</p>
          {progData.description}
        </CardContent>
        <CardActions>
          <Button className="btn-block btn-primary" sx={{margin:'auto'}} onClick={() => handleOpenProgram(progId)}>
            Open Program
          </Button>
        </CardActions>
      </Card>
    );
  };

  const handleOpenProgram = (prog) => {
    setOpenProgram(prog);
    window.location.assign(`/phases/${prog}`);
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  } else {
    console.log(userData);
  }

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Viewing Your Workout Programs
        </Typography>
      </Container>
      <Container sx={{textAlign: 'center'}}>
        <h2 className="my-4">
          {userData.programsCount
            ? `Viewing ${userData.programsCount} saved ${userData.programsCount === 1 ? 'program' : 'programs'}:`
            : 'You have no saved programs!'}
        </h2>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={4} sx={{my:'20px'}}>
          {userData.programs.map((program) => {
            return <ProgramCard progId={program._id} />;
          })}
        </Stack>
      </Container>
    </>
  );
};

export default MyPrograms;
