import { Card, Title } from '@tremor/react';
import React from 'react';

import useCurrencyStore from '@/store';

import ConverterCardSkeleton from '../../components/Skeletons/ConverterCardSkeleton';
import ConverterCardInput from './components/Input';

function ConverterCard(): React.JSX.Element {
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
}

export default ConverterCard;
