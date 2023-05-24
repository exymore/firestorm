import React from 'react';
import { Bold, Card, Divider, Grid, Title } from '@tremor/react';
import { TrendingUp } from 'lucide-react';
import { Currency } from '@/types/currency';
import { Skeleton } from '@/components/ui/skeleton';
import useCurrencyStore from '@/store';

type RateTextProps = {
  text?: string;
};

type RatesChangeValueProps = {
  currency: Currency;
};

const RateText = ({ text }: RateTextProps) => {
  const { latestRates } = useCurrencyStore();
  const shouldShowRate = text && !Number.isNaN(+text) && latestRates;

  if (shouldShowRate)
    return (
      <>
        <Bold>{text}</Bold>
        <TrendingUp size={16} className="ml-1 inline-flex" />
      </>
    );

  return <Skeleton className="h-4 w-[100px]" />;
};

const RatesChangeValue = ({ currency }: RatesChangeValueProps) => {
  const { latestRates } = useCurrencyStore();

  const usdToCurrencyRate = (1 / latestRates?.[currency.sign])?.toFixed(3);
  const currencyToUsdRate = latestRates?.[currency.sign]?.toFixed(3);

  return (
    <>
      <Card>
        <Title>USD / {currency.sign}</Title>
        <RateText text={currencyToUsdRate} />
        <Divider />
        <Title>{currency.sign} / USD</Title>
        <RateText text={usdToCurrencyRate} />
      </Card>
    </>
  );
};

const RatesChangeCard = () => {
  const { selectedCurrencyList } = useCurrencyStore();

  return (
    <Card className="h-full w-full">
      <Title className="mb-3">Rates change</Title>
      <Grid numColsLg={4} numColsSm={1} className="gap-3">
        {selectedCurrencyList
          .filter((currency) => currency.sign !== 'USD')
          .map((currency) => (
            <RatesChangeValue key={currency.sign} currency={currency} />
          ))}
      </Grid>
    </Card>
  );
};

export default RatesChangeCard;
