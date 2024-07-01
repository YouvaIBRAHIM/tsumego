import { Skeleton, Stack } from "@mui/material"

const ListSkeleton = () => {
  return (
    <Stack
      p={0.5}
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
      <Skeleton height={60} />
    </Stack>
  )
}

export default ListSkeleton
