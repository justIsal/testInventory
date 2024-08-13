'use client';
import React, { useEffect } from 'react';
import CardMain from '@/components/layouts/CardMain';
import InputForm from '@/components/fragments/input/InputForm';
import { Button, Typography } from '@material-tailwind/react';
import { ModalPermintaan } from '@/components/layouts/Modals/ModalPermintaan';
import SelectForm from '@/components/fragments/input/SelectForm';

import { barangServices } from '@/services/barang';
import { useFetch } from '@/lib/axios/api';
import { useSession } from 'next-auth/react';

import { fifoServices } from '@/services/fifo';
import { ModalListBarang } from '@/components/layouts/Modals/ModalListBarang';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function PermintaanFormPage() {
  const {
    loading: loadingAll,
    response: allFifo,
    fetchData: fetchFifo,
  } = useFetch('/barasng', fifoServices.fetchFifoByMerek);

  const {
    loading: loadingBarang,
    response: allBarang,
    fetchData: fetchBarang,
  } = useFetch('/barang', barangServices.fetchAllBarang);

  const [open, setOpen] = React.useState(false);
  const [openBarang, setOpenBarang] = React.useState(false);
  const { data: session } = useSession();
  const [stok, setStok] = React.useState('');
  const [tipe, setTipe] = React.useState('');
  const [merek, setMerek] = React.useState([]);
  const [optionMerek, setOptionMerek] = React.useState([]);
  const [value, setValue] = React.useState({
    nama: '',
    'id-pengadaan': '',
    tipe: '',
    merek: '',
    jumlah: '',
    harga: '',
    keterangan: '',
    'id-users': session?.user['id-users'] || '',
    createdAt: '',
  });
  const handleOpen = () => setOpen(!open);
  const handleOpenBarang = () => setOpenBarang(!openBarang);
  const onHandlerSUbmit = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleOnChangeTipe = (e) => {
    setTipe(e);

    setMerek('');

    const filteredMerek = allBarang.filter((item) => item.tipe === e).map((item) => item.merek);

    setOptionMerek(filteredMerek);
  };
  const handleOnChangeMerek = (e) => {
    setMerek(e);

    const tipeData = allFifo.data.find((item) => Object.keys(item).includes(tipe));

    const namaData = Object.values(tipeData[tipe])
      .flatMap((merekObj) =>
        Object.values(merekObj).flatMap((merekArray) =>
          merekArray.filter((obj) => obj.barang.merek === e && obj.stok > 0)
        )
      )
      .flat()
      .sort((a, b) => a.createdAt - b.createdAt)
      .shift();

    const result = namaData ? namaData : null;
    console.log(result);

    // if (filteredMerek) {
    setValue({
      ...result,
      nama: result.barang.nama,
      jumlah: value.jumlah,
      keterangan: value.keterangan,
      harga: value.harga,
      merek: result.barang.merek,
      tipe: result.barang.tipe,
    });
    setStok(result.stok);
  };
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

  useEffect(() => {
    fetchBarang();
  }, []);
  useEffect(() => {
    fetchFifo();
  }, []);

  if (loadingAll) return <>Loading....</>;
  return (
    allFifo && (
      <div>
        {console.log(allFifo.tipe)}
        {open && (
          <ModalPermintaan
            open={open}
            handleOpen={handleOpen}
            data={value}
            listOption={allFifo.data}
            resetValue={setValue}
          />
        )}
        {openBarang && (
          <ModalListBarang
            openBarang={openBarang}
            handleOpenBarang={handleOpenBarang}
            data={allFifo}
            resetValue={setValue}
            filtered={{ filterMerek: value.merek, filterTipe: value.tipe }}
            result={(result) => {
              const {
                barang: { nama: namaBarang, merek: merekBarang, tipe: tipeBarang },
                jumlah,
                'id-pengadaan': idPengadaan,
              } = result;
              setValue({
                ...value,
                nama: namaBarang,
                merek: merekBarang,
                tipe: tipeBarang,
                'id-pengadaan': idPengadaan,
              });
              setStok(jumlah);
            }}
          />
        )}
        <CardMain title={'Form Permintaan Barang'} icon={'/svg/permintaan2.svg'}>
          <Typography variant="h4">Informasi Barang</Typography>
          <form onSubmit={onHandlerSUbmit}>
            <div className="flex justify-start items-start w-full gap-10">
              <div className="mb-1 flex flex-col gap-6 w-full">
                <SelectForm
                  label="Tipe Barang"
                  type="text"
                  placeholder="Tipe Barang"
                  value={tipe}
                  onChange={handleOnChangeTipe}
                  listOption={Array.isArray(allFifo.tipe) ? allFifo.tipe : []}
                  className={'bg-white mt-1'}
                />

                <InputForm
                  label="Kode Barang"
                  type="text"
                  placeholder="Kode Barang"
                  onChange={(e) => setValue({ ...value, 'id-barang': e.target.value })}
                  value={value['id-pengadaan']}
                  className={'bg-white'}
                  disabled={true}
                />
                <InputForm
                  label="Tanggal Barang"
                  type="text"
                  placeholder="Tanggal Barang"
                  onChange={(e) => setValue({ ...value, createdAt: e.target.value })}
                  value={formatDate(value.createdAt)}
                  className={'bg-white'}
                  disabled={true}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6  w-full">
                <SelectForm
                  label="Merek Barang"
                  type="text"
                  placeholder="Merek Barang"
                  // value={merek}
                  onChange={handleOnChangeMerek}
                  listOption={optionMerek}
                  className={'bg-white mt-1'}
                  disabled={!tipe}
                />
                <InputForm
                  label="Nama Barang"
                  type="text"
                  placeholder="Nama Barang"
                  onChange={(e) => setValue({ ...value, nama: e.target.value })}
                  value={value.nama}
                  className={'bg-white'}
                  disabled={true}
                />

                <Button
                  onClick={handleOpenBarang}
                  disabled={!value.merek}
                  className="bg-gray-600 py-4 mt-7 shadow-none"
                >
                  Lihat Log {value.nama || ''}
                </Button>
              </div>
            </div>
            <br />
            <div className="flex justify-start items-start w-full gap-10 mt-4">
              <div className="mb-1 flex flex-col gap-6  w-full">
                <InputForm
                  label="Harga Barang /unit"
                  type="number"
                  placeholder="Harga Barang /unit"
                  onChange={(e) => setValue({ ...value, harga: Number(e.target.value) })}
                  value={value.harga}
                  className={'bg-white'}
                />
                <InputForm
                  label="Keterangan Barang"
                  type="text"
                  placeholder="Keterangan Barang"
                  onChange={(e) => setValue({ ...value, keterangan: e.target.value })}
                  value={value.keterangan}
                  className={'bg-white'}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6  w-full">
                <InputForm
                  label="Jumlah Barang"
                  type="number"
                  placeholder="Jumlah Barang"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      jumlah: e.target.value > stok ? stok : Number(e.target.value),
                    })
                  }
                  value={value.jumlah}
                  className={'bg-white mt-1'}
                />
                <span
                  className={`-mt-3 text-[12px] ${
                    value.jumlah > stok ? 'text-red-600' : `text-black`
                  } ml-2`}
                >
                  {value.jumlah > stok ? 'Maximum' : `Stok: ${stok}`}
                </span>
              </div>
            </div>
            <Button type="submit" className="mt-6 bg-[#066AFF]" fullWidth>
              Submit
            </Button>
          </form>
        </CardMain>
      </div>
    )
  );
}
