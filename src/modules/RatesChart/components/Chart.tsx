import { AreaChart } from '@tremor/react';
import React from 'react';

import RatesAreaChartSkeleton from '@/components/Skeletons/RatesAreaChartSkeleton';
import { RatesChartData } from '@/types/ratesChart';

type RatesAreaChartProps = {
  chartData: RatesChartData;
  selectedCurrency: string;
};

function RatesAreaChart({
  chartData,
  selectedCurrency,
}: RatesAreaChartProps): React.JSX.Element {
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
}

export default RatesAreaChart;
