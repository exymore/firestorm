import { Col, Grid } from '@tremor/react';
import React from 'react';

import Sidebar from '../modules/Sidebar';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <Grid numColsSm={1} numColsMd={12} className="h-screen">
      <Col numColSpanMd={2}>
        <Sidebar />
      </Col>
      <Col numColSpanMd={10}>
        <div className="px-6 py-6 min-w-fit h-full">{children}</div>
      </Col>
    </Grid>
  );
}
