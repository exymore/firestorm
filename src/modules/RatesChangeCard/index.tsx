import { Card, Grid, Title } from '@tremor/react';
import React, { useMemo } from 'react';

import RatesChangeSkeleton from '@/components/Skeletons/RatesChangeSkeleton';
import useCurrencyStore, { defaultCurrencyList } from '@/store';
import { Currency } from '@/types/currency';

import RatesChangeBlock from './components/Block';

function RatesChangeCard(): React.JSX.Element {
  const { selectedCurrencyList, latestRatesLoading } = useCurrencyStore();

  const filteredSelectedCurrencyList = useMemo<Array<Currency>>(
    () => selectedCurrencyList.filter((currency) => currency.sign !== 'USD'),
    [selectedCurrencyList]
  );
  const filteredDefaultCurrencyList = useMemo<Array<string>>(
    () => defaultCurrencyList.filter((currencySign) => currencySign !== 'USD'),
    []
  );

  const getCardContent: () => React.JSX.Element[] = () => {
    if (latestRatesLoading) {
      if (selectedCurrencyList.length > 0) {
        return filteredSelectedCurrencyList.map((currency) => (
          <RatesChangeSkeleton key={currency.sign} />
        ));
      }
      return filteredDefaultCurrencyList.map((currencySign) => (
        <RatesChangeSkeleton key={currencySign} />
      ));
    }
    return filteredSelectedCurrencyList.map((currency) => (
      <RatesChangeBlock key={currency.sign} currency={currency} />
    ));
  };

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Rates change</Title>
      <Grid numColsLg={3} numColsSm={1} className="gap-3">
        {getCardContent()}
      </Grid>
    </Card>
  );
}

export default RatesChangeCard;
