import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import useRatesChart from '@/hooks/useRatesChart';
import useCurrencyStore from '@/store';
import { HistoricalPeriods } from '@/types/currency';

const lastDateAvailable = dayjs('2004-05-27');

type RatesChartControlsProps = {
  selectedPeriod: HistoricalPeriods;
};

type HandleSetSkip = () => void;

function RatesChartControls({
  selectedPeriod,
}: RatesChartControlsProps): React.JSX.Element | null {
  const { chartRates, chartRatesLoading } = useCurrencyStore();
  const { skip, limit, setSkip } = useRatesChart();

  const show = useMemo(
    () => selectedPeriod !== HistoricalPeriods.YEAR,
    [selectedPeriod]
  );

  const chartControlsDisabled = useMemo(() => {
    const chartDataLastDate = dayjs(chartRates?.at(-1)?.date);

    if (chartRatesLoading) return { backDisabled: true, forwardDisabled: true };

    return {
      backDisabled: chartDataLastDate.isSame(lastDateAvailable),
      forwardDisabled: skip === 0,
    };
  }, [chartRates, chartRatesLoading, skip]);

  const handleBack: HandleSetSkip = () => setSkip(skip + limit);
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
