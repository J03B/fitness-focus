import React from "react";

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#e234f',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
}));

const PromptLogin = ({ prompt }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Grid item >
                <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
                    <Item>Create Account/Login {prompt}</Item>
                </Typography>
            </Grid>

        </Grid>
    );
};

export default PromptLogin;
