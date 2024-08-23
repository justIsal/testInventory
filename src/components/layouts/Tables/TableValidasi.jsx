import React, { useState } from 'react';

import { PencilIcon } from '@heroicons/react/24/solid';
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from '@material-tailwind/react';
import { ModalValidasi } from '../Modals/ModalValidasi';
import Image from 'next/image';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function TableValidasi({ tableHead, tableRow }) {
  const [getItem, setGetItem] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleOpen = () => setOpen(!open);

  const handlerOnModal = (activity, value) => {
    setGetItem({ activity: activity, data: value });
    handleOpen();
  };

  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <Card className="h-full w-full bg-transparent" shadow={false}>
      {/* <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent">
        <div className="mb-4 flex flex-col justify-end gap-8 md:flex-row md:items-center">
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader> */}
      <CardBody className="overflow-x-scroll  px-0">
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
            {tableRow.map((item, index) => {
              const isLast = index === tableRow.length - 1;
              const classes = isLast ? 'p-4' : 'p-5  ';
              // console.log(item);
              let activity;
              if (item['id-permintaan']) activity = 'permintaan';
              if (item['id-pengadaan']) activity = 'pengadaan';
              if (item['id-retur']) activity = 'retur';
              // console.log(item[activity]?.validasi)
              return (
                <tr
                  className="relative after:absolute after:w-full after:h-20 after:bg-blue-200 after:left-0 after:rounded-full after:z-[-1] bg-transparent"
                  key={item['id-log']}
                >
                  <td className={classes}>
                    {/* <Tooltip content=""> */}
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full mr-[-20px]  ${
                        status(item[activity]?.validasi).bg
                      }`}
                    >
                      <Image
                        src={status(item[activity]?.validasi, activity).icon}
                        alt={activity}
                        className="h-4 w-4 m-auto"
                        width={200}
                        height={200}
                        // priority
                      />
                    </div>
                    {/* </Tooltip> */}
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
                      {item?.barang['kode-barang']}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item?.barang?.nama}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item?.barang?.merek}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item?.barang?.tipe}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item[activity]?.jumlah}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal capitalize"
                    >
                      {item?.users?.nama}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {item?.users?.divisi}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Action">
                      <IconButton
                        variant="text"
                        className="bg-white rounded-full mr-[-20px]"
                        onClick={() =>
                          handlerOnModal(`${activity} - ${item[`id-${activity}`]}`, {
                            ...item[activity],
                            user: item?.users,
                            barang: item?.barang,
                          })
                        }
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {getItem && <ModalValidasi open={open} handleOpen={handleOpen} data={getItem} />}
    </Card>
  );
}
