import { Alert, Button, Grid2 as Grid, Paper, Slider, Typography } from '@mui/material';
import { useState } from 'react';

type CalculatorProps = {
  tsTonRate: number;
  mode: 'stake' | 'unstake';
  onSubmit: (amount: number) => void;
  min: number;
  max: number;
};

export const Calculator = ({ min, max, onSubmit, tsTonRate, mode }: CalculatorProps) => {
  const [amount, setAmount] = useState(max);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(amount);
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Paper sx={{ backgroundColor: '#F5F9FC', p: 3, borderRadius: 2 }} elevation={0}>
          <Grid container direction="column" spacing={1}>
            <Slider
              value={amount}
              onChange={(_, value) => typeof value === 'number' && setAmount(value)}
              aria-label="Amount"
              valueLabelDisplay="off"
              step={0.01}
              min={min}
              max={max}
            />

            <Grid container justifyContent="space-between" spacing="none" alignItems="flex-start">
              <Grid container direction="column" width="50%">
                <Typography pt={1} variant="body1" color="textSecondary">
                  You {mode === 'stake' ? 'stake' : 'unstake'}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {amount.toFixed(2)}&nbsp;
                  <Typography component="span" color="textSecondary">
                    TON
                  </Typography>
                </Typography>
              </Grid>

              <Grid container>
                <Button
                  type="button"
                  variant="text"
                  disabled={max === 0}
                  onClick={() => {
                    if (mode === 'stake') {
                      return setAmount(max < 1 ? 1 : max);
                    }

                    return setAmount(max);
                  }}
                >
                  Use MAX
                </Button>
              </Grid>
            </Grid>

            {mode === 'stake' && (
              <Grid container justifyContent="space-between">
                <Typography variant="body1" color="textSecondary">
                  You get
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {(amount / tsTonRate).toFixed(2)} tsTON
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>

        {mode === 'stake' && max < 1 && (
          <Alert variant="outlined" color="error">
            You need to have at least 1 TON to stake
          </Alert>
        )}

        {mode === 'unstake' && max < 0.01 && (
          <Alert variant="outlined" color="error">
            You need to have at least 0.01 TON to unstake
          </Alert>
        )}

        <Button
          disabled={(mode === 'stake' && max < 1) || (mode === 'unstake' && max < 0.01)}
          type="submit"
          variant="contained"
          size="large"
          fullWidth
        >
          {mode === 'stake' ? 'Stake' : 'Unstake'}
        </Button>
      </Grid>
    </form>
  );
};
