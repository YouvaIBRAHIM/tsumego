import { List, Paper, Stack } from "@mui/material"
import Search from "../Search"
import SelectFilter from "../SelectFilter"
import { ISearchState, ISelectDifficulty } from "../../types/go.types"

export interface IAsideListData{
    id: string
    label: string
    value: unknown
}

export interface IAsideList{
    list: JSX.Element,
    onChangeFilter: (value: string) => void,
    onChangeSearchValue: (value: string) => void,
    search: ISearchState
}

export const difficulties: ISelectDifficulty[] = [
    {
        label: "Toutes les difficultés",
        value: "all"
    },
    {
        label: "Facile",
        value: "beginner"
    },
    {
        label: "Intermediaire",
        value: "intermediate"
    },
    {
        label: "Difficile",
        value: "advanced"
    }
]

const AsideList = ({ list, onChangeFilter, onChangeSearchValue, search }: IAsideList) => {
    
    return (
        <Paper sx={{
            minHeight: "50vh",
            padding: 2
        }}>
            <Stack gap={2} px={1}>
                <Stack direction="row" gap={2}>
                    <Search onChange={onChangeSearchValue} />
                    <SelectFilter currentValue={search.difficulty} onChange={onChangeFilter} values={difficulties} />
                </Stack>       
            </Stack>

            <List sx={{
                overflow: "auto",
                maxHeight: "75vh",
                marginTop: 2
            }}>
                {list}
            </List>
        </Paper>
    )
}



export default AsideList
