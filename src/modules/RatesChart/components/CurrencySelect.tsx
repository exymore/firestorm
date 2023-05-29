import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useCurrencyStore from '@/store';

type CurrencySelectProps = {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
};

function RatesChartCurrencySelect({
  selectedCurrency,
  onCurrencyChange,
}: CurrencySelectProps): React.JSX.Element {
  const { currencyList } = useCurrencyStore();
  return (
    <Select defaultValue={selectedCurrency} onValueChange={onCurrencyChange}>
      <SelectTrigger className="w-[240px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="h-[300px]">
        <SelectGroup>
          {currencyList
            .filter((currency) => currency.sign !== 'USD')
            .map((currency) => (
              <SelectItem key={currency.sign} value={currency.sign}>
                {`${currency.name} (${currency.sign})`}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default RatesChartCurrencySelect;
