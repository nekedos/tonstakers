import { useQuery } from '@tanstack/react-query';
import { CHAIN } from '@tonconnect/sdk';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const useWalletBalance = () => {
  const [tonConnectUI] = useTonConnectUI();

  const wallet = tonConnectUI.wallet;

  return useQuery({
    queryKey: ['walletBalance'],
    queryFn: async (): Promise<{
      result: string;
      ok: boolean;
    }> => {
      const account = wallet?.account;
      const address = account?.address;
      const prefix = account?.chain === CHAIN.TESTNET ? 'testnet.' : '';

      const response = await fetch(
        `https://${prefix}toncenter.com/api/v2/getAddressBalance?address=${address}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch wallet balance');
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    select: data => Number(data.result) / 1e9,
    enabled: !!wallet,
  });
};
