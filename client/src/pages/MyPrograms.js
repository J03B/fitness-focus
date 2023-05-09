import React, { useState, useEffect } from 'react';
import {
    Col,
    Row,
    Spinner
} from 'react-bootstrap';

import {
    Button,
    Container,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Skeleton
 } from '@mui/material';

import Auth from '../utils/auth';

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROGRAMS } from "../utils/queries";

const MyPrograms = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [OpenProgram, setOpenProgram] = useState({});

    let userData = data?.me || {};

    const ProgramCard = ({ progId }) => {
        const { loading: load2, error: err2, data: data2 } = useQuery(QUERY_PROGRAMS, {
            variables: { progId: progId },
        });
        let progData = data2?.programs || {};
        if (load2) { return 'Loading...' };
        if (err2) { return `Error!... ${err2 + ' ' + progData}` };

        return (
            <Card key={progId} variant='outlined'>
                {progData.image && <CardMedia sx={{ height: 300}} image={`/images/${progData.image}`} alt={`The cover for ${progData.name}`}>
                </CardMedia>}
                <CardContent sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)'}}>
                    {progData.name}
                    <p className='small'>Program Type: {progData.phasesCount} Phases</p>
                    {progData.description}
                </CardContent>
                <CardActions>
                    <Button className='btn-block btn-primary' onClick={() => handleOpenProgram(progId)}>
                        Open Program
                    </Button>
                </CardActions>
            </Card>
        );
    }

    const handleOpenProgram = (prog) => {
        setOpenProgram(prog);
        window.location.assign(`/phases/${prog}`);
    }

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    } else {
        console.log(userData);
    }

    return (
        <>
            <Container fluid className='text-light bg-dark p-5' >
                <h1>Viewing Your Workout Programs</h1>
            </Container>
            <Container>
                <h2 className='pt-5'>
                    {userData.programsCount
                        ? `Viewing ${userData.programsCount} saved ${userData.programsCount === 1 ? 'program' : 'programs'}:`
                        : 'You have no saved programs!'}
                </h2>
                <Row>
                    {userData.programs.map((program) => {
                        return (
                            <Col key={program._id} md="4">
                                <ProgramCard progId={program._id} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default MyPrograms;