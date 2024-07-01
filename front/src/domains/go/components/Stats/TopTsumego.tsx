import { List, ListItem, ListItemButton, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Level from '../Level';
import { levelToNumber } from '../../services/utils.service';
import { truncateString } from '@src/services/utils.service';
import { IProblem } from '../../types/go.types';
import { useProblem } from '@src/reducers/problem.store';
import { useNavigate } from 'react-router-dom';

interface ITopTsumego{
    topProblems: IProblem[],
    topProblemsSortBy: 'recent' | 'popular',
    setTopProblemsSortBy: (value: 'recent' | 'popular') => void
}

const TopTsumego = ({topProblems, setTopProblemsSortBy, topProblemsSortBy}: ITopTsumego) => {

    const { setProblem } = useProblem()
    const navigate = useNavigate()

    const onSelectProblem = (problem: IProblem) => {
        setProblem(problem)
        navigate('/problems')
    }

    return (
        <Paper sx={{padding: 2}}>
            <Stack
                gap={2}
            >
                <Typography variant="h5">Aperçu des Tsumegos</Typography>
                <ButtonGroup fullWidth variant="contained">
                    <Button color={topProblemsSortBy === 'recent' ? 'primary' : 'secondary'} variant={topProblemsSortBy === 'recent' ? 'contained' : 'outlined'} onClick={() => setTopProblemsSortBy('recent')}>Récents</Button>
                    <Button color={topProblemsSortBy === 'popular' ? 'primary' : 'secondary'} variant={topProblemsSortBy === 'popular' ? 'contained' : 'outlined'}  onClick={() => setTopProblemsSortBy('popular')}>Populaires</Button>
                </ButtonGroup>
                <List>
                {
                    topProblems.slice(0, 10).map(el => {
                        return (
                        <ListItem 
                            key={el.id} 
                            disablePadding
                            secondaryAction={<Level level={levelToNumber(el.level)} />}
                        >
                            <ListItemButton 
                                onClick={() => onSelectProblem(el)}
                                sx={(theme) => ({
                                    ...(el.won && {
                                        backgroundColor: `${theme.palette.primary.dark}!important`,
                                    }),
                                    "&.MuiListItemButton-root": {
                                        margin: 0.5,
                                    },
                                })}
                            >
                                {el.label.length > 25 ? (
                                    <Tooltip title={el.label}>
                                    <ListItemText
                                        primary={truncateString(el.label, 25)}
                                        secondary={el.author}
                                    />
                                    </Tooltip>
                                ) : (
                                    <ListItemText primary={el.label} secondary={el.author} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    )})
                }
                </List>
            </Stack>
        </Paper>
    )
}

export default TopTsumego
