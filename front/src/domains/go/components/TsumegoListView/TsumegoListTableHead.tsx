import { Box, TableCell, TableRow } from "@mui/material"
import TableHead from "@mui/material/TableHead"
import TableSortLabel from "@mui/material/TableSortLabel"

import { visuallyHidden } from "@mui/utils"

import { ITsumegoProblemSearch } from "../../types/go.types"

const headCells = [
  {
    id: "label",
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: "Titre",
  },
  {
    id: "author",
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: "Auteur",
  },
  {
    id: "level",
    numeric: false,
    disablePadding: false,
    disableSort: true,
    label: "Niveau",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    disableSort: true,
    label: "Status",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    disableSort: true,
    label: "Actions",
  },
]

interface ITsumegoListTableHead {
  order: "asc" | "desc"
  orderBy: string
  onRequestSort: (property: ITsumegoProblemSearch["orderBy"]) => void
}
const TsumegoListTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: ITsumegoListTableHead) => {
  const createSortHandler = (
    property: ITsumegoProblemSearch["orderBy"],
    disableSort: boolean,
  ) => {
    if (!disableSort) {
      onRequestSort(property)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon={headCell.disableSort}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={() =>
                createSortHandler(
                  headCell.id as ITsumegoProblemSearch["orderBy"],
                  headCell.disableSort,
                )
              }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TsumegoListTableHead
