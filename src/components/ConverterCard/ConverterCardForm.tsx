import useCurrencyStore from '@/store';
import { Currency } from '@/types/currency';
import CurrencyInput from '@/components/CurrencyInput';
import AddCurrencySelect from '@/components/AddCurrencySelect';
import React from 'react';

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

export default ConverterCardForm;
