import { Paper, Stack, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { IUserProgression } from '@src/types/stats.type';

const Progression = ({userProgression}: {userProgression: IUserProgression}) => {

    return (
        <Paper sx={{padding: 2}}>
            <Stack
                height={200}
                gap={2}
            >
                <Typography variant="h5">Progression sur les problèmes de Tsumego</Typography>
                <Gauge
                    value={userProgression.won}
                    valueMax={userProgression.total}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                        transform: 'translate(0px, 0px)',
                    },
                    }}
                    text={
                    ({ value, valueMax }) => `${value} / ${valueMax}`
                    }
                />
            </Stack>
        </Paper>
    )
}

export default Progression
