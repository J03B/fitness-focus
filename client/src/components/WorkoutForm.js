import React, { useState } from 'react';
import {
    TextField,
    Alert,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Skeleton
} from '@mui/material';

// Custom Components
import PromptLogin from './PromptLogin';

// Import Mutations and Auth files
import { useMutation, useQuery } from '@apollo/client';
import { ADD_WORKOUT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';

export default function WorkoutForm(props) {
    // TODO: Verify that phase belongs to user
    const defaultPhase = props.phaseId !== undefined ? props.phaseId: ''
    const [workoutFormData, setWorkoutFormData] = useState({ name: '', description: '', position: '', secBtwnExs: '', phaseId: defaultPhase });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

    if (error) {
        console.log('ADD_WORKOUT error:');
        console.error(error);
    }

    // Handles the input changes by updating it in our State variable
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setWorkoutFormData({ ...workoutFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log('Attempting to submit form!');
        console.log('workoutFormData');
        console.log(workoutFormData);
        // Convert strings to ints
        console.log('Converting strings to ints');
        workoutFormData.position = parseInt(workoutFormData.position);
        workoutFormData.secBtwnExs = parseInt(workoutFormData.secBtwnExs);


        try {
            const { data } = await addWorkout({
                variables: { ...workoutFormData },
            });
            console.log('Successfully submitted the data');
            console.log(data);
            // TODO: Go to phase page instead of going inside of phase
            window.location.assign(`/workouts/${workoutFormData.phaseId}`);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setWorkoutFormData({ name: '', description: '', position: '', numberOfWeeks: '', phaseId: '' });
    };

    // Get list of all phases for user
    const { loading, data } = useQuery(QUERY_ME);
    let programData = data?.me.programs || {};
    if (loading) {
        return <Skeleton></Skeleton>
    }
    console.log('programData');
    console.log(programData);
    let phaseData = [];
    programData.map((program) => {
        program.phases.map((phase) => {
            phaseData.push({
                'name': phase['name'] + ' (' + program['name'] + ')',
                '_id': phase._id
            });
        })
        
    });
    console.log('phaseData');
    console.log(phaseData);

    return (
        <>
            {Auth.loggedIn() ? (
                <form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {showAlert && <Alert variant='standard' severity='error' color='error' className='mb-3'>
                        Something went wrong with accessing the server!
                    </Alert>}

                    <FormControl required fullWidth className='my-3'>
                        <InputLabel id="phase-select-label">Phase</InputLabel>
                        <Select
                            labelId="phase-select-label"
                            id="phase-select"
                            name='phaseId'
                            value={workoutFormData.phaseId}
                            label="Program"
                            onChange={handleInputChange}
                        >
                            {loading
                                ?<MenuItem>Loading Items</MenuItem>
                                :phaseData.map((data) => (
                                    <MenuItem value={data._id} key={data._id}>{data.name}</MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>

                    <div className='mb-3'>
                        <TextField
                            label='Workout Name'
                            name='name'
                            onChange={handleInputChange}
                            required
                            value={workoutFormData.name}
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Workout Description'
                            name='description'
                            onChange={handleInputChange}
                            value={workoutFormData.description}
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Workout Position'
                            name='position'
                            onChange={handleInputChange}
                            value={workoutFormData.position}
                            type='number'
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Seconds Between Exercises'
                            name='secBtwnExs'
                            onChange={handleInputChange}
                            value={workoutFormData.secBtwnExs}
                            type='number'
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <Button
                        disabled={!(workoutFormData.name)}
                        type='submit'
                        variant='contained'
                        onSubmit={handleFormSubmit}>
                        Submit
                    </Button>
                </form>)
                : (
                    <PromptLogin prompt={'to create a new Workout Program.'} />)}
        </>
    )
}