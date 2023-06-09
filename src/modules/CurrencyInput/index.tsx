import React, { memo } from 'react';
import CurrencyInputField from 'react-currency-input-field';

import CurrencyInputDeleteButton from '@/modules/CurrencyInput/components/DeleteButton';
import useCurrencyStore from '@/store';
import { Currency } from '@/types/currency';

type CurrencyInputProps = {
  currency: Currency;
  value: string;
};

function CurrencyInput({
  currency,
  value,
}: CurrencyInputProps): React.JSX.Element {
  const { onChangeCurrencyData, deleteFromCurrencyList } = useCurrencyStore();

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="text-slate-700 dark:text-slate-200 pr-3 w-12 font-bold">
            {currency.sign}
          </span>
          <CurrencyInputField
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="input-name"
            placeholder=""
            value={value}
            allowDecimals
            groupSeparator=" "
            decimalsLimit={4}
            decimalSeparator="."
            disableAbbreviations
            onValueChange={(v) => onChangeCurrencyData(currency, v)}
          />
        </div>

        <div className="flex flex-col items-end">
          <span className="pt-1 text-xs text-gray-500 dark:text-gray-400">
            {currency.name}
          </span>
        </div>
      </div>

      <CurrencyInputDeleteButton
        currencySign={currency.sign}
        deleteFromCurrencyList={deleteFromCurrencyList}
      />
    </div>
  );
}

export default memo(CurrencyInput);
