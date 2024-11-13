import { Box, Container, Grid2 } from '@mui/material';
import { ReactNode } from 'react';

type LayoutProps = {
  tabs?: ReactNode;
  connected?: boolean;
  tonConnectButton: ReactNode;
  calculator?: ReactNode;
  info?: ReactNode;
  error?: ReactNode;
};

export const Layout = ({
  connected,
  error,
  tabs,
  tonConnectButton,
  calculator,
  info,
}: LayoutProps) => {
  return (
    <Container maxWidth="xs">
      <Grid2 container direction="column" spacing={2} p={3} width="100%">
        {!connected && (
          <Box position="fixed" left="50%" top="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
            {tonConnectButton}
          </Box>
        )}

        {connected && (
          <Grid2 container justifyContent="flex-end" spacing={3}>
            {tonConnectButton}
          </Grid2>
        )}

        {tabs}
        {calculator}

        {error}

        {info}
      </Grid2>
    </Container>
  );
};
