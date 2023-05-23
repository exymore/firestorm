import { useEffect, useMemo, useState } from 'react';
import { Currency, CurrencyList } from '@/types/currency';
import { useGetCurrencyListQuery } from '@/api';

const defaultCurrencyList: Array<string> = ['USD', 'EUR', 'CAD'];

export function useCurrencyList() {
  const [selectedCurrencyList, setSelectedCurrencyList] =
    useState<CurrencyList>([]);

  const { data: allCurrencyList } = useGetCurrencyListQuery();

  useEffect(() => {
    setSelectedCurrencyList(
      allCurrencyList?.filter((currency: Currency) =>
        defaultCurrencyList.includes(currency.sign),
      ) ?? [],
    );
  }, [allCurrencyList]);

  const currencyToAddList = useMemo(() => {
    if (allCurrencyList) {
      return allCurrencyList?.filter(
        (currency: Currency) =>
          !selectedCurrencyList?.map((s) => s.sign)?.includes(currency.sign),
      );
    }
    return [];
  }, [allCurrencyList, selectedCurrencyList]);

  function handleAddCurrencyToList(currencySign: string) {
    const currency = allCurrencyList?.find(
      (c: Currency) => c.sign === currencySign,
    );

    if (currency) {
      setSelectedCurrencyList((prevState) => [...prevState, currency]);
    }
  }

  function handleDeleteFromCurrencyList(currencySign: string) {
    setSelectedCurrencyList((prevState) =>
      prevState.filter((c: Currency) => c.sign !== currencySign),
    );
  }

  return {
    selectedCurrencyList,
    currencyToAddList,

    handleAddCurrencyToList,
    handleDeleteFromCurrencyList,
  };
}
