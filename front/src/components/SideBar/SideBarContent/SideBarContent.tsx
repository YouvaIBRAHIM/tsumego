import { Box, Divider, List } from "@mui/material"

import { ISideBarContent } from "@components/SideBar/SideBarContent/ISideBarContent"
import SideBarListItem from "@components/SideBar/SideBarListItem/SideBarListItem"
import Switch from "@components/Switch"
import useIsAuthorized from "@src/components/hooks/useIsAuthorized"
import { useColorMode } from "@src/reducers/theme.reducer"

const DrawerContent = ({
  sideBarList,
}: ISideBarContent): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isAuthorized } = useIsAuthorized()

  return (
    <>
      {sideBarList && (
        <List>
          {sideBarList.map((sideBarListElement) => (
            <SideBarListItem
              sideBarListElement={sideBarListElement}
              key={sideBarListElement.id}
              isAuthorized={isAuthorized(sideBarListElement.roles)}
            />
          ))}
        </List>
      )}
      <Box
        sx={{
          marginTop: "auto",
        }}
      >
        <Divider />

        <Switch
          label={`Mode ${colorMode === "dark" ? "sombre" : "clair"}`}
          checked={colorMode === "dark" ? true : false}
          action={toggleColorMode}
          background={{
            backgroundImage: {
              checked: "/light-icon.svg",
              notChecked: "/dark-icon.svg",
            },
          }}
        />
      </Box>
    </>
  )
}
export default DrawerContent
