import React from 'react';
import { Card, Title } from '@tremor/react';
import useCurrencyStore from '@/store';
import ConverterCardSkeleton from './ConverterCardSkeleton';
import ConverterCardForm from './ConverterCardForm';

const ConverterCard = () => {
  const { currencyListLoading, latestRatesLoading } = useCurrencyStore();

  const isLoading = currencyListLoading || latestRatesLoading;

  const component = isLoading ? (
    <ConverterCardSkeleton />
  ) : (
    <ConverterCardForm />
  );

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Converter</Title>
      {component}
    </Card>
  );
};

export default ConverterCard;
