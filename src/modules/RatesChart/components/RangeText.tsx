import React from 'react';
import { Title } from '@tremor/react';
import RatesChartRangeTextSkeleton from '@/components/Skeletons/RatesChartRangeTextSkeleton';

type RatesChartRangeTextProps = {
  show: boolean;
  text?: string;
};

const RatesChartRangeText = ({ show, text }: RatesChartRangeTextProps) => {
  if (!show || !text) return <RatesChartRangeTextSkeleton />;
  return <Title>{text}</Title>;
};

export default RatesChartRangeText;
