import React, { useMemo } from 'react';
import { Currency } from '@/types/currency';
import useCurrencyStore, {
  todayRateSelector,
  yesterdayRateSelector,
} from '@/store';
import dayjs from 'dayjs';
import {
  AreaChart,
  BadgeDelta,
  Card,
  Flex,
  Metric,
  Text,
  Title,
} from '@tremor/react';

type RatesChangeBlockProps = {
  currency: Currency;
};

const RatesChangeBlock = ({ currency }: RatesChangeBlockProps) => {
  const latestRate = useCurrencyStore(todayRateSelector)?.[currency.sign];
  const yesterdayRate = useCurrencyStore(yesterdayRateSelector)?.[
    currency.sign
  ];
  const { lastWeekRates } = useCurrencyStore();

  const chartData = useMemo(() => {
    return lastWeekRates
      .map((item) => ({
        date: dayjs(item.date).format('MMM D'),
        value: item.data[currency.sign],
      }))
      .reverse();
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
      {chartData.length && (
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
};

export default RatesChangeBlock;
