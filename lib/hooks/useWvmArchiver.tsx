import { useQuery } from '@tanstack/react-query';

interface Props {
  address: string | undefined;
}

interface ResponseProps {
  success: boolean;
  data: Array<WvmNetwork>;
}
interface WvmNetwork {
  archive_pool_address: string;
  archiver_address: string;
  backfill_address: string;
  block_time: number;
  name: string;
  network_chain_id: number;
  network_rpc: string;
  start_block: number;
  wvm_chain_id: number;
  wvm_rpc: string;
}

export function useWvmArchiver({ address }: Props) {
  const { data: wvmNetworks } = useQuery({
    queryKey: [ 'get wvm networks' ],
    queryFn: async() => {
      const response = await fetch(
        'https://arweaveid-api.vercel.app/api/wvm-networks',
      );

      const data = (await response.json()) as ResponseProps;

      if (data.success) {
        return data.data;
      }

      return null;
    },
  });

  const isWvmNetwork = wvmNetworks?.some(
    (network) =>
      network.archiver_address === address ||
      (network.backfill_address && network.backfill_address === address),
  );

  return isWvmNetwork;
}
