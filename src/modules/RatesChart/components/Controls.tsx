import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import useCurrencyStore from '@/store';
import { HistoricalPeriods } from '@/types/currency';

const lastDateAvailable = dayjs('2004-05-27');

type RatesChartControlsProps = {
  selectedPeriod: HistoricalPeriods;
  skip: number;
  limit: number;
  setSkip: (skip: number) => void;
};

type HandleSetSkip = () => void;

function RatesChartControls({
  selectedPeriod,
  skip,
  limit,
  setSkip,
}: RatesChartControlsProps): React.JSX.Element | null {
  const { chartRates, chartRatesLoading } = useCurrencyStore();

  const show = useMemo(
    () => selectedPeriod !== HistoricalPeriods.YEAR,
    [selectedPeriod]
  );

  const chartDataLastDate = useMemo(() => {
    return dayjs(chartRates?.at(-1)?.date);
  }, [chartRates]);

  const chartControlsDisabled = useMemo(() => {
    if (chartRatesLoading) return { backDisabled: true, forwardDisabled: true };

    const currentOffset = dayjs().diff(chartDataLastDate, 'month');
    const maxOffset = dayjs().diff(lastDateAvailable, 'month');

    return {
      backDisabled: currentOffset >= maxOffset,
      forwardDisabled: skip === 0,
    };
  }, [chartDataLastDate, chartRatesLoading, skip]);

  const handleBack: HandleSetSkip = () => {
    const maxOffset = chartDataLastDate.diff(lastDateAvailable, 'month');
    const maxLimit = maxOffset < limit ? maxOffset : limit;
    setSkip(skip + maxLimit);
  };
  const handleForward: HandleSetSkip = () => setSkip(skip - limit);

  if (!show) return null;

  return (
    <div className="flex sm:justify-start lg:justify-end">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={chartControlsDisabled.backDisabled}
      >
        <ChevronLeft width="22" />
      </Button>
      <Button
        variant="outline"
        onClick={handleForward}
        disabled={chartControlsDisabled.forwardDisabled}
      >
        <ChevronRight width="22" />
      </Button>
    </div>
  );
}

export default RatesChartControls;
