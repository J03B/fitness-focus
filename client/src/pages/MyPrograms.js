import React, { useState, useEffect } from 'react';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row,
    Spinner
} from 'react-bootstrap';
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
            <Card key={progId} bg='dark' border='light'>
                {progData.image ? <Card.Img src={progData.image} alt={`The cover for ${progData.name}`} variant='top' /> : null}
                <Card.Body>
                    <Card.Title>{progData.name}</Card.Title>
                    <p className='small'>Program Type: {progData.phasesCount} Phases</p>
                    <Card.Text>{progData.description}</Card.Text>
                    <Button className='btn-block btn-primary' onClick={() => handleOpenProgram(progData)}>
                        Open this program!
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    const handleOpenProgram = (prog) => {
        setOpenProgram(prog);
        window.location.assign('/');
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