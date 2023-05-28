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
  DeltaType,
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

  const diffInPercents = (latestRate / yesterdayRate - 1) * 100;
  const currencyToUsdRate = latestRate?.toFixed(3);

  const delta = latestRate - yesterdayRate;
  let deltaType: DeltaType = 'unchanged';
  if (delta > 0) {
    deltaType = 'moderateIncrease';
  } else if (delta < 0) {
    deltaType = 'moderateDecrease';
  }

  return (
    <Card>
      <Flex>
        <Title>USD / {currency.sign}</Title>
        <Flex flexDirection="col" justifyContent="end" alignItems="end">
          <Text>From yesterday</Text>
          <BadgeDelta deltaType={deltaType}>
            {diffInPercents.toFixed(2)}%
          </BadgeDelta>
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
