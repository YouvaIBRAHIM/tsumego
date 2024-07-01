import { Paper, Skeleton, Stack } from "@mui/material"

const MyScoreSkeleton = () => {
  return (
    <Paper>
      <Stack direction="column" alignItems="center" gap={1} p={3}>
        <Skeleton width="100%" height={25} variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton width="100%" height={50} variant="text" sx={{ fontSize: "3rem" }} />
      </Stack>
    </Paper>
  )
}

export default MyScoreSkeleton
