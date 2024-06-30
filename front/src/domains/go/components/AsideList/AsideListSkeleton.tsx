import { Skeleton, Stack } from "@mui/material"

const AsideListSkeleton = () => {
  return (
    <Stack
      p={2}
      sx={{
        minHeight: "50vh",
      }}
    >
      <Skeleton height={90} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
    </Stack>
  )
}

export default AsideListSkeleton
