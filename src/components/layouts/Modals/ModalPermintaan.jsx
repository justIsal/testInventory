import React, { useState, useRef, useEffect } from 'react';
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
import ViewPermintaanPage from '../download/ViewPermintaanPage';
import { handleGeneratePdf } from '@/lib/jsPDF/handleJsPdf';
import { useSession } from 'next-auth/react';
import { permintaanServices } from '@/services/permintaan';
import { usePost } from '@/lib/axios/api';
import { useRouter } from 'next/navigation';
export function ModalPermintaan({ open, handleOpen, data, resetValue }) {
  const [value, setValue] = useState(data);
  const dokumentRef = useRef(null);
  const [alertShown, setAlertShown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    loading: loadingAll,
    response: permintaanAllj,
    postData: addPermintaan,
  } = usePost('/postj', permintaanServices.addPermintaan);

  // useEffect(() => {
  //   if (!loadingAll && permintaanAllj?.status === 201) {
  //     alert(permintaanAllj.data);
  //     handleOpen();
  //   }
  // }, [permintaanAllj, loadingAll]);

  const onHandlerSubmit = async () => {
    await addPermintaan({
      'id-pengadaan': value['id-pengadaan'],
      'id-users': session.user['id-users'],
      keterangan: value.keterangan,
      harga: Number(value.harga),
      jumlah: Number(value.jumlah),
    });
    resetValue({
      nama: '',
      'id-pengadaan': '',
      tipe: '',
      merek: '',
      jumlah: '',
      harga: '',
      keterangan: '',
      'id-users': session?.user['id-users'] || '',
    });
    alert('Successfuly');
    router.push('/pegawai/permintaan');
    handleOpen();
  };

  const getFormattedDate = () =>
    `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(
      2,
      '0'
    )}/${String(new Date().getFullYear()).padStart(4, '0')}`;

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
          className={'!w-full bg-[#D9D9D9]  p-0'}
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
                <Typography>{data['id-pengadaan']}</Typography>
                <Typography>{getFormattedDate()}</Typography>
              </div>
            </div>
          </DialogHeader>
          <DialogBody className="py-0">
            <div className="flex flex-col mb-4">
              <Typography>Perminta Dari </Typography>
              <Typography>
                {session.user.nama} ({session.user['id-users']})
              </Typography>
              <Typography>Divisi {session.user.divisi}</Typography>
            </div>
            <form className="w-full">
              <table className="mt-4 w-full min-w-max table-auto text-left border-collapse">
                <thead>
                  <tr>
                    {/* <th className="border-y border-gray-100 bg-white-50/50 p-2">
                      <Typography className="text-center">Kode</Typography>
                    </th> */}
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
                    {/* <td className="p-2 text-black">
                      <Typography>{data["id-barang"]}</Typography>
                    </td> */}
                    <td className="p-2 text-black text-center">
                      <Typography>{data.nama}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.merek}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.tipe}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.harga}</Typography>
                    </td>
                    <td className="p-2 text-black text-center">
                      <Typography>{data.jumlah}</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <Typography className="mt-10">Keterangan : {data.keterangan}</Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              onClick={onHandlerSubmit}
              className="bg-[#066AFF] mr-2 text-white"
              disabled={loadingAll}
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
          <ViewPermintaanPage
            data={{ ...value, user: session.user }}
            dokumentRef={dokumentRef}
            className={'bg-none'}
          />
        )}
      </div>
    </>
  );
}
