import { Paper, Stack, Typography } from '@mui/material';
import Score from './Score';

const MyScore = ({score} : {score: number}) => {

    return (
        <Paper sx={{padding: 2}}>
            <Stack
                height={75}
                gap={2}
                alignItems='center'
            >
                <Typography variant="h5">Score actuel</Typography>
                <Score fontSize={36} score={score} />
            </Stack>
        </Paper>
    )
}

export default MyScore
