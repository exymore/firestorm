import { FetchChartRates } from '@/types/api';
import {
  Currency,
  HistoricalRatesDataItem,
  HistoricalRatesList,
} from '@/types/currency';

export type CurrencyState = {
  currencyList: Array<Currency>;
  currencyListLoading: boolean;
  selectedCurrencyList: Array<Currency>;

  lastWeekRates: HistoricalRatesList;
  latestRatesLoading: boolean;
  convertedCurrencyData: HistoricalRatesDataItem;

  chartRates: HistoricalRatesList;
  chartRatesLoading: boolean;

  fetchCurrencyList: () => Promise<void>;
  fetchLatestRates: () => Promise<void>;

  addCurrencyToList: (currencySign: string) => void;
  deleteFromCurrencyList: (currencySign: string) => void;
  onChangeCurrencyData: (
    currency: Currency,
    inputValue: string | undefined
  ) => void;

  fetchChartRates: ({
    currencySign,
    period,
    skip,
    limit,
  }: FetchChartRates) => Promise<void>;
};
