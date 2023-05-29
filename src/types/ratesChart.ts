import { HistoricalRatesListItem } from '@/types/currency';

type RatesChartDataItem = Pick<HistoricalRatesListItem, 'date'> & {
  [key: string]: string | number;
};

export type RatesChartData = Array<RatesChartDataItem>;
