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
  const isBundleV0 = address === '0x40Ec5025f155149d4E6BfE39F297c9092A877713';

  return isBundleV0;
};
