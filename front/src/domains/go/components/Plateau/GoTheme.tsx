import { Box, Button, Stack, alpha, styled } from "@mui/material"
import { themesColor } from "../../services/go/styles"
import { ITheme } from "../../types/go.types"

interface IGoTheme{
    currentTheme: keyof ITheme
    onChangeTheme: (newTheme: keyof ITheme) => void
}
const GoTheme = ({currentTheme, onChangeTheme}: IGoTheme) => {
    const themeKeys = Object.keys(themesColor) as Array<keyof ITheme>;

    return (
        <Stack direction="row" spacing={1} justifyContent="center">
            {
                themeKeys.map((theme) => (
                    <Theme selected={currentTheme === theme} key={theme} onClick={() => onChangeTheme(theme)}>
                        <Box 
                            sx={{
                                backgroundColor: themesColor[theme],
                                width: '24px',
                                height: '24px',
                                borderRadius: "50%",
                            }}
                        >
                        </Box>
                    </Theme>
                ))
            }
        </Stack>
    )
}


const Theme = styled(Button)<{selected: boolean}>(({ theme, selected }) => ({
    padding: 4,
    minWidth: "auto",
    ...(selected && {border: `${theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.5): alpha(theme.palette.common.black, 0.5)} 2px solid`}),
    borderRadius: "50%",
}))

export default GoTheme
