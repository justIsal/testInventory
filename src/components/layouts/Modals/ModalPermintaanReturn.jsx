import React, { useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import CardMain from '../CardMain';
import { UserIcon } from '@heroicons/react/24/outline';
import ViewPermintaanReturn from '../download/ViewPermintaanReturn';
import { handleGeneratePdf } from '@/lib/jsPDF/handleJsPdf';
import { useSession } from 'next-auth/react';
import { returServices } from '@/services/retur';
import { usePost } from '@/lib/axios/api';
import {useRouter} from "next/navigation";

export function ModalPermintaanReturn({ open, handleOpen, data, resetValue }) {  
  const router = useRouter();
  const dokumentRef = useRef(null);
  const [value, setValue] = useState(data);

  const { data: session } = useSession();

  const {
    loading: loadingRtP,
    response: addReturj,
    postData: addRetur,
  } = usePost('/postl', returServices.addRetur);

  const onHandlerSubmit = async () => {
    await addRetur({
      'id-barang': value['id-barang'],
      'id-users': session.user['id-users'],
      'jenis-retur': 'Permintaan',
      keterangan: value.keterangan,
      harga: Number(value.harga),
      jumlah: Number(value.jumlah),
      alasan: value.alasan,
    });
    resetValue({
      nama: '',
      'id-barang': '',
      tipe: '',
      merek: '',
      jumlah: '',
      keterangan: '',
      alasan: '',
    });
    alert('Successfully');
    router.push("/pegawai/permintaan");
    handleOpen();
  };

  const handleDownload = () => {
    console.log(dokumentRef);
    handleGeneratePdf(dokumentRef);
  };

  return (
    <>
      <Dialog open={open} size={'xl'} className="bg-opacity-0 p-0 relative">
        <CardMain
          title={'Konfirmasi Permintaan Retur Barang'}
          icon={'/svg/permintaan2.svg'}
          className={'!w-full bg-[#D9D9D9] p-0'}
          classChild={'px-2'}
          handleOpen={handleOpen}
        >
          <DialogHeader className="flex items-center justify-center w-full">
            <div className="flex items-center gap-4 w-full">
              <UserIcon className="w-10" />
              <Typography>Nama Instansi</Typography>
            </div>
            <Typography variant="h2" className="text-center w-full">
              Permintaan Retur Barang
            </Typography>
            <div className="flex items-center gap-10 justify-end w-full">
              <div className="flex items-start gap-2 flex-col justify-start">
                <Typography>Resi</Typography>
                <Typography>Tanggal</Typography>
              </div>
              <div className="flex items-start gap-2 flex-col justify-start">
                <Typography>xxx-xx-xxx</Typography>
                <Typography>07/07/7000</Typography>
              </div>
            </div>
          </DialogHeader>
          <DialogBody className="py-0">
            <div className="flex flex-col mb-4">
              <Typography>Perminta Dari </Typography>
              <Typography>{session.user.nama}</Typography>
              <Typography>NIP/JABATAN</Typography>
            </div>
            <div className="w-full">
              <table className="mt-4 w-full min-w-max table-auto text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Kode</Typography>
                    </th>
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Barang</Typography>
                    </th>
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Merek</Typography>
                    </th>
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Tipe</Typography>
                    </th>
                    {/* <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Harga</Typography>
                    </th> */}
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Jumlah</Typography>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr>
                    <td className="p-2 text-black text-center">
                      <Typography>{data['id-barang']}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.nama}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.merek}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.tipe}</Typography>
                    </td>
                    {/* <td className="p-2 text-black text-center">
                      <Typography>{data.harga}</Typography>
                    </td> */}
                    <td className="p-2 text-black text-center">
                      <Typography>{data.jumlah}</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              onClick={onHandlerSubmit}
              className="bg-[#066AFF] mr-2 text-white"
              disabled={loadingRtP}
            >
              <span>Ajukan Permintaan</span>
            </Button>
            <Button
              variant="text"
              onClick={() => handleDownload()}
              className="bg-[#066AFF] text-white"
            >
              <span>Cetak Permintaan</span>
            </Button>
          </DialogFooter>
        </CardMain>
      </Dialog>
      <div className="m-auto translate-y-[200%] opacity-0 z-20 bg-white absolute">
        {session.user.username && (
          <ViewPermintaanReturn
            data={{ ...value, username: session.user.username }}
            dokumentRef={dokumentRef}
            className={'bg-none'}
          />
        )}
      </div>
    </>
  );
}
