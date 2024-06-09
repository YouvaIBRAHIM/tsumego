import { Autocomplete, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface IUserRole{
    label: string,
}

const userRoles: IUserRole[] = [
    {
        label: "admin",
    },
    {
        label: "editor",
    },
    {
        label: "player",
    }
]

interface ITsumegoModal{
    open: boolean
    title: string
    onConfirmation: (roles: string[]) => void
    onCancelation: () => void
    roles: string[]
}

const TsumegoModal = ({open, title, onCancelation, onConfirmation, roles}: ITsumegoModal) => {
    const [selectRoles, setSelectedRoles] = useState(roles)

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
                    minHeight: "20vh",
                }}
            >
                <Autocomplete
                    sx={{
                        my:2
                    }}
                    multiple
                    disablePortal
                    id="roles"
                    options={userRoles}
                    value={userRoles.filter(el => selectRoles.includes(el.label))}
                    onChange={(_, newValue) => newValue && setSelectedRoles(newValue.map(el => el.label))}
                    renderInput={(params) => <TextField {...params} label="Rôles" />}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => onCancelation()}>Annuler</Button>
                <Button disabled={selectRoles.length === 0} variant='contained' onClick={() => onConfirmation(selectRoles)} autoFocus>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default TsumegoModal