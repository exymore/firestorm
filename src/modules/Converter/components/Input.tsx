import useCurrencyStore from '@/store';
import { Currency } from '@/types/currency';
import CurrencyInput from '@/modules/CurrencyInput';
import AddCurrencySelect from '../../AddCurrency';
import React from 'react';

const ConverterCardInput = () => {
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

export default ConverterCardInput;
