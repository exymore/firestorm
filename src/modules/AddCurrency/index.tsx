import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Currency } from '@/types/currency';
import useCurrencyStore from '@/store';

const AddCurrencySelect = () => {
  const { addCurrencyToList } = useCurrencyStore();

  const currencyToAddList = useCurrencyStore((state) => {
    if (state) {
      return state.currencyList?.filter(
        (currency: Currency) =>
          !state.selectedCurrencyList
            ?.map((s: Currency) => s.sign)
            ?.includes(currency.sign)
      );
    }
    return [];
  });

  return (
    <Select value={''} onValueChange={addCurrencyToList}>
      <SelectTrigger className="w-1/2">Add Currency</SelectTrigger>
      <SelectContent className="h-[300px]">
        {currencyToAddList.map((listItem: Currency) => (
          <SelectItem key={listItem._id} value={listItem.sign}>
            {`${listItem.name} (${listItem.sign})`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AddCurrencySelect;
