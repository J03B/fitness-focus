import React, { useState } from 'react';
import { FormControlLabel, FormLabel, TextField, Alert, Button, RadioGroup, Radio } from '@mui/material';

// Custom Components
import PromptLogin from './PromptLogin';

// Import Mutations and Auth files
import { useMutation } from "@apollo/client";
import { ADD_PROGRAM } from "../utils/mutations";
import Auth from '../utils/auth';

export default function AddProgram() {
    const [progFormData, setProgFormData] = useState({ name: '', description: '', image: 'deadlift.jpg' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addProg, { error }] = useMutation(ADD_PROGRAM);

    // Handles the input changes by updating it in our State variable
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProgFormData({ ...progFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addProg({
                variables: { ...progFormData },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setProgFormData({ name: '', description: '', image: 'deadlift.jpg' });
    };

    return (
        <>
            {Auth.loggedIn() ? (
                <form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {showAlert && <Alert variant='standard' severity='error' color='error' className='mb-3'>
                        Something went wrong with accessing the server!
                    </Alert>}
                    <div className='mb-3'>
                        <TextField
                            label='Program Name'
                            name='name'
                            onChange={handleInputChange}
                            value={progFormData.name}
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <TextField
                            label='Program Description'
                            name='description'
                            onChange={handleInputChange}
                            value={progFormData.description}
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <FormLabel id="row-radio-buttons-group-label">Program Cover Image</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="row-radio-buttons-group-label"
                            name="image"
                            value={progFormData.image}
                            onChange={handleInputChange}
                        >
                            <img
                                alt={"Generic Stock fitness"}
                                src={`/images/${progFormData.image}`}
                                width={"100%"}
                            />
                            <FormControlLabel value="deadlift.jpg" control={<Radio />} label="Weights" />
                            <FormControlLabel value="mountain-climbers.jpg" control={<Radio />} label="Body Weights" />
                            <FormControlLabel value="model-bicep-curls.jpg" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </div>

                    <Button
                        disabled={!(progFormData.name)}
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