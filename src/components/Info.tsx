import { Grid2 as Grid, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

type InfoProps = {
  availableBalance?: ReactNode;
  walletBalance?: ReactNode;
  tsTonRate?: ReactNode;
  tsTonPrice?: ReactNode;
  tonPrice?: ReactNode;
};

export const Info = ({
  availableBalance,
  walletBalance,
  tsTonRate,
  tsTonPrice,
  tonPrice,
}: InfoProps) => (
  <Paper elevation={0}>
    <Grid container direction="column" spacing={1}>
      {availableBalance && (
        <Grid container justifyContent="space-between">
          <Typography color="textSecondary" variant="body1">
            Available to stake
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {availableBalance} TON
          </Typography>
        </Grid>
      )}

      {walletBalance && (
        <Grid container justifyContent="space-between">
          <Typography color="textSecondary" variant="body1">
            Your balance
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {walletBalance} TON
          </Typography>
        </Grid>
      )}

      {tsTonRate && (
        <Grid container justifyContent="space-between">
          <Typography color="textSecondary" variant="body1">
            tsTON / TON
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {tsTonRate} TON
          </Typography>
        </Grid>
      )}

      {tonPrice && (
        <Grid container justifyContent="space-between">
          <Typography color="textSecondary" variant="body1">
            TON / USD
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {tonPrice} USD
          </Typography>
        </Grid>
      )}

      {tsTonPrice && (
        <Grid container justifyContent="space-between">
          <Typography color="textSecondary" variant="body1">
            tsTon / USD
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {tsTonPrice} USD
          </Typography>
        </Grid>
      )}
    </Grid>
  </Paper>
);
