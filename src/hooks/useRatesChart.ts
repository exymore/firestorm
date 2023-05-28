import useCurrencyStore from '@/store';
import { useEffect, useMemo, useState } from 'react';
import { HistoricalPeriods, HistoricalRatesListItem } from '@/types/currency';
import dayjs from 'dayjs';

const RATE_FORMATTERS = {
  [HistoricalPeriods.DAY]: 'DD MMM YYYY',
  [HistoricalPeriods.MONTH]: 'MMM YYYY',
  [HistoricalPeriods.YEAR]: 'YYYY',
};

type RatesChartDataItem = Pick<HistoricalRatesListItem, 'date'> & {
  [key: string]: string | number;
};

export type RatesChartData = Array<RatesChartDataItem>;

function useRatesChart() {
  const { chartRates, currencyList, fetchChartRates } = useCurrencyStore();

  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriods>(
    HistoricalPeriods.MONTH
  );
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(13);

  const onCurrencyChange = (value: string) => setSelectedCurrency(value);
  const onPeriodChange = (value: HistoricalPeriods) => {
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
      });
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
          date: dayjs(item.date).format(RATE_FORMATTERS[selectedPeriod]),
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
