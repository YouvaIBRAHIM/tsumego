import Switch from '@mui/material/Switch';

interface ISwitch {
    checked: boolean;
    handleChange: () => void
}
const CustomSwitch = ({checked, handleChange} : ISwitch) => {

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

export default CustomSwitch