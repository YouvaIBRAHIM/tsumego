import { Autocomplete, Box, TextField } from '@mui/material';
import { AutoCompleteGoBoardPoint } from '../types/go.types';
import { useEffect, useState } from 'react';
import { IPlateau } from './Plateau/Plateau';

interface IAutoCompleteGoPoint {
    data: AutoCompleteGoBoardPoint[];
    currentChoice:string;
    setCurrentChoice: IPlateau['setCurrentChoice']
    canPlay: IPlateau['canPlay']
}
export default function AutoCompleteGoPoint({data, currentChoice, setCurrentChoice, canPlay} : IAutoCompleteGoPoint) {
    const [value, setValue] = useState<AutoCompleteGoBoardPoint | null>(null)

    useEffect(() => {
        if (currentChoice !== "") {
            setValue(() => data.filter((el) => el.label ===  currentChoice)[0])
        }else{
            setValue(null)
        }
    }, [currentChoice])

    const onChange = (value: AutoCompleteGoBoardPoint) => {
        setValue(value)
        setCurrentChoice(value.label)
    }
    return (
        <Box width={"100%"} maxWidth={300}>
            <Autocomplete
                disabled={!canPlay}
                disablePortal
                id="go-points-box"
                options={data}
                value={value}
                onChange={(_, newValue) => newValue && onChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Point" />}
            />
        </Box>
    );
}
