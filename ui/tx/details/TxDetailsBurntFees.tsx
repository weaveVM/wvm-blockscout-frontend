import { Skeleton } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { TbCoins } from 'react-icons/tb';

import type { Transaction } from 'types/api/transaction';

import config from 'configs/app';
import { ZERO } from 'lib/consts';
import { currencyUnits } from 'lib/units';
import CurrencyValue from 'ui/shared/CurrencyValue';
import * as DetailsInfoItem from 'ui/shared/DetailsInfoItem';

const rollupFeature = config.features.rollup;

interface Props {
  data: Transaction;
  isLoading?: boolean;
}

const TxDetailsBurntFees = ({ data, isLoading }: Props) => {

  if (config.UI.views.tx.hiddenFields?.burnt_fees || (rollupFeature.isEnabled && rollupFeature.type === 'optimistic')) {
    return null;
  }

  const value = BigNumber(data.tx_burnt_fee || 0).plus(BigNumber(data.blob_gas_used || 0).multipliedBy(BigNumber(data.blob_gas_price || 0)));

  if (value.isEqualTo(ZERO)) {
    return null;
  }

  return (
    <>
      <DetailsInfoItem.Label
        hint={ `
            Amount of ${ currencyUnits.ether } burned for this transaction. Equals Block Base Fee per Gas * Gas Used
            ${ data.blob_gas_price && data.blob_gas_used ? ' + Blob Gas Price * Blob Gas Used' : '' }
          ` }
        isLoading={ isLoading }
      >
        Network revenue
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <TbCoins size={ 20 } color="gray.500"/>
        </Skeleton>
        <CurrencyValue
          value={ value.toString() }
          currency={ currencyUnits.ether }
          exchangeRate={ data.exchange_rate }
          flexWrap="wrap"
          ml={ 2 }
          isLoading={ isLoading }
        />
      </DetailsInfoItem.Value>
    </>
  );
};

export default React.memo(TxDetailsBurntFees);
