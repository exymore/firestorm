import React from 'react';
import { Card, Grid, Title } from '@tremor/react';
import useCurrencyStore from '@/store';
import RatesChangeBlock from './RatesChangeBlock';
import RatesChangeSkeleton from '@/components/Skeletons/RatesChangeSkeleton';

const RatesChangeCard = () => {
  const { selectedCurrencyList, latestRatesLoading } = useCurrencyStore();

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Rates change</Title>
      <Grid numColsLg={3} numColsSm={1} className="gap-3">
        {selectedCurrencyList
          .filter((currency) => currency.sign !== 'USD')
          .map((currency) => {
            if (latestRatesLoading) {
              return <RatesChangeSkeleton key={currency.sign} />;
            }
            return <RatesChangeBlock key={currency.sign} currency={currency} />;
          })}
      </Grid>
    </Card>
  );
};

export default RatesChangeCard;
