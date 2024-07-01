import { Paper, Skeleton, Stack } from "@mui/material"

const ChartSkeleton = () => {
  return (
    <Paper sx={{p:2}}>
      <Stack direction="column" alignItems="center" gap={1} p={3}>
        <Skeleton width="100%" height={40} variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton
          sx={{
            width: "100%",
            aspectRatio: "2/1",
            transform: "inherit",
          }}
        />
      </Stack>

    </Paper>
  )
}

export default ChartSkeleton
