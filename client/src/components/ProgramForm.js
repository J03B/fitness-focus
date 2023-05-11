import React, { useState } from 'react';
import { 
    FormControlLabel, 
    FormLabel, 
    TextField, 
    Alert, 
    Button, 
    RadioGroup, 
    Radio,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

// Custom Components
import PromptLogin from './PromptLogin';

// Import Mutations and Auth files
import { useMutation } from "@apollo/client";
import { ADD_PROGRAM } from "../utils/mutations";
import Auth from '../utils/auth';

export default function ProgramForm() {
    const [progFormData, setProgFormData] = useState({ name: '', description: '', image: 'deadlift.jpg' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addProg, { error }] = useMutation(ADD_PROGRAM);

    // Handles the input changes by updating it in our State variable
    const handleInputChange = (event) => {
        console.log('handleInputChange started');
        console.log(event.target);
        const { name, value } = event.target;
        console.log('handleInputChange');
        console.log()
        setProgFormData({ ...progFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addProg({
                variables: { ...progFormData },
            });
            console.log(data);
            window.location.assign('/programs');
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
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div className='mb-3'>
                        <img
                            alt={"Generic Stock fitness"}
                            src={`/images/${progFormData.image}`}
                            width={"100%"}
                            style={{margin:'10px auto 25px'}}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="image-select-label">Program Cover Image</InputLabel>
                            <Select
                                labelId="image-select-label"
                                id="program-cover-image"
                                name='image'
                                value={progFormData.image}
                                label="Program Cover Image"
                                onChange={handleInputChange}
                            >
                                <MenuItem value={'barbell-bench-press.jpg'}>Barbell Bench Press</MenuItem>
                                <MenuItem value={'barbell-shoulder-press.jpg'}>Barbell Shoulder Press</MenuItem>
                                <MenuItem value={'bent-over-flys.jpg'}>Bent Over Flys</MenuItem>
                                <MenuItem value={'bulgarian-split-squat.jpg'}>Bulgarian Split Squat</MenuItem>
                                <MenuItem value={'chest-day.jpg'}>Chest Day</MenuItem>
                                <MenuItem value={'chin-ups.jpg'}>Chin Ups</MenuItem>
                                <MenuItem value={'crossovers.jpg'}>Crossovers</MenuItem>
                                <MenuItem value={'db-shoulder-press.jpg'}>DB Shoulder Press</MenuItem>
                                <MenuItem value={'deadlift.jpg'}>Deadlift</MenuItem>
                                <MenuItem value={'dumbbell-lunges.jpg'}>Dumbbell Lunges</MenuItem>
                                <MenuItem value={'hanging-leg-raise.jpg'}>Hanging Leg Raise</MenuItem>
                                <MenuItem value={'hip-thrust.jpg'}>Hip Thrust</MenuItem>
                                <MenuItem value={'incline-bench.jpg'}>Incline Bench</MenuItem>
                                <MenuItem value={'incline-dumbbell-bench.jpg'}>Incline Dumbbell Bench</MenuItem>
                                <MenuItem value={'incline-dumbbell-curl.jpg'}>Incline Dumbbell Curl</MenuItem>
                                <MenuItem value={'leaning-lateral-raise.jpg'}>Leaning Lateral Raise</MenuItem>
                                <MenuItem value={'leaning-shrug.jpg'}>Leaning Shrug</MenuItem>
                                <MenuItem value={'leg-extension.jpg'}>Leg Extension</MenuItem>
                                <MenuItem value={'leg-squats.jpg'}>Leg Squats</MenuItem>
                                <MenuItem value={'machine-calf-raise.jpg'}>Machine Calf Raise</MenuItem>
                                <MenuItem value={'model-bicep-curls.jpg'}>Model Bicep Curls</MenuItem>
                                <MenuItem value={'mountain-climbers.jpg'}>Mountain Climbers</MenuItem>
                                <MenuItem value={'one-arm-overhead.jpg'}>One Arm Overhead</MenuItem>
                                <MenuItem value={'pinned-curls.jpg'}>Pinned Curls</MenuItem>
                                <MenuItem value={'pull-up.jpg'}>Pull Up</MenuItem>
                                <MenuItem value={'romanian-deadlift.jpg'}>Romanian Deadlift</MenuItem>
                                <MenuItem value={'standard-pushup.jpg'}>Standard Pushup</MenuItem>
                                <MenuItem value={'sumo-deadlift.jpg'}>Sumo Deadlift</MenuItem>
                                <MenuItem value={'tricep-pushdown.jpg'}>Tricep Pushdown</MenuItem>
                                <MenuItem value={'upright-row.jpg'}>Upright Row</MenuItem>
                                <MenuItem value={'weighted-dips.jpg'}>Weighted Dips</MenuItem>
                            </Select>
                        </FormControl>
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