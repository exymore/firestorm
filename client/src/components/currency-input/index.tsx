import React, { memo } from 'react';
import CurrencyInputField from 'react-currency-input-field';
import { Currency } from '@/types/currency';
import { MinusCircleIcon } from 'lucide-react';

type CurrencyInputProps = {
  currency: Currency;
  value: string;
  onChange: (inputValue: string | undefined, currency: Currency) => void;
  handleDeleteFromCurrencyList: (currencySign: string) => void;
};

function CurrencyInput({
  currency,
  value,
  onChange,
  handleDeleteFromCurrencyList,
}: CurrencyInputProps) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="text-slate-700 dark:text-slate-200 pr-3 w-12 font-bold">
            {currency.sign}
          </span>
          <CurrencyInputField
            className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="input-name"
            placeholder=""
            value={value}
            allowDecimals
            groupSeparator=" "
            decimalsLimit={4}
            decimalSeparator="."
            disableAbbreviations
            onValueChange={(value) => onChange(value, currency)}
          />
        </div>
        <div className="flex flex-col items-end">
          <span className="pt-1 text-xs text-gray-500 dark:text-gray-400">
            {currency.name}
          </span>
        </div>
      </div>

      <button
        className="ml-3 mt-2 h-7 w-7"
        onClick={() => handleDeleteFromCurrencyList(currency.sign)}
      >
        <MinusCircleIcon
          size={18}
          strokeWidth={2}
          className="text-blue-800 hover:text-blue-400"
        />
      </button>
    </div>
  );
}

export default memo(CurrencyInput);
