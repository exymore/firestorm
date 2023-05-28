import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CurrencyApi } from '@/api';
import { CurrencyState } from '@/types/store';
import {
  Currency,
  CurrencyList,
  HistoricalRatesDataItem,
  HistoricalRatesList,
} from '@/types/currency';
import { FetchChartRates } from '@/types/api';

export const defaultCurrencyList: Array<string> = ['USD', 'EUR', 'GBP', 'CAD'];

export const todayRateSelector = (state: CurrencyState) =>
  state.lastWeekRates[0]?.data;
export const yesterdayRateSelector = (state: CurrencyState) =>
  state.lastWeekRates[1]?.data;

const useCurrencyStore = create<CurrencyState>()(
  devtools((set) => ({
    currencyList: [],
    currencyListLoading: true,
    selectedCurrencyList: [],

    lastWeekRates: [],
    latestRatesLoading: true,
    convertedCurrencyData: {},

    chartRates: [],
    chartRatesLoading: true,

    fetchCurrencyList: async () => {
      set({ currencyListLoading: true });

      const data: CurrencyList = await CurrencyApi.fetchCurrencyList();
      set({ currencyList: data });
      set({
        selectedCurrencyList: data
          .filter((currency) => defaultCurrencyList.includes(currency.sign))
          .sort((a, b) => {
            // USD should be always at top
            if (a.sign === 'USD' || b.sign === 'USD') return -1;
            return a.sign.localeCompare(b.sign);
          }),
      });
      set({ currencyListLoading: false });
    },
    fetchLatestRates: async () => {
      set({ latestRatesLoading: true });

      const latestRates = await CurrencyApi.fetchLatestRates();
      set({ lastWeekRates: latestRates });

      const todayRate = latestRates[0].data;
      const convertedCurrencyData: HistoricalRatesDataItem = {};
      for (const currency in todayRate) {
        convertedCurrencyData[currency] = todayRate[currency].toPrecision(4);
      }

      set({ convertedCurrencyData });
      set({ latestRatesLoading: false });
    },
    addCurrencyToList: (currencySign) =>
      set((state) => {
        const currency = state.currencyList.find(
          (c: Currency) => c.sign === currencySign
        );
        let result = state.selectedCurrencyList;

        if (currency) {
          result = [...state.selectedCurrencyList, currency];
        }
        return { selectedCurrencyList: result };
      }),
    deleteFromCurrencyList: (currencySign) =>
      set((state) => {
        return {
          selectedCurrencyList: state.selectedCurrencyList.filter(
            (currency) => currency.sign !== currencySign
          ),
        };
      }),
    onChangeCurrencyData: (inputValue = '0', currency) =>
      set((state) => {
        const latestRates = state.lastWeekRates[0].data;
        const updatedCurrencyData = Object.entries(latestRates).map((curr) => {
          let newCurrencyValue;
          const currentCurrencyRate = latestRates[curr[0]] ?? 0;
          const changedCurrencyRate = latestRates[currency.sign] ?? 0;

          if (curr[0] === currency.sign) {
            newCurrencyValue = inputValue;
          } else {
            newCurrencyValue = (
              (currentCurrencyRate / changedCurrencyRate) *
              +inputValue
            ).toFixed(3);
          }
          return [curr[0], newCurrencyValue];
        });

        return {
          convertedCurrencyData: Object.fromEntries(updatedCurrencyData),
        };
      }),

    fetchChartRates: async ({
      currencySign,
      period,
      skip,
      limit,
    }: FetchChartRates) => {
      set({ chartRates: [] });
      set({ chartRatesLoading: true });

      const chartRates: HistoricalRatesList = await CurrencyApi.fetchChartRates(
        {
          currencySign,
          period,
          skip,
          limit,
        }
      );
      set({ chartRates });
      set({ chartRatesLoading: false });
    },
  }))
);

export default useCurrencyStore;
