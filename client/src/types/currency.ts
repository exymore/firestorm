export type Currency = {
  name: string;
  sign: string;
};

export type CurrencyResponseData = Record<string, number>;

export type CurrencyInputProps = {
  currency: Currency;
  value: string;
  onChange: (inputValue: string | undefined, currency: Currency) => void;
};
