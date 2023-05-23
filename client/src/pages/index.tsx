import { useCurrencyData } from '@/hooks/useCurrencyData';
import CurrencyInput from '@/components/currency-input';
import AddCurrencySelect from '@/components/add-currency-select';
import { useCurrencyList } from '@/hooks/useCurrencyList';

export default function Home() {
  const { currencyData, onChangeCurrencyData } = useCurrencyData();

  const {
    currencyToAddList,
    selectedCurrencyList,
    handleAddCurrencyToList,
    handleDeleteFromCurrencyList,
  } = useCurrencyList();

  return (
    <div className="flex flex-col">
      {selectedCurrencyList.map((currency) => (
        <div key={currency.sign} className="pb-3">
          <CurrencyInput
            currency={currency}
            value={String(currencyData[currency.sign])}
            onChange={onChangeCurrencyData}
            handleDeleteFromCurrencyList={handleDeleteFromCurrencyList}
          />
        </div>
      ))}

      <AddCurrencySelect
        currencyToAddList={currencyToAddList}
        handleAddCurrencyToList={handleAddCurrencyToList}
      />
    </div>
  );
}
