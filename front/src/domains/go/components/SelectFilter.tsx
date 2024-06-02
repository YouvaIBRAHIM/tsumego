import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import { ISelectValue } from '../types/go.types';

interface ISelectFilter{
    values: ISelectValue[],
    onChange: (value: string) => void,
    currentValue: string
}

export default function SelectFilter({values, onChange, currentValue}: ISelectFilter) {

    const onHandleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value)
    }

    return (
        <Box>
            <FormControl size="small" sx={{maxWidth: 100}}>
                <InputLabel id="filter-label">Filtre</InputLabel>
                <Select
                    labelId="filter-label"
                    id="filter-select"
                    value={currentValue}
                    label="Filtre"
                    onChange={onHandleChange}
                >
                    {
                        values.map((val, index) => (
                            <MenuItem key={index} value={val.value}>{val.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
