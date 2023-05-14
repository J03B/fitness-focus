import React from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Typography, Stack, Grid, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RestingTimer = ({ handlePrevious, handleNext, restTime, goalReps, goalWeight, reps, weight }) => {

    const getSuggestion = () => {
        const repsPassed = (reps >= goalReps);
        const weightPassed = (weight >= goalWeight);
        if (repsPassed && weightPassed) {
            return 'Congratulations! You surpassed your goals! Make sure to set new goals so you can pass them again.';
        }
        if (repsPassed) {
            return 'Try moving up in weight next time.'
        }
        if (weightPassed) {
            return 'Fight harder to get more reps. That might mean lowering the weight a bit.'
        }
        return 'Keep digging deep! You got this! Do your best and forget the rest.';
    }
    return (
        <>
            <Stack spacing={1} sx={{ alignItems: 'center' }}>

                <CountdownCircleTimer
                    isPlaying
                    duration={restTime}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>

                <Typography variant="subtitle1">{getSuggestion()}</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            type='prev'
                            onClick={() => handlePrevious()}
                        >
                            <ArrowBackIosIcon />
                            Previous
                        </Button>
                    </Grid>

                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            type='next'
                            onClick={() => handleNext()}
                        >
                            Next
                            <ArrowForwardIosIcon />
                        </Button>
                    </Grid>

                </Grid>
            </Stack>
        </>
    );
};

export default RestingTimer;
