import { Card, Col, Grid, LineChart, Title } from '@tremor/react';
import ConverterCard from '@/components/converter-card';
import RatesChangeCard from '@/components/rates-change-card';
import useCurrencyStore from '@/store';
import { useEffect } from 'react';

export default function Home() {
  const {
    latestRates,
    selectedCurrencyList,
    fetchCurrencyList,
    fetchLatestRates,
  } = useCurrencyStore();

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
          <Card>
            <Title>Rates change chart</Title>
            <LineChart
              className="mt-6"
              data={[]}
              index=""
              categories={[]}
              colors={[]}
              yAxisWidth={40}
            />
          </Card>
        </Col>
      </Grid>
    </>
  );
}
