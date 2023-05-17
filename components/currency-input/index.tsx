import React, { memo } from 'react';
import CurrencyInputField from 'react-currency-input-field';
import { CurrencyInputProps } from '@/src/types/currency';

const CurrencyInput = ({ currency, value, onChange }: CurrencyInputProps) => {
  return (
    <div className='flex flex-row items-center'>
      <span className='text-slate-700 dark:text-slate-200 pr-3 font-bold'>
        {currency.name}
      </span>
      <CurrencyInputField
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        name='input-name'
        placeholder=''
        value={value}
        allowDecimals
        groupSeparator=' '
        decimalsLimit={4}
        decimalSeparator='.'
        disableAbbreviations
        onValueChange={(value) => onChange(value, currency)}
      />
    </div>
  );
};

export default memo(CurrencyInput);
