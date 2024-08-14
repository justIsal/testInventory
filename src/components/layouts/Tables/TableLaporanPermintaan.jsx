import React, { useState } from 'react';
import { Card, Typography, CardBody, Button } from '@material-tailwind/react';
import Image from 'next/image';
import { ModalLaporan } from '../Modals/ModalLaporan';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function TableLaporanPermintaan({ tableHead, tableRow }) {
  console.log(tableRow);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const status = (status, activity) => {
    switch (status) {
      case 'Pengajuan':
        return { icon: `/svg/${activity}3.svg`, bg: 'bg-white' };
      case 'Disetujui':
        return { icon: `/svg/${activity}.svg`, bg: 'bg-green-500' };
      case 'Ditolak':
        return { icon: `/svg/${activity}.svg`, bg: 'bg-red-500' };
      default:
        return { icon: `/svg/${activity}3.svg`, bg: 'bg-white' };
    }
  };
  // 'Tanggal', 'Nama', 'Tipe', 'Merek', 'Jumlah', 'Harga', 'Total'
  const columns = [
    {
      id: 'tanggal',
      displayName: 'Tanggal',
    },
    {
      id: 'nama',
      displayName: 'Nama',
    },
    {
      id: 'tipe',
      displayName: 'Tipe',
    },
    {
      id: 'merek',
      displayName: 'Merek',
    },
    {
      id: 'jumlah',
      displayName: 'Jumlah',
    },
    {
      id: 'harga',
      displayName: 'Harga',
    },
    {
      id: 'total',
      displayName: 'Total',
    },
  ];
  return (
    <Card className="h-full w-full bg-transparent" shadow={false}>
      <div className="w-full flex justify-end pr-1">
        <Button
          onClick={handleOpen}
          className="px-10 bg-blue-500 flex items-center gap-2 rounded-lg"
        >
          <Image
            src="/svg/laporan.svg"
            alt="Vercel Logo"
            className="h-5 w-5 m-auto"
            width={200}
            height={200}
          />
          <Typography>Export</Typography>
        </Button>
      </div>
      <CardBody className="overflow-x-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className=" p-4">
                  <Typography variant="small" color="black" className="font-bold leading-none">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRow
              .filter((item) => {
                let activity;
                if (item['id-permintaan']) activity = 'permintaan';
                if (item['id-pengadaan']) activity = 'pengadaan';
                if (item['id-retur']) activity = 'retur';

                return item?.validasi === 'Disetujui';
              })
              .map((item, index) => {
                const isLast = index === tableRow.length - 1;
                const classes = isLast ? 'p-4' : 'p-5 ';
                return (
                  <tr
                    className="relative after:absolute after:w-full after:h-20 after:bg-blue-200 after:left-0 after:rounded-full after:z-[-1] bg-transparent border-b-[#066AFF]/0 border-b-2"
                    key={item['id-log']}
                  >
                    <td className={classes}>
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full mr-[-20px]  ${
                          status(item['pengadaan']?.validasi).bg
                        }`}
                      >
                        <Image
                          src={status(item?.validasi, 'pengadaan').icon}
                          alt="Vercel Logo"
                          className="h-4 w-4 m-auto"
                          width={200}
                          height={200}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {item.tanggal}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.tipe}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.merek}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.jumlah}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.harga}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.total}
                      </Typography>
                    </td>

                    <td className={classes}></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <ModalLaporan open={open} handleOpen={handleOpen} data={tableRow} columns={columns} />
    </Card>
  );
}
