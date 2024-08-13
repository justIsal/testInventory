import React, { useState } from 'react';
import { Card, Typography, CardBody, Button } from '@material-tailwind/react';
import Image from 'next/image';
import { ModalLaporan } from '../Modals/ModalLaporan';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function TableLaporan({ tableHead, tableRow }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
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
  return (
    <Card className="h-full w-full bg-transparent" shadow={false}>
      <Button onClick={handleOpen} className="rounded-none bg-green-500">
        Export
      </Button>
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

                return item[activity]?.validasi === 'Disetujui';
              })
              .map((item, index) => {
                const isLast = index === tableRow.length - 1;
                const classes = isLast ? 'p-4' : 'p-5 ';
                let activity;
                if (item['id-permintaan']) activity = 'permintaan';
                if (item['id-pengadaan']) activity = 'pengadaan';
                if (item['id-retur']) activity = 'retur';
                console.log(item[activity]?.validasi === 'Disetujui');
                return (
                  <tr
                    className="relative after:absolute after:w-full after:h-20 after:bg-blue-200 after:left-0 after:rounded-full after:z-[-1] bg-transparent"
                    key={item['id-log']}
                  >
                    <td className={classes}>
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full mr-[-20px]  ${
                          status(item[activity]?.validasi).bg
                        }`}
                      >
                        <Image
                          src={status(item[activity]?.validasi, activity).icon}
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
                          {formatTimestampToDate(item.createdAt)}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item?.barang?.nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item?.barang?.stok}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {(activity == 'pengadaan' && item[activity].jumlah) || 0}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {/* {item[activity]?.jumlah} */}
                        {(activity == 'permintaan' && item[activity].jumlah) || 0}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {/* {item[activity]?.jumlah} */}
                        {item?.barang?.stok}
                      </Typography>
                    </td>
                    <td className={classes}></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <ModalLaporan open={open} handleOpen={handleOpen} data={tableRow} />
    </Card>
  );
}
