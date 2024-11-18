import { Alert, Box, Grid2, Tab, Tabs } from '@mui/material';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useState } from 'react';

import { useAsset } from '../hooks/useAsset';
import { useStake, useTonstakers, useUnstake } from '../hooks/useTonStakers';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { Calculator } from './Calculator';
import { Info } from './Info';
import { Layout } from './Layout';

export const Stake = () => {
  const [mode, setMode] = useState<'stake' | 'unstake'>('stake');

  const [tonConnectUI] = useTonConnectUI();

  const { data: tonAsset, error: tonAssetError } = useAsset('ton');
  const { data: tsTonAsset, error: tsTonAssetError } = useAsset('tsTon');

  const { data: tonStakers, error: tonStakersError } = useTonstakers();
  const { data: walletBalance, error: walletBalanceError } = useWalletBalance();

  const { mutate: stake, error: stakeError } = useStake();
  const { mutate: unstake, error: unstakeError } = useUnstake();

  const connected = tonConnectUI.connected;
  const tsTonRate = tonStakers?.rates.tsTONTON;

  const error =
    tonAssetError ||
    tsTonAssetError ||
    tonStakersError ||
    walletBalanceError ||
    stakeError ||
    unstakeError;

  if (!connected) {
    return (
      <Layout
        tonConnect={
          <Box position="fixed" left="50%" top="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
            <TonConnectButton />
          </Box>
        }
      />
    );
  }

  return (
    <Layout
      tonConnect={
        <Grid2 container justifyContent="flex-end" spacing={3}>
          <TonConnectButton />
        </Grid2>
      }
      error={
        error && (
          <Alert variant="outlined" color="error">
            {error.message}
          </Alert>
        )
      }
      tabs={
        <Tabs
          variant="fullWidth"
          scrollButtons={false}
          value={mode}
          onChange={(_, value) => setMode(value)}
        >
          <Tab label="Stake" value={'stake'} />
          <Tab label="Unstake" value={'unstake'} />
        </Tabs>
      }
      calculator={
        tonStakers &&
        tsTonRate &&
        (mode === 'stake' ? (
          <Calculator
            key={mode}
            onSubmit={amount => stake(amount)}
            mode="stake"
            tsTonRate={tsTonRate}
            min={1}
            max={tonStakers.availableBalance}
          />
        ) : (
          <Calculator
            key={mode}
            onSubmit={amount => unstake(amount)}
            mode="unstake"
            tsTonRate={tsTonRate}
            min={0.01}
            max={tonStakers.stakedBalance * tsTonRate}
          />
        ))
      }
      info={
        <Info
          walletBalance={walletBalance?.toFixed(2)}
          availableBalance={tonStakers?.availableBalance.toFixed(2)}
          tsTonRate={tsTonRate?.toFixed(4)}
          tsTonPrice={Number(tsTonAsset?.dex_usd_price).toFixed(2)}
          tonPrice={Number(tonAsset?.dex_usd_price).toFixed(2)}
        />
      }
    />
  );
};
