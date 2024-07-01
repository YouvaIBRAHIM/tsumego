import { Stack, Typography, TypographyOwnProps } from "@mui/material"
import { Crown } from "@phosphor-icons/react"


const Score = ({fontSize, score, typoVariant}: { fontSize: number, score: number, typoVariant?: TypographyOwnProps['variant'] }) => {

    return (
        <Stack direction='row' alignItems='center' gap={1}>
            <Crown color='#fcbf49' size={fontSize} weight="fill" />
            <Typography variant={typoVariant ?? 'body1'} fontSize={fontSize}>
                {score}
            </Typography>
        </Stack>
    )
}

export default Score