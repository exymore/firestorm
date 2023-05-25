import React, { useEffect, useMemo } from 'react';
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
import { HistoricalPeriods } from '@/types/currency';
import { Skeleton } from '@/components/ui/skeleton';

const rateFormatters = {
  [HistoricalPeriods.DAY]: 'DD MMM YYYY',
  [HistoricalPeriods.MONTH]: 'MMM YYYY',
  [HistoricalPeriods.YEAR]: 'YYYY',
};

const RatesChart = () => {
  const { chartRates, currencyList, fetchChartRates, chartRatesLoading } =
    useCurrencyStore();
  const [selectedCurrency, setSelectedCurrency] = React.useState('EUR');
  const [selectedPeriod, setSelectedPeriod] = React.useState<HistoricalPeriods>(
    HistoricalPeriods.MONTH
  );

  const onCurrencyChange = (value: string) => setSelectedCurrency(value);
  const onPeriodChange = (value: HistoricalPeriods) => setSelectedPeriod(value);

  useEffect(() => {
    if (currencyList.length > 0) {
      fetchChartRates(selectedCurrency, selectedPeriod);
    }
  }, [currencyList, fetchChartRates, selectedCurrency, selectedPeriod]);

  const chartData = useMemo(() => {
    return chartRates
      .filter((item) => item.data?.[selectedCurrency])
      .map((item) => ({
        date: dayjs(item.date).format(rateFormatters[selectedPeriod]),
        [selectedCurrency]: item.data[selectedCurrency],
      }))
      .reverse();
  }, [chartRates, selectedCurrency, selectedPeriod]);

  return (
    <Card>
      <Flex justifyContent="between">
        <Title>Rates change chart</Title>

        <div className="flex flex-row items-center gap-2">
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
        </div>

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
