import React, { useState } from 'react';
import { 
    TextField, 
    Alert, 
    Button, 
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

    const style = { width: "100%", my: 1 };
    
    return (
        <>
            {Auth.loggedIn() ? (
                <form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {showAlert && <Alert variant='standard' severity='error' color='error'>
                        Something went wrong with accessing the server!
                    </Alert>}
                    <div>
                        <TextField
                            label='Program Name'
                            name='name'
                            onChange={handleInputChange}
                            value={progFormData.name}
                            required
                            sx={ style }
                        />
                    </div>

                    <div>
                        <TextField
                            label='Program Description'
                            name='description'
                            onChange={handleInputChange}
                            value={progFormData.description}
                            sx={ style }
                        />
                    </div>

                    <div>
                        <img
                            alt={"Generic Stock fitness"}
                            src={`/images/${progFormData.image}`}
                            width={"100%"}
                        />
                        <FormControl fullWidth sx={ style }>
                            <InputLabel id="image-select-label">Program Cover Image</InputLabel>
                            <Select
                                labelId="image-select-label"
                                id="program-cover-image"
                                name='image'
                                value={progFormData.image}
                                label="Program Cover Image"
                                onChange={handleInputChange}
                                
                            >
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'barbell-bench-press.jpg'}>Barbell Bench Press</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'barbell-shoulder-press.jpg'}>Barbell Shoulder Press</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'bent-over-flys.jpg'}>Bent Over Flys</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'bulgarian-split-squat.jpg'}>Bulgarian Split Squat</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'chest-day.jpg'}>Chest Day</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'chin-ups.jpg'}>Chin Ups</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'crossovers.jpg'}>Crossovers</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'db-shoulder-press.jpg'}>DB Shoulder Press</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'deadlift.jpg'}>Deadlift</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'dumbbell-lunges.jpg'}>Dumbbell Lunges</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'hanging-leg-raise.jpg'}>Hanging Leg Raise</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'hip-thrust.jpg'}>Hip Thrust</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'incline-bench.jpg'}>Incline Bench</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'incline-dumbbell-bench.jpg'}>Incline Dumbbell Bench</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'incline-dumbbell-curl.jpg'}>Incline Dumbbell Curl</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'leaning-lateral-raise.jpg'}>Leaning Lateral Raise</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'leaning-shrug.jpg'}>Leaning Shrug</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'leg-extension.jpg'}>Leg Extension</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'leg-squats.jpg'}>Leg Squats</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'machine-calf-raise.jpg'}>Machine Calf Raise</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'model-bicep-curls.jpg'}>Model Bicep Curls</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'mountain-climbers.jpg'}>Mountain Climbers</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'one-arm-overhead.jpg'}>One Arm Overhead</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'pinned-curls.jpg'}>Pinned Curls</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'pull-up.jpg'}>Pull Up</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'romanian-deadlift.jpg'}>Romanian Deadlift</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'standard-pushup.jpg'}>Standard Pushup</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'sumo-deadlift.jpg'}>Sumo Deadlift</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'tricep-pushdown.jpg'}>Tricep Pushdown</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'upright-row.jpg'}>Upright Row</MenuItem>
                                <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={'weighted-dips.jpg'}>Weighted Dips</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        disabled={!(progFormData.name)}
                        type='submit'
                        variant='contained'
                        onSubmit={handleFormSubmit}
                        sx={{ my: 1 }}
                    >
                        Submit
                    </Button>
                </form>)
                : (
                    <PromptLogin prompt={'to create a new Workout Program.'} />)}
        </>
    )
}