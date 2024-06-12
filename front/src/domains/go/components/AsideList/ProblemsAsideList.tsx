import { ListItem, ListItemButton, ListItemText, alpha } from "@mui/material"
import { IAsideListData } from "./AsideList"
import { IProblem } from "../../types/go.types"

export interface IProblemsAsideList{
    data: IAsideListData[] | null,
    onSetCurrentItem: (value: IProblem) => void,
    currentItemId: string | undefined
}

const ProblemsAsideList = ({data, onSetCurrentItem, currentItemId}: IProblemsAsideList) => {

    return (
        <>
        {
            data?.map(el => {
                const value: IProblem = el.value as IProblem;
                return (
                <ListItem key={el.id} disablePadding>
                    <ListItemButton 
                        onClick={() => onSetCurrentItem(value)}
                        sx={(theme) => ({
                            ...(el.id === currentItemId && {
                                border: `2px solid ${theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5)}`
                            }),
                            ...(value.won && {
                                backgroundColor: `${theme.palette.success.light}!important`
                            })
                        })}
                    >
                        <ListItemText primary={el.label} />
                    </ListItemButton>
                </ListItem>
            )})
        }
        </>
    )
}



export default ProblemsAsideList
