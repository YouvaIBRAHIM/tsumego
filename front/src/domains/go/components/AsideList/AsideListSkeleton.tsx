import { Paper, Skeleton } from "@mui/material"

const AsideListSkeleton = () => {
  return (
    <Paper
      sx={{
        minHeight: "50vh",
        padding: 2,
      }}
    >
      <Skeleton height={90} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
    </Paper>
  )
}

export default AsideListSkeleton
