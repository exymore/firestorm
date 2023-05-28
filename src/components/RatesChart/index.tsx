import React, { useMemo } from 'react';
import { AreaChart, Card, Col, Flex, Grid, Title } from '@tremor/react';
import { Skeleton } from '@/components/ui/skeleton';
import RatesChartControls from '@/components/RatesChart/Controls';
import CurrencySelect from '@/components/RatesChart/CurrencySelect';
import PeriodSelect from '@/components/RatesChart/PeriodSelect';
import useRatesChart from '@/hooks/useRatesChart';

const RatesChart = () => {
  const {
    chartData,

    selectedCurrency,
    onCurrencyChange,

    skip,
    limit,
    selectedPeriod,
    setSkip,
    onPeriodChange,
  } = useRatesChart();

  const chartRangeText = useMemo(() => {
    if (chartData.length) {
      return `From ${chartData?.at(0)?.date} to ${chartData?.at(-1)?.date}`;
    }
  }, [chartData]);

  return (
    <Card>
      <Grid numColsSm={1} numColsLg={3} className="gap-4">
        <Col>
          <Title>Rates change chart</Title>

          {chartRangeText ? (
            <Title>{chartRangeText}</Title>
          ) : (
            <Skeleton className="h-7 w-72" />
          )}
        </Col>

        <Flex justifyContent="start" className="sm:mt-6 lg:mt-0 gap-2">
          <Title className="text-slate-800 whitespace-nowrap">USD /</Title>
          <CurrencySelect
            selectedCurrency={selectedCurrency}
            onCurrencyChange={onCurrencyChange}
          />
        </Flex>

        <Flex justifyContent="end" className="gap-2">
          <RatesChartControls
            skip={skip}
            setSkip={setSkip}
            limit={limit}
            selectedPeriod={selectedPeriod}
          />
          <PeriodSelect
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
          />
        </Flex>
      </Grid>

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
