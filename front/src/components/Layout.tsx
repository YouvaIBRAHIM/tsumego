import { Box } from "@mui/system"
import Header from "@src/components/Header/Header"
import SideBar from "@src/components/SideBar/SideBar"
import { Outlet } from "react-router-dom"

function Layout() {

    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                }}
            >
            <SideBar />
            <main
                style={{
                    width: '100%'
                }}
            >  
                <Outlet />
            </main>
            </Box>
        </Box>
  )
}

export default Layout
