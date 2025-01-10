import { TagLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  address: string | undefined;
}

export const BundleV0Tag = () => {
  return (
    <Tooltip>
      <Tag
        color="#fff"
        backgroundColor="#1385a7"
        display="flex"
        padding="2px 5px"
      >
        <TagLabel display="block">bundle v0.1.0</TagLabel>
      </Tag>
    </Tooltip>
  );
};

export const useBundleV0 = ({ address }: Props) => {
  const isBundleV0 = address === '0xbabe1d25501157043c7b4ea7CBC877B9B4D8A057';

  return isBundleV0;
};
