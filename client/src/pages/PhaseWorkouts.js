import React from "react";
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { useQuery } from "@apollo/client";
import { QUERY_PHASES, QUERY_WORKOUTS } from "../utils/queries";

const PhaseWorkouts = () => {
    let { phaseId } = useParams();
    const { loading, error, data } = useQuery(QUERY_PHASES, {
        variables: { phaseId: phaseId },
    });

    let phaseData = data?.phases;

    const PhaseCard = ({ workId }) => {
        const { loading: l2, error: e2, data: d2 } = useQuery(QUERY_WORKOUTS, {
            variables: { workId: workId },
        });
        let workData = d2?.workouts || {};
        if (l2) { return (<CircularProgress />) };
        if (e2) { return 'ERROR...' };
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
                    <CardActions>
                        <Button variant="contained" href={`/phases/${workId}`}>Open Workout</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }

    if (loading) { return (<CircularProgress />) };

    return (
        <>
            <Container >
                <Typography variant="h3" component="div">
                    {phaseData.name}
                </Typography>
            </Container>
            <Container>
                <Typography variant="h4" component="div">
                    {phaseData.workoutsCount
                        ? `Viewing ${phaseData.workoutsCount} saved ${phaseData.workoutsCount === 1 ? 'workout' : 'workouts'}:`
                        : 'You have no saved programs!'}
                </Typography>
                <Stack>
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
