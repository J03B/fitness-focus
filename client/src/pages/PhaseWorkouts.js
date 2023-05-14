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

import NoMatch from "./NoMatch";

import { useQuery } from "@apollo/client";
import { QUERY_PHASES, QUERY_WORKOUTS } from "../utils/queries";

const PhaseWorkouts = () => {
  let { phaseId } = useParams();
  
  // Modal handling
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    let workData = d2?.workouts || {};
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
          id: i + 1,
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
            <Button variant="outlined" onClick={handleOpen}>
              Preview
            </Button>
          </CardActions>
        </CardContent>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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

  return (
    <>
      <Container>
        <Typography
          variant="h3"
          component="div"
          textAlign={"center"}
          marginTop={6}
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
            : "You have no saved programs!"}
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
