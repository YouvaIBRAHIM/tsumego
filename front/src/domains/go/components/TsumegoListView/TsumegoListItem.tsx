import { Chip, IconButton, Tooltip, alpha, styled } from "@mui/material"
import Box from "@mui/material/Box"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

import { Check, Eye, Trash, X } from "@phosphor-icons/react"

import { Suspense } from "react"
import { useTsumegoList } from "../../services/hooks/tsumego.hook"
import { IProblem } from "../../types/go.types"
import TableSkeleton from "./TableSkeletons"
import Level from "../Level"
import { levelToNumber } from "../../services/utils.service"

interface ITsumegoListBody {
  problems: IProblem[]
  setTsumegoToModerate: (user: IProblem) => void
  setTsumegoToDelete: (user: IProblem) => void
}

const TsumegoListBody = ({
  problems,
  setTsumegoToModerate,
  setTsumegoToDelete,
}: ITsumegoListBody) => {
  const { onUpdateTsumegoStatus } = useTsumegoList()

  return (
    <Suspense fallback={<TableSkeleton rows={10} cells={5} />}>
      <TableBody>
        {problems?.map((problem: IProblem, index: number) => {
          const labelId = `enhanced-table-checkbox-${index}`
          return (
            <StyledTableRow role="checkbox" tabIndex={-1} key={problem.id}>
              <TableCell component="th" id={labelId} scope="problem">
                {problem.label}
              </TableCell>
              <TableCell align="left">{problem.author}</TableCell>
              <TableCell align="left">
                <Level level={levelToNumber(problem.level)} />
              </TableCell>
              <TableCell align="left">
                <Tooltip
                  title={problem.active ? "Rendre inactif" : "Rendre visible"}
                >
                  <Chip
                    color={problem.active ? "success" : "warning"}
                    icon={problem.active ? <Check size={16} /> : <X size={16} />}
                    label={problem.active ? "Visible" : "Inactif"}
                    clickable
                    onClick={() => onUpdateTsumegoStatus(problem.id)}
                  />
                </Tooltip>
              </TableCell>
              <TableCell align="left">
                <Box>
                  <Tooltip title="Voir">
                    <IconButton
                      aria-label="action"
                      size="small"
                      onClick={() => setTsumegoToModerate(problem)}
                      sx={{ ":hover": { color: "info.main" } }}
                    >
                      <Eye fontSize="inherit" weight="duotone" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      aria-label="action"
                      size="small"
                      onClick={() => setTsumegoToDelete(problem)}
                      sx={{ ":hover": { color: "error.main" } }}
                    >
                      <Trash fontSize="inherit" weight="duotone" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </StyledTableRow>
          )
        })}
      </TableBody>
    </Suspense>
  )
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.primary.main, 0.35)
        : alpha(theme.palette.primary.main, 0.75),
  },
}))

export default TsumegoListBody
