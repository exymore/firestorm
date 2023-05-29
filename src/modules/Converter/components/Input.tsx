import React from 'react';

import CurrencyInput from '@/modules/CurrencyInput';
import useCurrencyStore from '@/store';
import { Currency } from '@/types/currency';

import AddCurrencySelect from '../../AddCurrency';

function ConverterCardInput(): React.JSX.Element {
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
}

export default ConverterCardInput;
