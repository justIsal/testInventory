'use client';

import React, { useEffect } from 'react';
import CardMain from '@/components/layouts/CardMain';
import { barangServices } from '@/services/barang';
import { useFetch } from '@/lib/axios/api';
import TableLaporanPengadaan from '@/components/layouts/Tables/TableLaporanPengadaan';
import { pengadaanServices } from '@/services/pengadaan';
import { permintaanServices } from '@/services/permintaan';
import TableLaporanPermintaan from '@/components/layouts/Tables/TableLaporanPermintaan';
const TABLE_HEAD = ['', 'Tanggal', 'Nama', 'Tipe', 'Merek', 'Jumlah', 'Harga', 'Total'];

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function LaporanPermintaan() {
  const {
    loading: loadingLog,
    response: ressLog,
    fetchData: fetchLog,
  } = useFetch('logs', permintaanServices.fetchAllpermintaan);

  useEffect(() => {
    fetchLog();
  }, []);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formattedDate;
  };
  function formatToRupiah(number) {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    });
  }
  if (loadingLog) return <>Loading.....</>;
  return (
    <div>
      <CardMain title={'Laporan permintaan'} icon={'/svg/permintaan2.svg'}>
        {ressLog && (
          <TableLaporanPermintaan
            tableHead={TABLE_HEAD}
            tableRow={ressLog.map((item) => ({
              ...item,
              merek: item.barang.merek,
              tipe: item.barang.tipe,
              nama: item.barang.nama,
              total: formatToRupiah(item.jumlah * item.harga),
              tanggal: formatDate(item.createdAt),
              harga: formatToRupiah(item.harga),
            }))}
          />
        )}
      </CardMain>
    </div>
  );
}
