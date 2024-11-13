import { useQuery } from '@tanstack/react-query';

const assets = {
  ton: '0:0000000000000000000000000000000000000000000000000000000000000000',
  tsTon: '0:bdf3fa8098d129b54b4f73b5bac5d1e1fd91eb054169c3916dfc8ccd536d1000',
} as const;

export const useAsset = (asset: keyof typeof assets) => {
  const assetAddress = assets[asset];

  return useQuery({
    queryKey: ['asset', asset],
    queryFn: async (): Promise<{ asset: Asset }> => {
      const response = await fetch(`https://api.ston.fi/v1/assets/${assetAddress}`);

      if (!response.ok) {
        throw new Error('Failed to fetch asset');
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    select: res => res.asset,
  });
};

type Asset = {
  contract_address: string;
  symbol: string;
  display_name: string;
  priority: number;
  image_url: string;
  decimals: number;
  kind: string;
  deprecated: boolean;
  community: boolean;
  blacklisted: boolean;
  default_symbol: boolean;
  taxable: boolean;
  tags: string[];
  third_party_usd_price: string;
  third_party_price_usd: string;
  dex_usd_price: string;
  dex_price_usd: string;
};
