import { Stack } from "@mui/material"

import { Star } from "@phosphor-icons/react"

interface ILevel {
  level: number
}

const levelColor = {
  color: "#fcbf49",
}

const Level = ({ level }: ILevel) => {
  return (
    <Stack direction="row" gap={1}>
      {Array.from({ length: 3 }, (_, i) => (
        <Star
          key={i}
          weight={i + 1 <= level ? "fill" : "regular"}
          {...(i + 1 <= level && levelColor)}
          size={14}
        />
      ))}
    </Stack>
  )
}

export default Level
