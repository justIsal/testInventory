import React, { useRef } from 'react';
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
import { handleGeneratePdf } from '@/lib/jsPDF/handleJsPdf';
import { useSession } from 'next-auth/react';
import { useUpdateValidateById } from '@/lib/axios/api';
import { barangServices } from '@/services/barang';
import {useRouter} from "next/navigation";

export function ModalValidasi({ open, handleOpen, data }) {
  const router = useRouter();
  console.log(data);
  const dokumentRef = useRef(null);

  const { data: session } = useSession();

  const {
    loading: loadingAll,
    response: permintaanAll,
    updateDataValidasiById: updateActivityById,
  } = useUpdateValidateById('/updateValidasiById', barangServices.updateActivityById);

  const onHandlerSubmit = async (message) => {
    const id = data.activity.split(' - ')[1];
    const activity = data.activity.split(' - ')[0];
    await updateActivityById(id, activity, { validasi: message });
    router.push("/admin");
  };

  const handleDownload = () => {
    console.log(dokumentRef);
    handleGeneratePdf(dokumentRef);
  };

  return (
    <>
      <Dialog open={open} size={'xl'} className="bg-opacity-0 p-0 relative">
        <CardMain
          title={'Konfirmasi Permintaan Barang'}
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
              Permintaan Barang
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
              <Typography>{data.data?.user.nama}</Typography>
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
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Harga</Typography>
                    </th>
                    <th className="border-y border-gray-100 p-2">
                      <Typography className="text-center">Jumlah</Typography>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.data['id-barang']}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.data?.barang?.nama}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.data?.barang?.merek}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.data?.barang?.tipe}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.data.harga ? data.data.harga : '-'}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.data.jumlah}</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Typography>Keterangan : {data.data.keterangan}</Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              onClick={() => onHandlerSubmit('Ditolak')}
              className="bg-red-500 mr-2 text-white"
              disabled={loadingAll}
            >
              <span>Tolak</span>
            </Button>
            <Button
              variant="text"
              onClick={() => onHandlerSubmit('Disetujui')}
              className="bg-[#066AFF] text-white"
              disabled={loadingAll}
            >
              <span>Terima</span>
            </Button>
          </DialogFooter>
        </CardMain>
      </Dialog>
      <div className="m-auto translate-y-[200%] opacity-0 z-20 bg-white absolute">
        {/* <ViewPage data={data} dokumentRef={dokumentRef} className={'bg-none'} /> */}
      </div>
    </>
  );
}
