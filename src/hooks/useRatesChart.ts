import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import useCurrencyStore from '@/store';
import { HistoricalPeriods } from '@/types/currency';
import { RatesChartData } from '@/types/ratesChart';

const rateFormatters = {
  [HistoricalPeriods.DAY]: 'DD MMM YYYY',
  [HistoricalPeriods.MONTH]: 'MMM YYYY',
  [HistoricalPeriods.YEAR]: 'YYYY',
};

type UseRatesChart = {
  chartData: RatesChartData;

  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;

  skip: number;
  limit: number;
  selectedPeriod: HistoricalPeriods;
  setSkip: (value: number) => void;
  onPeriodChange: (value: HistoricalPeriods) => void;
};

type OnCurrencyChange = (value: string) => void;
type OnPeriodChange = (value: HistoricalPeriods) => void;

function useRatesChart(): UseRatesChart {
  const { chartRates, currencyList, fetchChartRates } = useCurrencyStore();

  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriods>(
    HistoricalPeriods.MONTH
  );
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(13);

  const onCurrencyChange: OnCurrencyChange = (value: string) =>
    setSelectedCurrency(value);
  const onPeriodChange: OnPeriodChange = (value: HistoricalPeriods) => {
    if (value === HistoricalPeriods.MONTH) {
      setSkip(0);
      setLimit(13);
    }
    if (value === HistoricalPeriods.DAY) {
      setSkip(0);
      setLimit(31);
    }

    setSelectedPeriod(value);
  };

  useEffect(() => {
    if (currencyList.length > 0) {
      fetchChartRates({
        currencySign: selectedCurrency,
        period: selectedPeriod,
        skip,
        limit,
      }).catch(console.error);
    }
  }, [
    currencyList,
    fetchChartRates,
    selectedCurrency,
    selectedPeriod,
    skip,
    limit,
  ]);

  const chartData = useMemo(() => {
    return chartRates.reduce<RatesChartData>((acc, item) => {
      if (item.data?.[selectedCurrency]) {
        const dataItem = {
          date: dayjs(item.date).format(rateFormatters[selectedPeriod]),
          [selectedCurrency]: item.data[selectedCurrency],
        };
        acc.unshift(dataItem);
      }
      return acc;
    }, []);
  }, [chartRates, selectedCurrency, selectedPeriod]);

  return {
    chartData,

    selectedCurrency,
    onCurrencyChange,

    skip,
    limit,
    selectedPeriod,
    setSkip,
    onPeriodChange,
  };
}

export default useRatesChart;
