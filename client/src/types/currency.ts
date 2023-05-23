export type Currency = {
  _id: string;
  name: string;
  sign: string;
};
export type CurrencyList = Array<Currency>;

export type HistoricalRatesDataItem = {
  [key: string]: number;
};

export type HistoricalRatesListItem = {
  _id: string;
  date: string;
  data: HistoricalRatesDataItem;
};
export type HistoricalRatesList = Array<HistoricalRatesListItem>;
