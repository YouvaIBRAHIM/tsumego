import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
} from "@mui/material"

import { ITsumegoProblemSearch } from "../../types/go.types"
import SearchField from "./SearchField"

const filterOptions: {
  label: string
  value: string
}[] = [
  {
    label: "Titre",
    value: "label",
  },
  {
    label: "Auteur",
    value: "author",
  },
]

interface ITableToolbar {
  setPerPage: (value: number) => void
  setLevel: (value: ITsumegoProblemSearch["level"]) => void
  setStatus: (value: ITsumegoProblemSearch["status"]) => void
  perPage: number
  level: string
  status: string
  search: ITsumegoProblemSearch
  updateSearch: (key: keyof ITsumegoProblemSearch, value: unknown) => void
}
const TableToolbar = ({
  setPerPage,
  setLevel,
  setStatus,
  perPage,
  level,
  status,
  search,
  updateSearch,
}: ITableToolbar) => {
  return (
    <Toolbar
      sx={{
        minHeight: 75,
        py: 2,
        pl: 1,
      }}
    >
      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
        <SearchField
          filterOptions={filterOptions}
          search={search}
          setSearch={updateSearch}
        />
        <FormControl size="small">
          <InputLabel id="perPageId">Par page</InputLabel>
          <Select
            labelId="perPageId"
            id="perPageId"
            value={String(perPage)}
            label="Par page"
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 125 }} size="small">
          <InputLabel id="LevelId">Niveau</InputLabel>
          <Select
            labelId="LevelId"
            id="LevelId"
            value={level}
            label="Niveau"
            onChange={(e) =>
              setLevel(e.target.value as ITsumegoProblemSearch["level"])
            }
          >
            <MenuItem value={"all"}>Tous les niveaux</MenuItem>
            <MenuItem value={"beginner"}>Débutant</MenuItem>
            <MenuItem value={"intermediate"}>Intermédiaire</MenuItem>
            <MenuItem value={"advanced"}>Avancé</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 125 }} size="small">
          <InputLabel id="statusId">Status</InputLabel>
          <Select
            labelId="statusId"
            id="statusId"
            value={status}
            label="Niveau"
            onChange={(e) =>
              setStatus(e.target.value as ITsumegoProblemSearch["status"])
            }
          >
            <MenuItem value={"all"}>Tous les status</MenuItem>
            <MenuItem value={"active"}>Visibles</MenuItem>
            <MenuItem value={"inactive"}>Inactifs</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Toolbar>
  )
}

export default TableToolbar
