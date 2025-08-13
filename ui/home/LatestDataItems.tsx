import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import useIsMobile from 'lib/hooks/useIsMobile';
import { useS3DataItems } from 'lib/hooks/useS3DataItems';

import LatestDataItemsItem from './LatestDataItemsItem';

const LatestDataItems = () => {
  const isMobile = useIsMobile();
  const itemsCount = isMobile ? 2 : 6;
  const { items, isLoading, error } = useS3DataItems(itemsCount);

  let content;

  if (error) {
    content = <Text>No data. Please reload page.</Text>;
  }

  if (items) {
    const dataToShow = items.slice(0, itemsCount);

    content = (
      <VStack spacing={ 2 } overflow="hidden" alignItems="stretch">
        <AnimatePresence initial={ false }>
          { dataToShow.map((item) => (
            <LatestDataItemsItem
              key={ item.Key || Math.random().toString() }
              item={ item }
              isLoading={ isLoading }
            />
          )) }
        </AnimatePresence>
      </VStack>
    );
  }

  return (
    <Box width={{ base: '100%', lg: '280px' }} flexShrink={ 0 }>
      <Heading as="h4" size="sm">Latest data items</Heading>
      <Text as="span" fontSize="sm" mt={ 1 } display="inline-block">
        ~s3@1.0 HyperBEAM dataitems
      </Text>
      <Box mt={ 3 }>
        { content }
      </Box>
    </Box>
  );
};

export default LatestDataItems;
