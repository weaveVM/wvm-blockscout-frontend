import type { As } from '@chakra-ui/react';
import { Box, Flex, Skeleton, Tooltip, chakra, VStack } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import type { AddressParam } from 'types/api/addressParams';

import { route } from 'nextjs-routes';

import { useAddressHighlightContext } from 'lib/contexts/addressHighlight';
import * as EntityBase from 'ui/shared/entities/base/components';

import { getIconProps } from '../base/utils';
import AddressIdenticon from './AddressIdenticon';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'address'>;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: '/address/[hash]', query: { ...props.query, hash: props.address.hash } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Omit<EntityBase.IconBaseProps, 'name'> & Pick<EntityProps, 'address' | 'isSafeAddress'> & {
  asProp?: As;
  name?: EntityBase.IconBaseProps['name'];
};

const Icon = (props: IconProps) => {
  if (props.noIcon) {
    return null;
  }

  const styles = {
    ...getIconProps(props.iconSize),
    marginRight: 2,
  };

  if (props.isLoading) {
    return <Skeleton { ...styles } borderRadius="full" flexShrink={ 0 }/>;
  }

  if (props.address.is_contract) {
    if (props.isSafeAddress) {
      return (
        <EntityBase.Icon
          { ...props }
          name="brands/safe"
        />
      );
    }

    if (props.address.is_verified) {
      return (
        <Tooltip label="Verified contract">
          <span>
            <EntityBase.Icon
              { ...props }
              name="contract_verified"
              color="blue.500"
              borderRadius={ 0 }
            />
          </span>
        </Tooltip>
      );
    }

    return (
      <Tooltip label="Contract">
        <span>
          <EntityBase.Icon
            { ...props }
            name="contract"
            borderRadius={ 0 }
          />
        </span>
      </Tooltip>
    );
  }

  return (
    <Flex marginRight={ styles.marginRight }>
      <AddressIdenticon
        size={ props.iconSize === 'lg' ? 30 : 20 }
        hash={ props.address.hash }
      />
    </Flex>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'address'>;

const Content = chakra((props: ContentProps) => {
  const nameTag = props.address.metadata?.tags.find(tag => tag.tagType === 'name')?.name;
  const nameText = nameTag || props.address.ens_domain_name || props.address.name;

  if (nameText) {
    const label = (
      <VStack gap={ 0 } py={ 1 } color="inherit">
        <Box fontWeight={ 600 } whiteSpace="pre-wrap" wordBreak="break-word">{ nameText }</Box>
        <Box whiteSpace="pre-wrap" wordBreak="break-word">{ props.address.hash }</Box>
      </VStack>
    );

    return (
      <Tooltip label={ label } maxW={{ base: '100vw', lg: '400px' }}>
        <Skeleton isLoaded={ !props.isLoading } overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="span">
          { nameText }
        </Skeleton>
      </Tooltip>
    );
  }

  return (
    <EntityBase.Content
      { ...props }
      text={ props.address.hash }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'address'>;

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      { ...props }
      text={ props.address.hash }
    />
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  address: Pick<AddressParam, 'hash' | 'name' | 'is_contract' | 'is_verified' | 'ens_domain_name' | 'metadata'>;
  isSafeAddress?: boolean;
}

const AddressEntry = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  const context = useAddressHighlightContext();

  return (
    <Container
      // we have to use the global classnames here, see theme/global.ts
      // otherwise, if we use sx prop, Chakra will generate the same styles for each instance of the component on the page
      className={ `${ props.className } address-entity ${ props.noCopy ? 'address-entity_no-copy' : '' }` }
      data-hash={ context && !props.isLoading ? props.address.hash : undefined }
      onMouseEnter={ context?.onMouseEnter }
      onMouseLeave={ context?.onMouseLeave }
      position="relative"
    >
      <Icon { ...partsProps } color={ props.iconColor }/>
      <Link { ...linkProps }>
        <Content { ...partsProps }/>
      </Link>
      <Copy { ...partsProps }/>
    </Container>
  );
};

export default React.memo(chakra(AddressEntry));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
