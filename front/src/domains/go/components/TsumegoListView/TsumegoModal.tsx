import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ITheme, IProblem } from '../../types/go.types';
import { transformProblemToGoState } from '../../services/global.service';
import { IPlateau } from '../Plateau/Plateau';
import Go from '../Plateau/Go';


interface ITsumegoModal{
    open: boolean
    title: string
    onConfirmation: (roles: string[]) => void
    onCancelation: () => void
    problem: IProblem
}

const TsumegoModal = ({open, title, onCancelation, onConfirmation, problem}: ITsumegoModal) => {

    const [defaultGoState, setDefaultGoState] = useState<IPlateau['defaultState']>()

    useEffect(() => {
        setDefaultGoState(transformProblemToGoState(problem))
    }, [])

    const isMobileScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    
    return (

        <Dialog
            open={open}
            onClose={() => onCancelation()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent
                sx={{
                    minHeight: "20vh"
                }}
            >
                <Grid container spacing={4} direction={isMobileScreen ? "column-reverse" : "row"}>
                    <Grid item xs={12} sm={8}>
                        {
                            defaultGoState &&
                            <Box
                                sx={{
                                    minWidth: isMobileScreen ? "300px" : "350px"
                                }}
                            >
                                <Go
                                    theme={localStorage.getItem("goTheme") as keyof ITheme ?? "paper"}
                                    position={{...defaultGoState.position, ...{[problem.SOL[0][1]]: defaultGoState.nextToPlay}}}
                                    markers={{[problem.SOL[0][1]]: "circle"}}
                                    nextToPlay={defaultGoState.nextToPlay}
                                    onIntersectionClick={() => {}}
                                    hideBorder={false}
                                    zoom={null}
                                    size={defaultGoState.size}
                                />
                            </Box>
                        }
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Stack>
                            <Typography variant="h4" component="div">
                                {problem.label}
                            </Typography>
                            <Typography sx={{fontSize: 14}}>
                                {problem.level}
                            </Typography>
                            <Stack direction="row">
                                <Typography sx={{fontSize: 14}} color="text.secondary">
                                    Status : 
                                </Typography>
                                &nbsp;
                                <Typography sx={{fontSize: 14}}>
                                    {problem.active ? "visible" : "inactif"}
                                </Typography>
                            </Stack>

                            <Typography sx={{ mt: 1.5 }} color="text.secondary">
                                Description
                            </Typography>
                            <Typography variant="h5" component="div">
                                {problem.C}
                            </Typography>
                            <Stack direction="row" sx={{fontSize: 14, mt: 1.5}}>
                                <Typography color="text.secondary">
                                    par 
                                </Typography>
                                &nbsp;
                                <Typography>
                                    {problem.author}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => onCancelation()}>Annuler</Button>
                <Button variant='contained' onClick={() => onConfirmation([])} autoFocus>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default TsumegoModal