import { FetchChartRates } from '@/types/api';
import { HistoricalPeriods } from '@/types/currency';

class Api {
  static baseUrl = process.env.NEXT_PUBLIC_API_URL;
}

export class CurrencyApi extends Api {
  static async fetchCurrencyList() {
    const url = new URL(`${this.baseUrl}/currency/list`);
    const response = await fetch(url);
    return response.json();
  }

  static async fetchLatestRates() {
    const url = new URL(`${this.baseUrl}/currency/historical/latest`);
    const response = await fetch(url);
    return response.json();
  }

  static async fetchChartRates({
    currencySign,
    period,
    skip,
    limit,
  }: FetchChartRates) {
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

  static async fetchRatesCount() {
    const url = new URL(`${this.baseUrl}/currency/historical/count`);
    const response = await fetch(url);
    return response.json();
  }
}
