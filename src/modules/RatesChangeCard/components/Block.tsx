import {
  AreaChart,
  BadgeDelta,
  Card,
  Flex,
  Metric,
  Text,
  Title,
} from '@tremor/react';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import useCurrencyStore, {
  todayRateSelector,
  yesterdayRateSelector,
} from '@/store';
import { Currency } from '@/types/currency';
import { RatesChartData } from '@/types/ratesChart';

type RatesChangeBlockProps = {
  currency: Currency;
};

function RatesChangeBlock({
  currency,
}: RatesChangeBlockProps): React.JSX.Element {
  const latestRate = useCurrencyStore(todayRateSelector)?.[currency.sign];
  const yesterdayRate = useCurrencyStore(yesterdayRateSelector)?.[
    currency.sign
  ];
  const { lastWeekRates } = useCurrencyStore();

  const chartData = useMemo(() => {
    return lastWeekRates.reduce<RatesChartData>((acc, rate) => {
      acc.unshift({
        date: dayjs(rate.date).format('MMM D'),
        value: rate.data[currency.sign],
      });
      return acc;
    }, []);
  }, [currency.sign, lastWeekRates]);

  const currencyToUsdRate = latestRate?.toPrecision(4);

  const delta = latestRate - yesterdayRate;
  const deltaType = useMemo(() => {
    if (delta > 0) return 'moderateIncrease';
    if (delta < 0) return 'moderateDecrease';
    return 'unchanged';
  }, [delta]);

  return (
    <Card>
      <Flex>
        <Title>USD / {currency.sign}</Title>
        <Flex flexDirection="col" justifyContent="end" alignItems="end">
          <Text>From yesterday</Text>
          <BadgeDelta deltaType={deltaType}>{delta.toPrecision(1)}</BadgeDelta>
        </Flex>
      </Flex>

      <Metric>{currencyToUsdRate}</Metric>
      {chartData.length > 0 && (
        <AreaChart
          className="mt-4 h-32"
          data={chartData}
          curveType="natural"
          index="date"
          categories={['value']}
          colors={['blue']}
          autoMinValue
          showXAxis
          showGridLines={false}
          startEndOnly
          showYAxis={false}
          showLegend={false}
        />
      )}
    </Card>
  );
}

export default RatesChangeBlock;
