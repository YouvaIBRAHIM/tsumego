import { useEffect, useState } from "react"

import { Box, Grid, Stack, Theme, Typography, useMediaQuery } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import { transformProblemToGoState } from "../../services/global.service"
import { IProblem, ITheme } from "../../types/go.types"
import Go from "../Plateau/Go"
import { IPlateau } from "../Plateau/Plateau"
import CustomSwitch from "../Switch"
import Level from "../Level"
import { levelToNumber } from "../../services/utils.service"

interface ITsumegoModal {
  open: boolean
  title: string
  onChangeStatus: (problemId: string) => void
  onCancelation: () => void
  problem: IProblem
}

const TsumegoModal = ({
  open,
  title,
  onCancelation,
  onChangeStatus,
  problem,
}: ITsumegoModal) => {
  const [defaultGoState, setDefaultGoState] = useState<IPlateau["defaultState"]>()

  useEffect(() => {
    setDefaultGoState(transformProblemToGoState(problem))
  }, [problem])

  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  )

  return (
    <Dialog
      open={open}
      onClose={() => onCancelation()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent
        sx={{
          minHeight: "20vh",
        }}
      >
        <Grid
          container
          spacing={4}
          direction={isMobileScreen ? "column-reverse" : "row"}
        >
          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              minWidth: isMobileScreen ? "300px" : "350px",
            }}
          >
            {defaultGoState && (
              <Box>
                <Go
                  theme={
                    (localStorage.getItem("goTheme") as keyof ITheme) ?? "paper"
                  }
                  position={{
                    ...defaultGoState.position,
                    ...{ [problem.SOL[1]]: defaultGoState.nextToPlay },
                  }}
                  markers={{ [problem.SOL[1]]: "circle" }}
                  nextToPlay={defaultGoState.nextToPlay}
                  onIntersectionClick={() => {}}
                  hideBorder={false}
                  zoom={null}
                  size={defaultGoState.size}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Stack>
              <Typography variant="h4" component="div">
                {problem.label}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                <Level level={levelToNumber(problem.level)} />
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Status :
                </Typography>
                &nbsp;
                <Typography sx={{ fontSize: 14 }}>
                  {problem.active ? "visible" : "inactif"}
                </Typography>
                &nbsp;
                <CustomSwitch
                  checked={Boolean(problem.active)}
                  handleChange={() => onChangeStatus(problem.id)}
                />
              </Stack>

              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Description
              </Typography>
              <Typography variant="h5" component="div">
                {problem.C}
              </Typography>
              <Stack direction="row" sx={{ fontSize: 14, mt: 1.5 }}>
                <Typography color="text.secondary">par</Typography>
                &nbsp;
                <Typography>{problem.author}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => onCancelation()}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TsumegoModal
