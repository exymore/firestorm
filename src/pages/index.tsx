import { Col, Grid } from '@tremor/react';
import ConverterCard from '../modules/Converter';
import RatesChangeCard from '../modules/RatesChangeCard';
import useCurrencyStore from '@/store';
import { useEffect } from 'react';
import RatesChart from '../modules/RatesChart';

export default function Home() {
  const { fetchCurrencyList, fetchLatestRates } = useCurrencyStore();

  useEffect(() => {
    fetchCurrencyList();
    fetchLatestRates();
  }, [fetchCurrencyList, fetchLatestRates]);

  return (
    <>
      <Grid numColsLg={6} numColsMd={1} className="gap-6">
        <Col numColSpanLg={2}>
          <ConverterCard />
        </Col>

        <Col numColSpanLg={4}>
          <RatesChangeCard />
        </Col>
      </Grid>

      <Grid className="my-8">
        <Col>
          <RatesChart />
        </Col>
      </Grid>
    </>
  );
}
