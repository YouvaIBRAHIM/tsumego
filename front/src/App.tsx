import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import { getTheme } from '@services/theme.service';
import { useColorMode } from '@reducers/theme.reducer';
import Home from '@pages/Home.page';

function App() {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>

  )
}

export default App
