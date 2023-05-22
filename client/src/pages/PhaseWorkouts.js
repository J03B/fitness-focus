import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import BreadcrumbNav from '../components/BreadcrumbNav';
import NoMatch from "./NoMatch";

import { useQuery } from "@apollo/client";
import { QUERY_PHASES, QUERY_WORKOUTS } from "../utils/queries";

const PhaseWorkouts = () => {
  let { phaseId } = useParams();
  
  // Modal handling
  const [openId, setOpenId] = useState('');
  const handleOpen = (workId) => {
    setOpenId(workId);
  }
  const handleClose = () => setOpenId('');

  const { loading, error, data } = useQuery(QUERY_PHASES, {
    variables: { phaseId: phaseId },
  });

  if (error) {
    return <NoMatch />;
  }

  let phaseData = data?.phases;

  const PhaseCard = ({ workId }) => {
    const {
      loading: l2,
      error: e2,
      data: d2,
    } = useQuery(QUERY_WORKOUTS, {
      variables: { workId: workId },
    });
    const workData = d2?.workouts || {};
    if (l2) {
      return <CircularProgress />;
    }
    if (e2) {
      return `ERROR... ${e2.message}`;
    }

    // Define Rows and Columns
    const columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Exercise", width: 175 },
      { field: "set", headerName: "Sets", width: 50 },
      { field: "goals", headerName: "Goal Reps/Weight", width: 125 },
    ];
    const rows = [];
    if (workData.exercisesCount) {
      for (let i = 0; i < workData.exercisesCount; i++) {
        const exercise = workData.exercises[i];
        rows.push({
          id: exercise._id + i,
          name: exercise.name,
          set: exercise.numSets,
          goals: `${exercise.goalReps} x ${exercise.goalWeight} ${exercise.goalUnits}`
        });
      }
    }

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 375,
      height: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 1,
    };

    return (
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {workData.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {workData.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rest between Exercises: {workData.secBtwnExs} seconds
            <br />
            Total Number of Exercises: {workData.exercisesCount}
          </Typography>
          <CardActions sx={{justifyContent: 'space-between', px: 0}}>
            <Button variant="contained" href={`/exercise/${workId}`}>
              Start Workout
            </Button>
            <Button variant="outlined" onClick={() => handleOpen(workData._id)}>
              Preview
            </Button>
          </CardActions>
        </CardContent>
        <Modal
          open={openId == workData._id}
          onClose={handleClose}
          aria-labelledby={`modal-title-${workData.name}`}
          aria-describedby={`modal-${workData.description}`}
        >
          <Box sx={style}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
                columns: {
                  columnVisibilityModel: {
                    // Hide id column by default
                    id: false,
                  },
                },
              }}
              pageSizeOptions={[5]}
            />
          </Box>
        </Modal>
      </Card>
    );
  };

  if (loading) {
    return <CircularProgress />;
  }
  
  // TODO: Add correct name and link for the program
  const breadcrumbs = [
    {
      'name': 'My Programs',
      'href': '/programs'
    },
    {
      'name': 'Program',
      'href': '/programs'
    },
    {
      'name': phaseData.name,
    }
  ];
  
  return (
    
    <>
      <BreadcrumbNav breadcrumbs={breadcrumbs}></BreadcrumbNav>
      <Container>
        <Typography
          variant="h3"
          component="div"
          textAlign={"center"}
          marginTop={2}
        >
          {phaseData.name}
        </Typography>
      </Container>
      <Container>
        <Typography
          variant="h4"
          component="div"
          textAlign={"center"}
          marginTop={2}
        >
          {phaseData.workoutsCount
            ? `Viewing ${phaseData.workoutsCount} saved ${
                phaseData.workoutsCount === 1 ? "workout" : "workouts"
              }:`
            : 'You have no saved workouts for this phase!'}
        </Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="center">
          {phaseData.workouts.map((work) => {
            return (
              <div key={work._id}>
                <PhaseCard workId={work._id} />
              </div>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default PhaseWorkouts;
