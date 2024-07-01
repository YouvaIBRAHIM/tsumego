import { ListItem, ListItemButton, ListItemText, Tooltip, alpha } from "@mui/material"
import { IAsideListData } from "./AsideList"
import { IProblem } from "../../types/go.types"
import { truncateString } from "@src/services/utils.service"
import Level from "../Level"
import { levelToNumber } from "../../services/utils.service"

export interface IProblemsAsideList {
  data: IAsideListData[] | null
  onSetCurrentItem: (value: IProblem) => void
  currentItemId: string | null
}

const ProblemsAsideList = ({
  data,
  onSetCurrentItem,
  currentItemId,
}: IProblemsAsideList) => {
  return (
    <>
      {data?.map((el) => {
        const value: IProblem = el.value as IProblem
        return (
          <ListItem
            key={el.id}
            disablePadding
            secondaryAction={<Level level={levelToNumber(value.level)} />}
          >
            <ListItemButton
              onClick={() => onSetCurrentItem(value)}
              sx={(theme) => ({
                ...(el.id === currentItemId && {
                  border: `2px solid ${theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5)}`,
                }),
                ...(value.won && {
                  backgroundColor: `${theme.palette.primary.dark}!important`,
                }),
                "&.MuiListItemButton-root": {
                  margin: 0.5,
                },
              })}
            >
              {value.label.length > 35 ? (
                <Tooltip title={value.label}>
                  <ListItemText
                    primary={truncateString(value.label, 35)}
                    secondary={value.author}
                  />
                </Tooltip>
              ) : (
                <ListItemText primary={value.label} secondary={value.author} />
              )}
            </ListItemButton>
          </ListItem>
        )
      })}
    </>
  )
}

export default ProblemsAsideList
