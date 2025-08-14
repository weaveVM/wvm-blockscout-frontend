import {
  Box,
  Flex,
  Grid,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  item: {
    Key?: string;
    LastModified?: Date;
  };
  isLoading?: boolean;
}

const LatestDataItemsItem = ({ item, isLoading }: Props) => {
  const fileName = item.Key?.split('/').pop() || '';

  return (
    <Box
      as={ motion.div }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ display: 'none' }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      borderRadius="md"
      border="1px solid"
      borderColor="divider"
      p={ 3 }
    >
      <Flex alignItems="center" overflow="hidden" w="100%" mb={ 3 }>
        <Skeleton
          isLoaded={ !isLoading }
          flexGrow={ 1 }
          mr="auto"
        >
          <Text
            lineHeight={ 7 }
            fontWeight={ 500 }
            isTruncated
          >
            <Link
              href={ `https://load-s3-agent.load.network/${ fileName.replace('.ans104', '') }` }
              target="_blank"
              color="link"
              textDecoration="none"
              _hover={{ textDecoration: 'underline' }}
            >
              { (() => {
                const base = (fileName || '').replace(/\.ans104$/i, '');
                return base.length > 12 ? `${ base.slice(0, 6) }...${ base.slice(-6) }` : base;
              })() }
            </Link>
          </Text>
        </Skeleton>
      </Flex>
      <Grid gridGap={ 2 } templateColumns="auto minmax(0, 1fr)" fontSize="sm">
        <Skeleton isLoaded={ !isLoading }>Uploaded</Skeleton>
        <Skeleton isLoaded={ !isLoading } color="text_secondary">
          <span>
            { item.LastModified ? new Date(item.LastModified).toLocaleString() : '-' }
          </span>
        </Skeleton>
      </Grid>
    </Box>
  );
};

export default LatestDataItemsItem;
