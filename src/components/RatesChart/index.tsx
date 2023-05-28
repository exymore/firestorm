import React, { useMemo } from 'react';
import { Card, Col, Flex, Grid, Title } from '@tremor/react';
import RatesChartControls from '@/components/RatesChart/RatesChartControls';
import RatesChartCurrencySelect from '@/components/RatesChart/RatesChartCurrencySelect';
import RatesChartPeriodSelect from '@/components/RatesChart/RatesChartPeriodSelect';
import useRatesChart from '@/hooks/useRatesChart';
import RatesAreaChart from '@/components/RatesChart/RatesAreaChart';
import RatesChartRangeText from '@/components/RatesChart/RatesChartRangeText';

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

          <RatesChartRangeText
            show={chartData.length > 0}
            text={chartRangeText}
          />
        </Col>

        <Flex justifyContent="start" className="sm:mt-6 lg:mt-0 gap-2">
          <Title className="text-slate-800 whitespace-nowrap">USD /</Title>
          <RatesChartCurrencySelect
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
          <RatesChartPeriodSelect
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
          />
        </Flex>
      </Grid>

      <RatesAreaChart
        chartData={chartData}
        selectedCurrency={selectedCurrency}
      />
    </Card>
  );
};

export default RatesChart;
