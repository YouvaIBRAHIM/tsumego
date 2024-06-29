import { alpha, styled } from "@mui/material/styles"

import { InputBase } from "@mui/material"

import { MagnifyingGlass } from "@phosphor-icons/react"

const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  width: "100%",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}))

interface ISearch {
  onChange: (value: string) => void
}
export default function Search({ onChange }: ISearch) {
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <SearchInput>
      <SearchIconWrapper>
        <MagnifyingGlass />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Rechercher"
        inputProps={{ "aria-label": "search" }}
        onChange={onHandleChange}
      />
    </SearchInput>
  )
}
