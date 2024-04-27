import { Box, Container } from "@mui/material"
import Header from "@components/Header/Header"
import SideBar from "@components/SideBar/SideBar"

function Home() {

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
                    width: '100%',
                }}
            >
                <Container className="mainPageContainer" maxWidth="xxl">
                    Hello
                </Container>
            </main>
        </Box>
    </Box>
  )
}

export default Home
