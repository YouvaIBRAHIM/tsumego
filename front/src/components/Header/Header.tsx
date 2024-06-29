import { useMemo } from "react"

import { Avatar, ListItemIcon, Stack, Theme, useMediaQuery } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import Menu from "@components/Menu"
import { SignOut, User } from "@phosphor-icons/react"
import { useAuthStore } from "@src/reducers/auth.reducer"
import { truncateString } from "@src/services/utils.service"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  )

  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const menu = useMemo(
    () => ({
      label: "Menu",
      openIcon: <Avatar sx={{ width: 32, height: 32 }}>{user?.username[0]}</Avatar>,
      options: [
        [
          {
            label: "Mon compte",
            icon: (
              <Avatar>
                <User size={24} />
              </Avatar>
            ),
            action: () => navigate("/profile"),
          },
        ],
        [
          {
            label: "Se déconnecter",
            icon: (
              <ListItemIcon sx={(theme) => ({ color: theme.palette.error.main })}>
                <SignOut size={24} />
              </ListItemIcon>
            ),
            action: () => logout(),
          },
        ],
      ],
    }),
    [user],
  )

  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack
            width={"100%"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography variant="h6">Header</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography>
                {isMobileScreen
                  ? truncateString(user?.username ?? "", 20)
                  : user?.username}
              </Typography>
              <Menu {...menu} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
