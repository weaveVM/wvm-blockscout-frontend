import { Box, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import IconSvg from 'ui/shared/IconSvg';

import SettingsIdentIcon from './SettingsIdentIcon';

const Settings = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover placement="bottom-start" trigger="click" isOpen={ isOpen } onClose={ onClose }>
      <PopoverTrigger>
        <IconButton
          variant="simple"
          colorScheme="green"
          aria-label="User settings"
          icon={ <IconSvg name="gear_slim" boxSize={ 5 }/> }
          p="1px"
          boxSize={ 5 }
          onClick={ onToggle }
        />
      </PopoverTrigger>
      <PopoverContent overflowY="hidden" w="auto" fontSize="sm">
        <PopoverBody boxShadow="2xl" p={ 4 }>
          <SettingsIdentIcon/>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(Settings);
