import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { MagnifyingGlass } from '@phosphor-icons/react';

const SearchInput = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.45),
    },
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',

    },
}));

export default function Search() {

    return (
        <SearchInput>
            <SearchIconWrapper>
                <MagnifyingGlass />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Rechercher"
                inputProps={{ 'aria-label': 'search' }}
            />
        </SearchInput>
    )
}

