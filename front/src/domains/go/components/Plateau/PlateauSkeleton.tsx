import { Paper, Skeleton } from "@mui/material"

const PlateauSkeleton = () => {
  return (
    <Paper>
      <Skeleton
        sx={{
          width: "100%",
          aspectRatio: "4/3",
          transform: "inherit",
        }}
      />
    </Paper>
  )
}

export default PlateauSkeleton
