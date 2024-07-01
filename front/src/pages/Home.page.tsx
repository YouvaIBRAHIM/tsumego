import { Grid, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import ChartSkeleton from '@src/domains/go/components/Skeletons/ChartSkeleton';
import ListSkeleton from '@src/domains/go/components/Skeletons/ListSkeleton';
import MyScoreSkeleton from '@src/domains/go/components/Skeletons/MyScoreSkeleton';
import ProgressionSkeleton from '@src/domains/go/components/Skeletons/ProgressionSkeleton';
import MyScore from '@src/domains/go/components/Stats/MyScore';
import MyTsumegoProblemsChart from '@src/domains/go/components/Stats/MyTsumegoProblemsChart';
import Progression from '@src/domains/go/components/Stats/Progression';
import TopPlayer from '@src/domains/go/components/Stats/TopPlayer';
import TopTsumego from '@src/domains/go/components/Stats/TopTsumego';
import { useStats } from '@src/services/hooks/stats.hook';

export default function Home() {


    const  {
        user,
        topPlayers,
        isFetchingTopPlayers,
        userProgression,
        isFetchingUserProgression,
        topProblems,
        isFetchingTopProblems,
        topProblemsSortBy,
        onHandleSetTopProblemsSortBy,
        problemsSuccessRate,
        isFetchingProblemsSuccessRate
    } = useStats()

    return (    
    <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
            <Stack spacing={4}>
                {
                    user 
                    ?
                    <MyScore score={user.score} />
                    :
                    <MyScoreSkeleton />
                }
                {
                    !isFetchingTopPlayers && topPlayers
                    ?
                    <TopPlayer topPlayers={topPlayers} />
                    :
                    <Paper sx={{p:2}}>
                        <ListSkeleton />
                    </Paper>
                }
            </Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
            <Stack spacing={4}> 
                {
                    !isFetchingUserProgression && userProgression
                    ?
                    <Progression userProgression={userProgression} />
                    :
                    <ProgressionSkeleton />
                    
                }
                {
                    !isFetchingProblemsSuccessRate && problemsSuccessRate
                    ?
                    <MyTsumegoProblemsChart problemsSuccessRate={problemsSuccessRate} />
                    :
                    <ChartSkeleton />
                }
            </Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
            
            {
                !isFetchingTopProblems && topProblems
                ?
                <TopTsumego 
                    {...{
                        topProblems,
                        topProblemsSortBy,
                        setTopProblemsSortBy: onHandleSetTopProblemsSortBy
                    }}
                />
                :
                <Paper sx={{p:2}}>
                    <ListSkeleton />
                </Paper>
            }
        </Grid>
    </Grid>
    )
}
