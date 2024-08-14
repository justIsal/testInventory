import React from 'react';
import Laporan from '@/components/pages/admin/Laporan';
import LaporanPengadaan from '@/components/pages/admin/LaporanPengadaa';
import LaporanPermintaan from '@/components/pages/admin/LaporanPermintaan';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function Index() {
  return <LaporanPermintaan />;
}
