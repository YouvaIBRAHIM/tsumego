import { ListItem, ListItemButton, ListItemText, alpha } from "@mui/material"
import { IAsideListData } from "./AsideList"

export interface IProblemAsideListData extends IAsideListData{
    meta?: {
        won: boolean
    }
}
export interface IProblemsAsideList{
    data: IProblemAsideListData[] | null,
    onSetCurrentItem: (value: IProblemAsideListData) => void,
    currentItemId: string | undefined
}

const ProblemsAsideList = ({data, onSetCurrentItem, currentItemId}: IProblemsAsideList) => {

    return (
        <>
        {
            data?.map(el => (
                <ListItem key={el.id} disablePadding>
                    <ListItemButton 
                        onClick={() => onSetCurrentItem(el)}
                        sx={(theme) => ({
                            ...(el.id === currentItemId && {
                                border: `2px solid ${theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5)}`
                            }),
                            ...(el.meta && el.meta.won && {
                                backgroundColor: `${theme.palette.success.light}!important`
                            })
                        })}
                    >
                        <ListItemText primary={el.label} />
                    </ListItemButton>
                </ListItem>
            ))
        }
        </>
    )
}



export default ProblemsAsideList
