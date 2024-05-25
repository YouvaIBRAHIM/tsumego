import { Autocomplete, Box, TextField } from '@mui/material';
import { AutoCompleteGoBoardPoint } from '../types/go.types';
import { useEffect, useState } from 'react';
import { IPlateau } from './Plateau/Plateau';

interface IAutoCompleteGoPoint {
    data: AutoCompleteGoBoardPoint[];
    currentPoint:string;
    setCurrentChoice: IPlateau['setCurrentChoice']
    canPlay: IPlateau['canPlay']
}
export default function AutoCompleteGoPoint({data, currentPoint, setCurrentChoice, canPlay} : IAutoCompleteGoPoint) {
    const [value, setValue] = useState<AutoCompleteGoBoardPoint | null>(null)

    useEffect(() => {
        if (currentPoint !== "") {
            setValue(() => data.filter((el) => el.label ===  currentPoint)[0])
        }
    }, [currentPoint])

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
