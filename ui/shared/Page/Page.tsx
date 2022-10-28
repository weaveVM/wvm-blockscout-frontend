import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { QueryKeys } from 'types/client/queries';

import * as cookies from 'lib/cookies';
import useFetch from 'lib/hooks/useFetch';
import PageContent from 'ui/shared/Page/PageContent';
import Header from 'ui/snippets/header/Header';
import NavigationDesktop from 'ui/snippets/navigation/NavigationDesktop';

interface Props {
  children: React.ReactNode;
  wrapChildren?: boolean;
}

const Page = ({ children, wrapChildren = true }: Props) => {
  const fetch = useFetch();

  useQuery<unknown, unknown, unknown>([ QueryKeys.csrf ], async() => await fetch('/node-api/account/csrf'), {
    enabled: Boolean(cookies.get(cookies.NAMES.API_TOKEN)),
  });

  const renderedChildren = wrapChildren ? (
    <PageContent>{ children }</PageContent>
  ) : children;

  return (
    <Flex w="100%" minH="100vh" alignItems="stretch">
      <NavigationDesktop/>
      <Flex flexDir="column" width="100%">
        <Header/>
        { renderedChildren }
      </Flex>
    </Flex>
  );
};

export default Page;