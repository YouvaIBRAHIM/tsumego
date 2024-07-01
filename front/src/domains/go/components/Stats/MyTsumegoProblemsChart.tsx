import { Paper, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { IMyTsumegoProblemsChart } from '@src/types/stats.type';


const MyTsumegoProblemsChart = ({problemsSuccessRate} : IMyTsumegoProblemsChart) => {
    return (
        <Paper sx={{padding: 2}}>
            <Stack
                minHeight={350}
                gap={2}
            >
                <Typography variant="h5">Taux de réussites sur mes problèmes Tsumego</Typography>
                <BarChart
                    series={[
                        { data: problemsSuccessRate[0], stack: 'total', label: 'Réussi' },
                        { data: problemsSuccessRate[1], stack: 'total', label: 'Échoué' },
                    ]}
                    xAxis={[{ data: problemsSuccessRate[2], scaleType: 'band' as const }]}
                    colors={['#006BD6', '#EC407A']}
                />
            </Stack>
        </Paper>
    );
}

export default MyTsumegoProblemsChart