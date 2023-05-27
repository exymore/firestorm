import React, { useEffect, useMemo, useState } from 'react';
import { AreaChart, Card, Flex, Title } from '@tremor/react';
import useCurrencyStore from '@/store';
import dayjs from 'dayjs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HistoricalPeriods, HistoricalRatesListItem } from '@/types/currency';
import { Skeleton } from '@/components/ui/skeleton';
import RatesChartControls from '@/components/RatesChart/Controls';

const RATE_FORMATTERS = {
  [HistoricalPeriods.DAY]: 'DD MMM YYYY',
  [HistoricalPeriods.MONTH]: 'MMM YYYY',
  [HistoricalPeriods.YEAR]: 'YYYY',
};

type RatesChartDataItem = Pick<HistoricalRatesListItem, 'date'> & {
  [key: string]: string | number;
};

type RatesChartData = Array<RatesChartDataItem>;

const RatesChart = () => {
  const { chartRates, currencyList, fetchChartRates } = useCurrencyStore();

  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
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

  const chartRangeText = useMemo(() => {
    if (chartData.length) {
      return `From ${chartData?.at(0)?.date} to ${chartData?.at(-1)?.date}`;
    }
  }, [chartData]);

  return (
    <Card>
      <Flex justifyContent="start">
        <Flex alignItems="start" flexDirection="col">
          <Title>Rates change chart</Title>

          {chartRangeText ? (
            <Title>{chartRangeText}</Title>
          ) : (
            <Skeleton className="h-7 w-72" />
          )}
        </Flex>

        <Flex justifyContent="center" className="gap-2">
          <Title className="text-slate-800">USD /</Title>

          <Select
            defaultValue={selectedCurrency}
            onValueChange={onCurrencyChange}
          >
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
        </Flex>

        <Flex justifyContent="end" className="gap-2">
          <RatesChartControls
            skip={skip}
            setSkip={setSkip}
            limit={limit}
            selectedPeriod={selectedPeriod}
          />
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
        </Flex>
      </Flex>

      {chartData.length ? (
        <AreaChart
          curveType="natural"
          className="mt-6"
          data={chartData}
          index="date"
          categories={[selectedCurrency]}
          colors={['blue']}
          showLegend={false}
          autoMinValue
          yAxisWidth={60}
        />
      ) : (
        <Skeleton className="w-full h-80 mt-6" />
      )}
    </Card>
  );
};

export default RatesChart;
