import {
  Currency,
  HistoricalPeriods,
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
    inputValue: string | undefined,
    currency: Currency
  ) => void;

  fetchChartRates: (
    currencySign: string,
    period: HistoricalPeriods
  ) => Promise<void>;
};
