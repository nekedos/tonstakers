import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useMemo, useState } from 'react';
import { Tonstakers } from 'tonstakers-sdk';

const useInitTonstakers = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [tonConnectUI] = useTonConnectUI();

  const tonstakers = useMemo(() => {
    return new Tonstakers({
      // @ts-expect-error incorrect type in Tonstakers
      connector: tonConnectUI,
    });
  }, [tonConnectUI]);

  useEffect(() => {
    const initEvent = () => {
      setReady(true);
    };

    const destroyEvent = () => {
      setReady(false);
    };

    tonstakers.addEventListener('initialized', initEvent);
    tonstakers.addEventListener('deinitialized', destroyEvent);

    return () => {
      tonstakers.removeEventListener('initialized', initEvent);
      tonstakers.removeEventListener('deinitialized', destroyEvent);
    };
  }, [tonstakers]);

  return { tonstakers, ready };
};

export const useTonstakers = () => {
  const { tonstakers, ready } = useInitTonstakers();

  return useQuery({
    queryKey: ['tonstakers'],
    queryFn: () => {
      return Promise.all([
        tonstakers.getAvailableBalance(),
        tonstakers.getStakedBalance(),
        tonstakers.getRates() as Promise<{
          TONUSD: number;
          tsTONTON: number;
          tsTONTONProjected: number;
        }>,
      ]).then(([availableBalance, stakedBalance, rates]) => ({
        availableBalance: availableBalance / 1e9,
        stakedBalance: stakedBalance / 1e9,
        rates,
      }));
    },
    refetchInterval: 60 * 1000,
    enabled: ready,
  });
};

export const useStake = () => {
  const { tonstakers } = useInitTonstakers();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amount: number) => tonstakers.stake(amount),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tonstakers'] });
      await queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
};

export const useUnstake = () => {
  const { tonstakers } = useInitTonstakers();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amount: number) => tonstakers.unstake(amount),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tonstakers'] });
      await queryClient.invalidateQueries({ queryKey: ['walletBalance'] });
    },
  });
};
