import React from 'react';
import { AreaChart } from '@tremor/react';
import RatesAreaChartSkeleton from '@/components/Skeletons/RatesAreaChartSkeleton';
import { RatesChartData } from '@/hooks/useRatesChart';

type RatesAreaChartProps = {
  chartData: RatesChartData;
  selectedCurrency: string;
};

const RatesAreaChart = ({
  chartData,
  selectedCurrency,
}: RatesAreaChartProps) => {
  if (chartData.length === 0) return <RatesAreaChartSkeleton />;

  return (
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
  );
};

export default RatesAreaChart;
