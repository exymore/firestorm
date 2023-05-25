import React, { useMemo } from 'react';
import {
  AreaChart,
  BadgeDelta,
  Card,
  DeltaType,
  Flex,
  Grid,
  Metric,
  Text,
  Title,
} from '@tremor/react';
import { Currency } from '@/types/currency';
import useCurrencyStore, {
  todayRateSelector,
  yesterdayRateSelector,
} from '@/store';
import dayjs from 'dayjs';

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
    return lastWeekRates.map((item) => ({
      date: dayjs(item.date).format('MMM D'),
      value: item.data[currency.sign],
    }));
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
          className="mt-2 h-28"
          data={chartData.reverse()}
          index="date"
          categories={['value']}
          colors={['blue']}
          autoMinValue
          showXAxis={true}
          showGridLines={false}
          startEndOnly={true}
          showYAxis={false}
          showLegend={false}
        />
      )}
    </Card>
  );
};

const RatesChangeCard = () => {
  const { selectedCurrencyList } = useCurrencyStore();

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Rates change</Title>
      <Grid numColsLg={3} numColsSm={1} className="gap-3">
        {selectedCurrencyList
          .filter((currency) => currency.sign !== 'USD')
          .map((currency) => (
            <RatesChangeBlock key={currency.sign} currency={currency} />
          ))}
      </Grid>
    </Card>
  );
};

export default RatesChangeCard;
