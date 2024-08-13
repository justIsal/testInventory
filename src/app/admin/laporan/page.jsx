import React from 'react';
import Laporan from '@/components/pages/admin/Laporan';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Index() {
  return <Laporan />;
}
