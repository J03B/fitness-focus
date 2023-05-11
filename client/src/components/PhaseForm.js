import React, { useState } from 'react';
import {
    TextField,
    Alert,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

// Custom Components
import PromptLogin from './PromptLogin';

// Import Mutations and Auth files
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PHASE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';

export default function PhaseForm(props) {
    // TODO: Verify that program belongs to user
    const defaultProgram = props.programId !== undefined ? props.programId: ''
    const [phaseFormData, setPhaseFormData] = useState({ name: '', description: '', position: '', numberOfWeeks: '', programId: defaultProgram });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addPhase, { error }] = useMutation(ADD_PHASE);

    if (error) {
        console.log('ADD_PHASE error:');
        console.error(error);
    }

    // Handles the input changes by updating it in our State variable
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPhaseFormData({ ...phaseFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Convert strings to ints
        console.log('Converting strings to ints');
        phaseFormData.position = parseInt(phaseFormData.position);
        phaseFormData.numberOfWeeks = parseInt(phaseFormData.numberOfWeeks);


        try {
            const { data } = await addPhase({
                variables: { ...phaseFormData },
            });
            console.log('Successfully submitted the data');
            console.log(data);
            window.location.assign('/programs');
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setPhaseFormData({ name: '', description: '', position: '', numberOfWeeks: '', programId: '' });
    };

    // Get list of all programs for user
    const { loading, data } = useQuery(QUERY_ME);
    let userData = data?.me.programs || {};

    return (
        <>
            {Auth.loggedIn() ? (
                <form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {showAlert && <Alert variant='standard' severity='error' color='error' className='mb-3'>
                        Something went wrong with accessing the server!
                    </Alert>}

                    <FormControl required fullWidth className='my-3'>
                        <InputLabel id="program-select-label">Program</InputLabel>
                        <Select
                            labelId="program-select-label"
                            id="program-select"
                            name='programId'
                            value={phaseFormData.programId}
                            label="Program"
                            onChange={handleInputChange}
                        >
                            {loading
                                ?<MenuItem>Loading Items</MenuItem>
                                :userData.map((data) => (
                                    <MenuItem value={data._id} key={data._id}>{data.name}</MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>

                    <div className='mb-3'>
                        <TextField
                            label='Phase Name'
                            name='name'
                            onChange={handleInputChange}
                            required
                            value={phaseFormData.name}
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Phase Description'
                            name='description'
                            onChange={handleInputChange}
                            value={phaseFormData.description}
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Phase Position'
                            name='position'
                            onChange={handleInputChange}
                            value={phaseFormData.position}
                            type='number'
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Number of Weeks'
                            name='numberOfWeeks'
                            onChange={handleInputChange}
                            value={phaseFormData.numberOfWeeks}
                            type='number'
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <Button
                        disabled={!(phaseFormData.name)}
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