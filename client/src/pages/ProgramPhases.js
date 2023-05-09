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
import { QUERY_PROGRAMS, QUERY_PHASES } from "../utils/queries";

const ProgramPhases = () => {
    let { programId } = useParams();

    const { loading, error, data } = useQuery(QUERY_PROGRAMS, {
        variables: { progId: programId },
    });

    let progData = data?.programs;

    const PhaseCard = ({ phaseId }) => {
        const { loading: l2, error: e2, data: d2 } = useQuery(QUERY_PHASES, {
            variables: { phaseId: phaseId },
        });
        let phaseData = d2?.phases || {};
        if (l2) { return (<CircularProgress />) };
        if (e2) { return 'ERROR...' };
        return (
            <Card sx={{ maxWidth: 345, m: 2 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {phaseData.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {phaseData.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Length of Phase: {phaseData.numberOfWeeks} weeks
                        <br />
                        Workouts per week: {phaseData.workoutsCount}
                    </Typography>
                    <CardActions>
                        <Button variant="contained" href={`/workouts/${phaseId}`}>Open Phase</Button>
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
                    {progData.name}
                </Typography>
            </Container>
            <Container>
                <Typography variant="h4" component="div">
                    {progData.phasesCount
                        ? `Viewing ${progData.phasesCount} saved ${progData.phasesCount === 1 ? 'phase' : 'phases'}:`
                        : 'You have no saved phases!'}
                </Typography>
                <Stack>
                    {progData.phases.map((phase) => {
                        return (
                            <div key={phase._id}>
                                <PhaseCard phaseId={phase._id} />
                            </div>
                        );
                    })}
                </Stack>
            </Container>
        </>
    );
};

export default ProgramPhases;
