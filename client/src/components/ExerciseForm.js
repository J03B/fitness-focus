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
import { ADD_EXERCISE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';

export default function ExerciseForm(props) {
    // TODO: Verify that workout belongs to user
    const defaultWorkout = props.workoutId !== undefined ? props.workoutId: ''
    const [exerciseFormData, setExcerciseFormData] = useState(
        { 
            name: '', 
            description: '', 
            image: 'deadlift.jpg', 
            position: '', 
            goalReps: '', 
            goalWeight: '', 
            goalUnits: '', 
            numSets: '', 
            secBtwnSets: '', 
            workoutId: defaultWorkout 
        }
    );
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addExercise, { error }] = useMutation(ADD_EXERCISE);

    if (error) {
        console.log('ADD_EXERCISE error:');
        console.error(error);
    }

    // Handles the input changes by updating it in our State variable
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExcerciseFormData({ ...exerciseFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log('Attempting to submit form!');
        console.log('exerciseFormData');
        console.log(exerciseFormData);
        // Convert strings to ints
        console.log('Converting strings to ints');
        exerciseFormData.position = parseInt(exerciseFormData.position);
        exerciseFormData.goalReps = parseInt(exerciseFormData.goalReps);
        exerciseFormData.goalWeight = parseInt(exerciseFormData.goalWeight);
        exerciseFormData.numSets = parseInt(exerciseFormData.numSets);
        exerciseFormData.secBtwnSets = parseInt(exerciseFormData.secBtwnSets);


        try {
            const { data } = await addExercise({
                variables: { ...exerciseFormData },
            });
            console.log('Successfully submitted the data');
            window.location.assign(`/workouts/${data.addExercise._id}`);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setExcerciseFormData(
            { 
                name: '', 
                description: '', 
                image: '', 
                position: '', 
                goalReps: '', 
                goalWeight: '', 
                goalUnits: '', 
                numSets: '', 
                secBtwnSets: '', 
                workoutId: '' 
            }
        );
    };

    // Get list of all phases for user
    const { loading, data } = useQuery(QUERY_ME);
    let programData = data?.me.programs || {};
    if (loading) {
        return <Skeleton></Skeleton>
    }
    console.log('programData');
    console.log(programData);
    let workoutData = [];
    programData.map((program) => {
        program.phases.map((phase) => {
            phase.workouts.map((workout) => {
                workoutData.push({
                    'name': `${program.name} | ${phase.name} | ${workout.name}`,
                    '_id': workout._id
                });
            })
            
        })
        
    });

    const style = { width: "100%", my: 1 };

    return (
        <>
            {Auth.loggedIn() ? (
                <form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {showAlert && <Alert variant='standard' severity='error' color='error'>
                        Something went wrong with accessing the server!
                    </Alert>}

                    <FormControl required fullWidth sx={ style }>
                        <InputLabel id="workout-select-label">Workout</InputLabel>
                        <Select
                            labelId="workout-select-label"
                            id="workout-select"
                            name='workoutId'
                            value={exerciseFormData.workoutId}
                            label="Workout"
                            onChange={handleInputChange}
                        >
                            {loading
                                ?<MenuItem sx={ style }>Loading Items</MenuItem>
                                :workoutData.map((data) => (
                                    <MenuItem sx={{fontSize:'12px', justifyContent:'center'}} value={data._id} key={data._id}>{data.name}</MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>

                    <div>
                        <TextField
                            label='Exercise Name'
                            name='name'
                            onChange={handleInputChange}
                            required
                            value={exerciseFormData.name}
                            sx={ style }
                        />
                    </div>

                    <div>
                        <TextField
                            label='Exercise Description'
                            name='description'
                            onChange={handleInputChange}
                            value={exerciseFormData.description}
                            sx={ style }
                        />
                    </div>

                    <div>
                        <img
                            alt={"Generic Stock fitness"}
                            src={`/images/${exerciseFormData.image}`}
                            width={"100%"}
                        />
                        <FormControl fullWidth sx={ style }>
                            <InputLabel id="image-select-label">Exercise Image</InputLabel>
                            <Select
                                labelId="image-select-label"
                                id="exercise-image"
                                name='image'
                                value={exerciseFormData.image}
                                label="Exercise Image"
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

                    <div>
                        <TextField
                            label='Workout Position'
                            name='position'
                            onChange={handleInputChange}
                            value={exerciseFormData.position}
                            type='number'
                            required
                            sx={ style }
                        />
                    </div>
                    
                    <div>
                        <TextField
                            label='Goal Reps'
                            name='goalReps'
                            onChange={handleInputChange}
                            value={exerciseFormData.goalReps}
                            type='number'
                            required
                            sx={ style }
                        />
                    </div>

                    <div>
                        <TextField
                            label='Goal Weight'
                            name='goalWeight'
                            onChange={handleInputChange}
                            value={exerciseFormData.goalWeight}
                            type='number'
                            required
                            sx={ style }
                        />
                    </div>

                    <div>
                        <TextField
                            label='Goal units'
                            name='goalUnits'
                            onChange={handleInputChange}
                            value={exerciseFormData.goalUnits}
                            required
                            sx={ style }
                        />
                    </div>
                    
                    <div>
                        <TextField
                            label='Number of Sets'
                            name='numSets'
                            onChange={handleInputChange}
                            value={exerciseFormData.numSets}
                            type='number'
                            required
                            sx={ style }
                        />
                    </div>

                    <div>
                        <TextField
                            label='Seconds Between Sets'
                            name='secBtwnSets'
                            onChange={handleInputChange}
                            value={exerciseFormData.secBtwnSets}
                            type='number'
                            required
                            sx={ style }
                        />
                    </div>

                    <Button
                        disabled={!(exerciseFormData.name)}
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