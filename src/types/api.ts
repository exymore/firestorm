import { HistoricalPeriods } from '@/types/currency';

export type FetchChartRates = {
  currencySign: string;
  period: HistoricalPeriods;
  skip?: string | number;
  limit?: string | number;
};
