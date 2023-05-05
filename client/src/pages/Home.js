import React, { useState, useEffect } from 'react';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row,
    Carousel
} from 'react-bootstrap';
import Auth from '../utils/auth';

const Home = () => {
    return (
        <>
            <Container fluid >
                <h1 className='mb-3'>Welcome to Fitness Focus</h1>
                <h3 className="mb-3">Get started by going to your My Programs Dashboard or simply start one of you workouts with the quick links below.</h3>
                <Button variant="outline-info" href='/programs'>Go to My Programs</Button>{' '}
            </Container>

            {Auth.loggedIn() ? (
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=f5f5f5"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Second slide&bg=eee"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h5>Third slide label</h5>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            ) : (
                <h2>Log in to view your programs!</h2>
            )}
        </>
    );
};

export default Home;