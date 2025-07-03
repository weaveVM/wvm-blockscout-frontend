import { TagLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';

import Tag from 'ui/shared/chakra/Tag';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  label: string;
  bgColor: string;
  textColor: string;
}

const CustomAddressTag = ({ label, bgColor, textColor }: Props) => {
  return (
    <Tooltip label={ `Custom label: ${ label }` }>
      <Tag
        color={ textColor }
        backgroundColor={ bgColor }
        display="flex"
        padding="2px 5px"
      >
        <IconSvg name="gear_slim" boxSize={ 2.5 } mr={ 1 } flexShrink={ 0 }/>
        <TagLabel display="block">{ label }</TagLabel>
      </Tag>
    </Tooltip>
  );
};

export default CustomAddressTag;
