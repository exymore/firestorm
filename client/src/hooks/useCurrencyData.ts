import { useEffect, useState } from 'react';
import { Currency, HistoricalRatesDataItem } from '@/types/currency';
import { useGetLatestRatesQuery } from '@/api';

export function useCurrencyData() {
  const [currencyData, setCurrencyData] = useState<HistoricalRatesDataItem>({});
  const { data: latestRates } = useGetLatestRatesQuery();

  useEffect(() => {
    if (latestRates?.data) {
      setCurrencyData(latestRates.data);
    }
  }, [latestRates]);

  const onChangeCurrencyData = (inputValue = '0', currency: Currency) => {
    const updatedCurrencyData = Object.entries(currencyData).map((curr) => {
      let newCurrencyValue;
      const currentCurrencyRate = latestRates?.data[curr[0]] ?? 0;
      const changedCurrencyRate = latestRates?.data[currency.sign] ?? 0;

      if (curr[0] === currency.sign) {
        newCurrencyValue = inputValue;
      } else {
        newCurrencyValue = (
          (currentCurrencyRate / changedCurrencyRate) *
          +inputValue
        ).toFixed(3);
      }
      return [curr[0], newCurrencyValue];
    });

    setCurrencyData(Object.fromEntries(updatedCurrencyData));
  };

  return {
    currencyData,
    onChangeCurrencyData,
  };
}
