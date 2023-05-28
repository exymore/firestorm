import React from 'react';
import { Card, Title } from '@tremor/react';
import useCurrencyStore from '@/store';
import ConverterCardSkeleton from '../../components/Skeletons/ConverterCardSkeleton';
import ConverterCardInput from './components/Input';

const ConverterCard = () => {
  const { currencyListLoading, latestRatesLoading } = useCurrencyStore();

  const isLoading = currencyListLoading || latestRatesLoading;

  const component = isLoading ? (
    <ConverterCardSkeleton />
  ) : (
    <ConverterCardInput />
  );

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Converter</Title>
      {component}
    </Card>
  );
};

export default ConverterCard;
