import React, { useMemo } from 'react';
import { Card, Grid, Title } from '@tremor/react';
import useCurrencyStore, { defaultCurrencyList } from '@/store';
import RatesChangeBlock from './components/Block';
import RatesChangeSkeleton from '@/components/Skeletons/RatesChangeSkeleton';
import { Currency } from '@/types/currency';

const RatesChangeCard = () => {
  const { selectedCurrencyList, latestRatesLoading } = useCurrencyStore();

  const filteredSelectedCurrencyList = useMemo<Array<Currency>>(
    () => selectedCurrencyList.filter((currency) => currency.sign !== 'USD'),
    [selectedCurrencyList]
  );
  const filteredDefaultCurrencyList = useMemo<Array<string>>(
    () => defaultCurrencyList.filter((currencySign) => currencySign !== 'USD'),
    []
  );

  const getCardContent = () => {
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
};

export default RatesChangeCard;
