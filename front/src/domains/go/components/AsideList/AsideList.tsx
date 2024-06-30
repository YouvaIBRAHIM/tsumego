import { List, Pagination, Stack } from "@mui/material"

export interface IAsideListData {
  id: string
  label: string
  value: unknown
}

export interface IAsideList {
  list: JSX.Element
  page: number
  perPage: number
  total: number
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void
}

const AsideList = ({ list, total, perPage, page, handleChangePage }: IAsideList) => {
  return (
    <Stack>
      <List
        sx={{
          overflow: "auto",
          maxHeight: "75vh",
        }}
      >
        {list}
      </List>

      <Pagination
        color="primary"
        count={Math.ceil(total / perPage)}
        page={Number(page)}
        siblingCount={5}
        onChange={handleChangePage}
      />
    </Stack>
  )
}

export default AsideList
