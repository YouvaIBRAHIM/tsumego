import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Toolbar } from "@mui/material";
import SearchField from "@src/components/TsumegoListView/SearchField";
import { ITsumegoProblemSearch } from "@src/types/tsumego.type";

const filterOptions:{
  label: string,
  value: string
}[] = [
  {
    label: "Titre",
    value: "title"
  },
  {
    label: "Auteur",
    value: "author"
  },
]

interface ITableToolbar{
  setPerPage: (value: number) => void,
  setLevel: (value: ITsumegoProblemSearch["level"]) => void,
  perPage: number,
  level: string,
  search: ITsumegoProblemSearch,
  updateSearch: (key: keyof ITsumegoProblemSearch, value: unknown) => void
}
const TableToolbar = ({ 
  setPerPage,
  setLevel,
  perPage,
  level,
  search,
  updateSearch
}: ITableToolbar) => {
  
    const handleChangePerPage = (e: SelectChangeEvent) => {
      setPerPage(Number(e.target.value))
    }
    const handleChangeLevel = (e: SelectChangeEvent) => {
      setLevel(e.target.value as ITsumegoProblemSearch["level"])
    }


    return (
      <Toolbar
        sx={{
          minHeight: 75,
          py: 2,
          pl:1
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          gap={4}
        >
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
                onChange={handleChangePerPage}
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
                onChange={handleChangeLevel}
              >
                <MenuItem value={"all"}>Tous les niveaux</MenuItem>
                <MenuItem value={"beginner"}>Débutant</MenuItem>
                <MenuItem value={"intermediate"}>Intermédiaire</MenuItem>
                <MenuItem value={"advanced"}>Avancé</MenuItem>
              </Select>
            </FormControl>
          </Stack>
      </Toolbar>
    );
}

export default TableToolbar;
  