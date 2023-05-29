import { MinusCircleIcon } from 'lucide-react';
import React from 'react';

type CurrencyInputDeleteButtonProps = {
  currencySign: string;
  deleteFromCurrencyList: (currencySign: string) => void;
};

function CurrencyInputDeleteButton({
  currencySign,
  deleteFromCurrencyList,
}: CurrencyInputDeleteButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="ml-3 mt-2 h-7 w-7"
      onClick={() => deleteFromCurrencyList(currencySign)}
    >
      <MinusCircleIcon
        size={18}
        strokeWidth={2}
        className="text-blue-800 hover:text-blue-400"
      />
    </button>
  );
}

export default CurrencyInputDeleteButton;
