import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HistoricalPeriods } from '@/types/currency';
import dayjs from 'dayjs';
import useCurrencyStore from '@/store';
import useRatesChart from '@/hooks/useRatesChart';

const LAST_DATE_AVAILABLE = dayjs('2004-05-27');

type RatesChartControlsProps = {
  selectedPeriod: HistoricalPeriods;
};

const RatesChartControls = ({ selectedPeriod }: RatesChartControlsProps) => {
  const { chartRates, chartRatesLoading } = useCurrencyStore();
  const { skip, limit, setSkip } = useRatesChart();

  const show = useMemo(
    () => selectedPeriod !== HistoricalPeriods.YEAR,
    [selectedPeriod]
  );

  const chartControlsDisabled = useMemo(() => {
    const lastDate = dayjs(chartRates?.at(-1)?.date);

    if (chartRatesLoading) return { backDisabled: true, forwardDisabled: true };

    return {
      backDisabled: lastDate.isSame(LAST_DATE_AVAILABLE),
      forwardDisabled: skip === 0,
    };
  }, [chartRates, chartRatesLoading, skip]);

  const handleBack = () => setSkip(skip + limit);
  const handleForward = () => setSkip(skip - limit);

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
};

export default RatesChartControls;
