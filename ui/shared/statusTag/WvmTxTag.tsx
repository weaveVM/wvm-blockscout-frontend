import { TagLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  tag: string;
}
const WvmTxTag = ({ tag }: Props) => {

  return (
    <Tooltip>
      <Tag
        color="#fff"
        backgroundColor="#232452"
        display="flex"
        padding="2px 5px"
      >
        <TagLabel display="block">{ tag }</TagLabel>
      </Tag>
    </Tooltip>
  );
};

export default WvmTxTag;
