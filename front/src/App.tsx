import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import { getTheme } from '@services/theme.service';
import { useColorMode } from '@reducers/theme.reducer';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routers/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
