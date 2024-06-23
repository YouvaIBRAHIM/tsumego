import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useMemo } from 'react';
import { getTheme } from '@services/theme.service';
import { useColorMode } from '@reducers/theme.reducer';
import { RouterProvider } from 'react-router-dom';
import router from '@routers/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@reducers/auth.reducer';

const queryClient = new QueryClient()

function App() {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode])

  const {initializeAuth} = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

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
