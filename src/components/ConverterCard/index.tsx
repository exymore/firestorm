import React from 'react';
import { Card, Title } from '@tremor/react';
import CurrencyInput from '../CurrencyInput';
import AddCurrencySelect from '../AddCurrencySelect';
import { Currency } from '@/types/currency';
import useCurrencyStore, { defaultCurrencyList } from '@/store';
import { Skeleton } from '@/components/ui/skeleton';

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

const ConverterCardForm = () => {
  const { selectedCurrencyList, convertedCurrencyData } = useCurrencyStore();

  return (
    <>
      {selectedCurrencyList.map((currency: Currency) => (
        <div key={currency.sign} className="pb-3">
          <CurrencyInput
            currency={currency}
            value={String(convertedCurrencyData[currency.sign])}
          />
        </div>
      ))}

      <AddCurrencySelect />
    </>
  );
};

const ConverterCardSkeleton = () => {
  return (
    <>
      {defaultCurrencyList.map((sign) => (
        <Skeleton key={sign} className="w-full min-w-max h-12 mb-3" />
      ))}
      <Skeleton className="w-1/3 h-10" />
    </>
  );
};

export default ConverterCard;
