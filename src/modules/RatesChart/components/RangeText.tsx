import { Title } from '@tremor/react';
import React from 'react';

import RatesChartRangeTextSkeleton from '@/components/Skeletons/RatesChartRangeTextSkeleton';

type RatesChartRangeTextProps = {
  show: boolean;
  text?: string;
};

function RatesChartRangeText({
  show,
  text,
}: RatesChartRangeTextProps): React.JSX.Element {
  if (!show || !text) return <RatesChartRangeTextSkeleton />;
  return <Title>{text}</Title>;
}

RatesChartRangeText.defaultProps = {
  text: '',
};

export default RatesChartRangeText;
