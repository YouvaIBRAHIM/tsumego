import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';

export default function SelectFilter() {

    return (
        <Box>
            <FormControl size="small">
                <InputLabel id="filter-label">Filtre</InputLabel>
                <Select
                    labelId="filter-label"
                    id="filter-select"
                    value={0}
                    autoWidth
                    label="Filtre"
                >
                    <MenuItem value={0}>Tout</MenuItem>
                    <MenuItem value={10}>Facile</MenuItem>
                    <MenuItem value={10}>Intermediaire</MenuItem>
                    <MenuItem value={10}>Difficile</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
