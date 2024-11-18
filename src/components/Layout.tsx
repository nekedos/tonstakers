import { Container, Grid2 } from '@mui/material';
import { ReactNode } from 'react';

type LayoutProps = {
  tonConnect: ReactNode;
  tabs?: ReactNode;
  calculator?: ReactNode;
  info?: ReactNode;
  error?: ReactNode;
};

export const Layout = ({ error, tabs, tonConnect, calculator, info }: LayoutProps) => (
  <Container maxWidth="xs">
    <Grid2 container direction="column" spacing={2} p={3} width="100%">
      {tonConnect}
      {tabs}
      {calculator}
      {error}
      {info}
    </Grid2>
  </Container>
);
