import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { useCallback, useEffect, useState } from 'react';

import s3Config from 'configs/app/s3';

export function createS3Client(): S3Client | null {
  if (!s3Config.region || !s3Config.endpoint || !s3Config.accessKeyId || !s3Config.secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: s3Config.region,
    endpoint: s3Config.endpoint,
    credentials: {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
    },
    forcePathStyle: true,
  });
}

export function useS3DataItems(limit = 25) {
  const [ items, setItems ] = useState<Array<{ Key?: string; LastModified?: Date }>>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState<Error | null>(null);

  const fetchItems = useCallback(async() => {
    try {
      setIsLoading(true);
      const client = createS3Client();
      if (!client) {
        throw new Error('Failed to initialize S3 client');
      }

      // Fetch enough items to ensure we get the newest ones
      const command = new ListObjectsV2Command({
        Bucket: 'offchain-dataitems',
        Prefix: 'dataitems/',
        MaxKeys: 1000,
        FetchOwner: false,
      });

      const response = await client.send(command);

      // eslint-disable-next-line no-console
      console.log('S3 Response:', {
        totalItems: response.Contents?.length,
        items: response.Contents?.map(item => ({
          key: item.Key,
          lastModified: item.LastModified?.toISOString(),
        })),
      });

      if (response.Contents) {
        // Sort by last modified date, most recent first
        const sortedItems = response.Contents
          .sort((a, b) => {
            return (b.LastModified?.getTime() || 0) - (a.LastModified?.getTime() || 0);
          })
          .slice(0, limit);
        // eslint-disable-next-line no-console
        console.log('Final Sorted Items:', {
          items: sortedItems.map(item => ({
            key: item.Key,
            lastModified: item.LastModified?.toISOString(),
          })),
        });
        setItems(sortedItems);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch S3 items'));
    } finally {
      setIsLoading(false);
    }
  }, [ limit ]);

  useEffect(() => {
    fetchItems();
    // Refetch every 30 seconds to keep the list updated
    const interval = setInterval(fetchItems, 30000);
    return () => clearInterval(interval);
  }, [ fetchItems ]);

  return {
    items,
    isLoading,
    error,
    refetch: fetchItems,
  };
}
