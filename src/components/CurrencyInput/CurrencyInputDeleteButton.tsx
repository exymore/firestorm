import React from 'react';
import { MinusCircleIcon } from 'lucide-react';

type CurrencyInputDeleteButtonProps = {
  currencySign: string;
  deleteFromCurrencyList: (currencySign: string) => void;
};

const CurrencyInputDeleteButton = ({
  currencySign,
  deleteFromCurrencyList,
}: CurrencyInputDeleteButtonProps) => {
  return (
    <button
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
};

export default CurrencyInputDeleteButton;
