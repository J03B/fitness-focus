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
import { QUERY_ME } from "../utils/queries";

const MyPrograms = () => {
    const { loading, data } = useQuery(QUERY_ME);
    let userData = data?.me || {};
    const [OpenProgram, setOpenProgram] = useState({});

    const handleOpenProgram = (prog) => {
        setOpenProgram(prog);
        window.location.assign('/');
    }


    if (loading) {
        return <Spinner animation="border" variant="primary" />;
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
                                <Card key={program._id} border='dark'>
                                    {program.image ? <Card.Img src={program.image} alt={`The cover for ${program.name}`} variant='top' /> : null}
                                    <Card.Body>
                                        <Card.Title>{program.name}</Card.Title>
                                        <p className='small'>Program Type: {program.phasesCount} Phases</p>
                                        <Card.Text>{program.description}</Card.Text>
                                        <Button className='btn-block btn-primary' onClick={() => handleOpenProgram(program)}>
                                            Open this program!
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default MyPrograms;