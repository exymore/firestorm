import React from 'react';

import Skeleton from '@/components/ui/skeleton';
import { defaultCurrencyList } from '@/store';

function ConverterCardSkeleton(): React.JSX.Element {
  return (
    <>
      {defaultCurrencyList.map((sign) => (
        <Skeleton key={sign} className="w-full min-w-max h-12 mb-3" />
      ))}
      <Skeleton className="w-1/3 h-10" />
    </>
  );
}

export default ConverterCardSkeleton;
