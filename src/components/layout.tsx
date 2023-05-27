import Sidebar from './Sidebar';
import { Col, Grid } from '@tremor/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
