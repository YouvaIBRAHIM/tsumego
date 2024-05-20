import { Autocomplete, Box, TextField } from '@mui/material';
import { AutoCompleteGoBoardPoint } from '../types/go.types';

export default function AutoCompleteGoPoint({data} : {data: AutoCompleteGoBoardPoint[]}) {

    return (
        <Box>
            <Autocomplete
                disablePortal
                id="go-points-box"
                options={data}
                renderInput={(params) => <TextField {...params} label="Point" />}
            />
        </Box>
    );
}
