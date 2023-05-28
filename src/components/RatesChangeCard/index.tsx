import React from 'react';
import { Card, Grid, Title } from '@tremor/react';
import useCurrencyStore from '@/store';
import RatesChangeBlock from './RatesChangeBlock';

const RatesChangeCard = () => {
  const { selectedCurrencyList } = useCurrencyStore();

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Rates change</Title>
      <Grid numColsLg={3} numColsSm={1} className="gap-3">
        {selectedCurrencyList
          .filter((currency) => currency.sign !== 'USD')
          .map((currency) => (
            <RatesChangeBlock key={currency.sign} currency={currency} />
          ))}
      </Grid>
    </Card>
  );
};

export default RatesChangeCard;
