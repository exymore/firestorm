import { Card, Col, Flex, Grid, Title } from '@tremor/react';
import React, { useMemo } from 'react';

import useRatesChart from '@/hooks/useRatesChart';
import RatesAreaChart from '@/modules/RatesChart/components/Chart';
import RatesChartControls from '@/modules/RatesChart/components/Controls';
import RatesChartCurrencySelect from '@/modules/RatesChart/components/CurrencySelect';
import RatesChartPeriodSelect from '@/modules/RatesChart/components/PeriodSelect';
import RatesChartRangeText from '@/modules/RatesChart/components/RangeText';

function RatesChart(): React.JSX.Element {
  const {
    chartData,

    selectedCurrency,
    onCurrencyChange,

    selectedPeriod,
    skip,
    limit,
    setSkip,
    onPeriodChange,
  } = useRatesChart();

  const chartRangeText = useMemo<string>(() => {
    return chartData.length > 0
      ? `From ${chartData?.at(0)?.date} to ${chartData?.at(-1)?.date}`
      : '';
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

        <div className="lg:justify-end flex items-center gap-2">
          <RatesChartControls
            selectedPeriod={selectedPeriod}
            skip={skip}
            setSkip={setSkip}
            limit={limit}
          />
          <RatesChartPeriodSelect
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
          />
        </div>
      </Grid>

      <RatesAreaChart
        chartData={chartData}
        selectedCurrency={selectedCurrency}
      />
    </Card>
  );
}

export default RatesChart;
