'use client';

import React, { useEffect } from 'react';
import CardMain from '@/components/layouts/CardMain';
import { barangServices } from '@/services/barang';
import { useFetch } from '@/lib/axios/api';
import TableLaporan from '@/components/layouts/Tables/TableLaporan';
const TABLE_HEAD = ['', 'Tanggal', 'Barang', 'stok awal', 'masuk', 'keluar', 'stok akhir'];

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function Laporan() {
  const {
    loading: loadingLog,
    response: ressLog,
    fetchData: fetchLog,
  } = useFetch('log', barangServices.fetchLog);

  useEffect(() => {
    fetchLog();
  }, []);
  if (loadingLog) return <>Loading.....</>;
  return (
    <div>
      <CardMain title={'Log Barang'} icon={'/svg/permintaan2.svg'}>
        {ressLog && <TableLaporan tableHead={TABLE_HEAD} tableRow={ressLog} />}
      </CardMain>
    </div>
  );
}
