import { defaultCurrencyList } from '@/store';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ConverterCardSkeleton = () => {
  return (
    <>
      {defaultCurrencyList.map((sign) => (
        <Skeleton key={sign} className="w-full min-w-max h-12 mb-3" />
      ))}
      <Skeleton className="w-1/3 h-10" />
    </>
  );
};

export default ConverterCardSkeleton;
