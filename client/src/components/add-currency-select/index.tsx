import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Currency } from '@/types/currency';

type AddCurrencySelectProps = {
  currencyToAddList: Currency[];
  handleAddCurrencyToList: (value: string) => void;
};

const AddCurrencySelect = ({
  currencyToAddList,
  handleAddCurrencyToList,
}: AddCurrencySelectProps) => {
  return (
    <Select onValueChange={handleAddCurrencyToList}>
      <SelectTrigger className="w-[288px]">
        <SelectValue placeholder="Add Currency" />
      </SelectTrigger>

      <SelectContent className="h-[300px]">
        {currencyToAddList.map((listItem: Currency) => (
          <div key={listItem._id}>
            <SelectItem value={listItem.sign}>
              {`${listItem.name} (${listItem.sign})`}
            </SelectItem>
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AddCurrencySelect;
