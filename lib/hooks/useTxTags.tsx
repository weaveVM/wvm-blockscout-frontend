import { useQuery } from '@tanstack/react-query';

interface TxTagsResponse {
  success: boolean;
  data: {
    hash: string;
    tags: string;
    confirmed: string | null;
    block_id: string | null;
    created_at: string;
  };
}

interface TxTagsProps {
  txHash: string | undefined | null;
}

export function useTxTags({ txHash }: TxTagsProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: [ 'get tx tags', txHash ],
    queryFn: async() => {
      const response = await fetch(
        'https://arweaveid-api.vercel.app/api/tx-tags',
        {
          method: 'POST',
          body: JSON.stringify({
            txHash,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = (await response.json()) as TxTagsResponse;

      if (data.success) {
        const tags = JSON.parse(data.data.tags) as Array<[string, string]>;
        return tags;
      }

      return null;
    },
    enabled: Boolean(txHash),
  });

  return { data, error, isLoading };
}
