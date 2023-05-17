'use client';
import CurrencyInput from '@/components/currency-input';
import { useState } from 'react';
import { Currency, CurrencyResponseData } from '@/src/types/currency';

const CURRENCY_RESPONSE_RATES: CurrencyResponseData = {
  CAD: 1.355653,
  EUR: 0.921461,
  USD: 1,
};

const defaultCurrencies: Array<Currency> = [
  { name: 'USD', sign: 'USD' },
  { name: 'EUR', sign: 'EUR' },
  { name: 'CAD', sign: 'CAD' },
];

export default function Home() {
  const [currenciesData, setCurrenciesData] = useState<CurrencyResponseData>(
    CURRENCY_RESPONSE_RATES,
  );

  const onChangeCurrenciesData = (inputValue = '0', currency: Currency) => {
    const updatedCurrenciesData = Object.entries(currenciesData).map((curr) => {
      let newCurrencyValue;
      const currentCurrencyRate = CURRENCY_RESPONSE_RATES[curr[0]];
      const changedCurrencyRate = CURRENCY_RESPONSE_RATES[currency.sign];

      if (curr[0] === currency.sign) {
        newCurrencyValue = inputValue;
      } else {
        newCurrencyValue = (
          (currentCurrencyRate / changedCurrencyRate) *
          +inputValue
        ).toFixed(4);
      }
      return [curr[0], newCurrencyValue];
    });

    setCurrenciesData(Object.fromEntries(updatedCurrenciesData));
  };

  return (
    <div className='flex flex-col items-center'>
      {defaultCurrencies.map((currency) => {
        return (
          <div key={currency.sign} className='pb-3'>
            <CurrencyInput
              currency={currency}
              value={String(currenciesData[currency.sign])}
              onChange={onChangeCurrenciesData}
            />
          </div>
        );
      })}
    </div>
  );
}
