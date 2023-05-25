class Api {
  static baseUrl = process.env.NEXT_PUBLIC_API_URL;
}

export class CurrencyApi extends Api {
  static async fetchCurrencyList() {
    const response = await fetch(`${this.baseUrl}/currency/list`);
    return response.json();
  }

  static async fetchLatestRates() {
    const response = await fetch(`${this.baseUrl}/currency/historical/latest`);
    return response.json();
  }
}
