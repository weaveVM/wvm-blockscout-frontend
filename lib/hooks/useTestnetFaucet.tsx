import { TagLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  address: string | undefined;
}

export const TestnetFaucetTag = () => {
  return (
    <Tooltip>
      <Tag
        color="#fff"
        backgroundColor="#a4133c"
        display="flex"
        padding="2px 5px"
      >
        <TagLabel display="block">testnet faucet</TagLabel>
      </Tag>
    </Tooltip>
  );
};

export const useTestnetFaucet = ({ address }: Props) => {
  const isTestnetFaucet =
    address === '0x89C23f56A3C5c586c870cB26a18F13dBCCf798bE';

  return isTestnetFaucet;
};
