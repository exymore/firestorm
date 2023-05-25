import { Col, Grid } from '@tremor/react';
import ConverterCard from '@/components/converter-card';
import RatesChangeCard from '@/components/rates-change-card';
import useCurrencyStore from '@/store';
import { useEffect } from 'react';
import RatesChart from '@/components/rates-chart';

export default function Home() {
  const { fetchCurrencyList, fetchLatestRates, fetchChartRates } =
    useCurrencyStore();

  useEffect(() => {
    fetchCurrencyList();
    fetchLatestRates();
  }, []);

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
