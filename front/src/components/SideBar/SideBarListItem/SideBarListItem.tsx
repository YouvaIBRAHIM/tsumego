import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import ArrowTooltips from "@components/ArrowTooltips"
import { ISideBarListItem } from "@components/SideBar/SideBarListItem/ISideBarListItem"
import { sideBarConst } from "@services/constants.service"
import { truncateString } from "@services/utils.service"
import { useSideBar } from "@src/reducers/sidebar.reducer"
import { useNavigate } from "react-router-dom"

const SideBarListItem = ({
  sideBarListElement,
  isAuthorized,
}: {
  sideBarListElement: ISideBarListItem
  isAuthorized: boolean
}) => {
  const { isOpen } = useSideBar()
  const navigate = useNavigate()

  const onHandleClick = () => {
    if (sideBarListElement?.link) {
      navigate(sideBarListElement.link)
    } else if (sideBarListElement?.action) {
      sideBarListElement.action()
    }
  }
  return (
    <ArrowTooltips
      title={sideBarListElement.label}
      labelMaxLength={sideBarConst.labelMaxLength}
      disableHoverListener={isOpen}
    >
      <ListItem
        key={sideBarListElement.id}
        disablePadding
        sx={{ display: isAuthorized ? "block" : "none" }}
        onClick={onHandleClick}
      >
        <ListItemButton
          sx={{
            justifyContent: isOpen ? "initial" : "center",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {sideBarListElement.icon}
          </ListItemIcon>
          <ListItemText
            primary={truncateString(
              sideBarListElement.label,
              sideBarConst.labelMaxLength,
            )}
            sx={{ opacity: isOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </ArrowTooltips>
  )
}

export default SideBarListItem
