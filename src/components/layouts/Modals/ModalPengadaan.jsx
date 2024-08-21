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
import ViewPengadaanPage from '../download/ViewPengadaanPage';
import { handleGeneratePdf } from '@/lib/jsPDF/handleJsPdf';
import { useSession } from 'next-auth/react';
import { permintaanServices } from '@/services/permintaan';
import { useFetch, usePost } from '@/lib/axios/api';
import { pengadaanServices } from '@/services/pengadaan';
import { useRouter } from 'next/navigation';
import { barangServices } from '@/services/barang';

export function ModalPengadaan({ open, handleOpen, data, resetValue }) {
  const [value, setValue] = useState(data);
  const [loading, isLoading] = useState(false);
  const dokumentRef = useRef(null);
  const [kodeBarangBaru, setKodeBarangBaru] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const {
    loading: loadingAllPengadaan,
    response: addPengadaanAllj,
    postData: addPengadaan,
  } = usePost('/postjl', pengadaanServices.addPengadaan);

  useEffect(() => {
    if (value['id-barang'] === 'Barang Baru') {
      isLoading(true);
      fetch('/api/v1.0.0/barang/kode')
        .then((response) => response.json())
        .then((data) => {
          console.log('Generated Kode Barang:', data.kodeBarang);
          setKodeBarangBaru(data.kodeBarang);
          isLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching kode barang:', error);
          isLoading(false);
        });
    }
  }, [value]);

  const onHandlerSubmit = async () => {
    await addPengadaan({
      ...value,
      'id-barang': value['id-barang'],
      'id-users': session.user['id-users'],
      keterangan: value.keterangan,
      harga: Number(value.harga),
      jumlah: Number(value.jumlah),
    });
    resetValue({
      nama: '',
      'id-barang': '',
      tipe: '',
      merek: '',
      jumlah: '',
      harga: '',
      keterangan: '',
      'id-users': session?.user['id-users'] || '',
    });
    alert('Successfuly');
    handleOpen();
    router.push('/pegawai/pengadaan');
  };

  const handleDownload = () => {
    handleGeneratePdf(dokumentRef);
  };

  const getFormattedDate = () =>
    `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(
      2,
      '0'
    )}/${String(new Date().getFullYear()).padStart(4, '0')}`;

  return (
    <>
      <Dialog open={open} size={'xl'} className="bg-opacity-0 p-0 relative">
        <CardMain
          title={'Konfirmasi pengadaan Barang'}
          icon={'/svg/pengadaan.svg'}
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
              Pengadaan Barang
            </Typography>
            <div className="flex items-center gap-10 justify-end w-full">
              <div className="flex items-start gap-2 flex-col justify-start">
                <Typography>Resi</Typography>
                <Typography>Tanggal</Typography>
              </div>
              <div className="flex items-start gap-2 flex-col justify-start">
                <Typography>{data['id-barang']}</Typography>
                <Typography>{getFormattedDate()}</Typography>
              </div>
            </div>
          </DialogHeader>
          <DialogBody className="py-0">
            <div className="flex flex-col mb-4">
              <Typography>Perminta Dari </Typography>
              <Typography>{session.user.nama}</Typography>
              <Typography>NIP/JABATAN</Typography>
            </div>
            <form className="w-full">
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
                      {loading ? ( // Ganti loading dengan loadingKode sesuai state loading yang digunakan untuk fetch kode barang
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-blue-500"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          <Typography>Generate Kode...</Typography>
                        </div>
                      ) : value['id-barang'] === 'Barang Baru' && kodeBarangBaru ? (
                        <Typography className="text-blue-500">{kodeBarangBaru}</Typography>
                      ) : (
                        <Typography>{data['kode-barang']}</Typography>
                      )}
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
              disabled={loadingAllPengadaan}
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
          <ViewPengadaanPage
            data={{ ...value, username: session.user.username }}
            dokumentRef={dokumentRef}
            className={'bg-none'}
          />
        )}
      </div>
    </>
  );
}
