import { Paper, Skeleton, Stack } from "@mui/material"

const ProgressionSkeleton = () => {
  return (
    <Paper>
      <Stack direction="column" alignItems="center" gap={1} p={3}>
        <Skeleton width="100%" height={25} variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="circular" width={150} height={150} />
      </Stack>
    </Paper>
  )
}

export default ProgressionSkeleton
