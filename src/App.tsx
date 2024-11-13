import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

import { Stake } from './components/Stake';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0460a9',
    },
  },
});

export const App = () => (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <TonConnectUIProvider manifestUrl={import.meta.env.VITE_MANIFEST_URL}>
        <QueryClientProvider client={queryClient}>
          <Stake />
        </QueryClientProvider>
      </TonConnectUIProvider>
      <CssBaseline enableColorScheme />
    </ThemeProvider>
  </StrictMode>
);
