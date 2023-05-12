import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ExDataForm = (
    {
        handleNextButton,
        handlePrevButton,
        showFinishButton,
        handleFinishButton,
        prevComment,
        goalReps,
        goalWeight,
        goalUnits,
        hidePrevButton
    }) => {
    const [userFormData, setUserFormData] = useState({ weight: '', reps: '', comment: '' });
    const [validated] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    return (
        <>
            <form
                noValidate
                validated={validated.toString()}
                onSubmit={handleFinishButton}
            >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <TextField
                            name='reps'
                            label="Reps"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={userFormData.reps}
                            helperText={`Goal: ${goalReps}`}
                            required
                            style={{ width: "100%" }}
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField
                            name='weight'
                            label="Weight"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={userFormData.weight}
                            helperText={`Goal: ${goalWeight} ${goalUnits}`}
                            required
                            style={{ width: "100%" }}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            name='comment'
                            label="Comment"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={userFormData.comment}
                            helperText={prevComment()}
                            style={{ width: "100%" }}
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            disabled={hidePrevButton}
                            onClick={handlePrevButton}
                        >
                            <ArrowBackIosIcon />
                            Previous
                        </Button>

                    </Grid>

                    <Grid item xs={6} >
                        {/* Determine if we should show the Finish button or the Next Button */}
                        {showFinishButton ?
                            <Button
                                variant="contained"
                                disabled={!(userFormData.weight && userFormData.reps)}
                                type='submit'
                            >
                                Finish
                                <CheckCircleOutlineIcon sx={{ ml: 1 }}/>
                            </Button>
                            :
                            <Button
                                variant="contained"
                                disabled={!(userFormData.weight && userFormData.reps)}
                                type='next'
                                onClick={handleNextButton}
                            >
                                Next
                                <ArrowForwardIosIcon />
                            </Button>}


                    </Grid>

                </Grid>
            </form>
        </>
    );
}

export default ExDataForm;