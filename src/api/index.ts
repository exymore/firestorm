import { FetchChartRates } from '@/types/api';
import {
  CurrencyList,
  HistoricalPeriods,
  HistoricalRatesList,
} from '@/types/currency';

class Api {
  static baseUrl = process.env.NEXT_PUBLIC_API_URL;
}

// eslint-disable-next-line import/prefer-default-export
export class CurrencyApi extends Api {
  static async fetchCurrencyList(): Promise<CurrencyList> {
    const url = new URL(`${this.baseUrl}/currency/list`);
    const response = await fetch(url);
    return response.json();
  }

  static async fetchLatestRates(): Promise<HistoricalRatesList> {
    const url = new URL(`${this.baseUrl}/currency/historical/latest`);
    const response = await fetch(url);
    return response.json();
  }

  static async fetchChartRates({
    currencySign,
    period,
    skip,
    limit,
  }: FetchChartRates): Promise<HistoricalRatesList> {
    const url = new URL(`${this.baseUrl}/currency/historical`);
    url.searchParams.set('currency', currencySign);
    url.searchParams.set('period', period);
    if (period !== HistoricalPeriods.YEAR) {
      url.searchParams.set('skip', <string>skip);
      url.searchParams.set('limit', <string>limit);
    }

    const response = await fetch(url);
    return response.json();
  }
}
