import { Col, Grid } from '@tremor/react';
import Head from 'next/head';
import React from 'react';

import Sidebar from '../modules/Sidebar';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <>
      <Head>
        <title>Firestorm</title>
        <meta name="description" content="Financial monitor app" />
      </Head>
      <Grid numColsSm={1} numColsMd={12} className="h-screen">
        <Col numColSpanMd={2}>
          <Sidebar />
        </Col>
        <Col numColSpanMd={10}>
          <div className="px-6 py-6 min-w-fit h-full">{children}</div>
        </Col>
      </Grid>
    </>
  );
}
