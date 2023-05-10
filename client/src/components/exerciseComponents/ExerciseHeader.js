import React from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const ExerciseHeader = ({exName, exImage, exDescription}) => {
    return (
        <>
            <Stack spacing={1}>
                <Typography variant='h5'>
                    {exName}
                </Typography>
                <Avatar sx={{ width: "85%", height: "85%", maxWidth: 400, maxHeight: 400 }} src={`/images/${exImage}`} />
                <Typography variant='subtitle1'>
                    {exDescription}
                </Typography>
            </Stack>
        </>
    );
}

export default ExerciseHeader;