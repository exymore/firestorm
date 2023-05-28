import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HistoricalPeriods } from '@/types/currency';

type PeriodSelectProps = {
  selectedPeriod: HistoricalPeriods;
  onPeriodChange: (value: HistoricalPeriods) => void;
};

const PeriodSelect = ({
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectProps) => {
  return (
    <Select defaultValue={selectedPeriod} onValueChange={onPeriodChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(HistoricalPeriods).map((period) => (
            <SelectItem key={period} value={period}>
              <span className="capitalize">{period}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PeriodSelect;
