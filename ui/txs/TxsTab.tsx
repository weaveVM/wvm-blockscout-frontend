import React from 'react';

import { QueryKeys } from 'types/client/queries';

import TxsContent from './TxsContent';

type Props = {
  tab: 'validated' | 'pending';
}

const TxsTab = ({ tab }: Props) => {
  return (
    <TxsContent
      queryName={ QueryKeys.transactions }
      showDescription={ tab === 'validated' }
      stateFilter={ tab }
      apiPath="/api/transactions"
    />
  );
};

export default TxsTab;