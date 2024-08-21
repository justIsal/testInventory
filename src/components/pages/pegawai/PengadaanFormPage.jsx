'use client';
import React, { useEffect } from 'react';
import CardMain from '@/components/layouts/CardMain';
import InputForm from '@/components/fragments/input/InputForm';
import { Button, Typography } from '@material-tailwind/react';
import SelectForm from '@/components/fragments/input/SelectForm';
import { barangServices } from '@/services/barang';
import { useFetch } from '@/lib/axios/api';
import { useSession } from 'next-auth/react';
import { ModalPengadaan } from '@/components/layouts/Modals/ModalPengadaan';
import { fifoServices } from '@/services/fifo';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function PengdaanFormPage() {
  const {
    loading: loadingfetchAllBarang,
    response: allfetchAllBarang,
    fetchData: fetchAllBarang,
  } = useFetch('/barang', barangServices.fetchAllBarang);

  // const {
  //   loading: loadingfetchAllData,
  //   response: allfetchAllData,
  //   fetchData: fetchAllData,
  // } = useFetch('/fifoMrek', fifoServices.fetchFifoByMerek);

  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const [stok, setStok] = React.useState('');
  const [baru, setBaru] = React.useState(true);
  const [tipe, setTipe] = React.useState('');
  const [merek, setMerek] = React.useState([]);
  const [optionMerek, setOptionMerek] = React.useState(null);
  const [value, setValue] = React.useState({
    nama: '',
    'id-barang': '',
    tipe: '',
    merek: '',
    jumlah: '',
    harga: '',
    keterangan: '',
    'id-users': session?.user['id-users'] || '',
  });
  const handleOpen = () => setOpen(!open);
  const onHandlerSUbmit = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleOnChangeTipe = (e) => {
    if (e !== 'Jenis Baru') {
      setTipe(e);

      setMerek('');

      const filteredMerek = allfetchAllBarang
        .filter((item) => item.tipe === e)
        .map((item) => item.merek);

      setOptionMerek(filteredMerek);
      setMerek(filteredMerek[0] || '');
      console.log('Filtered Merek:', filteredMerek);
    } else {
      setValue({
        'id-barang': 'Barang Baru',
        nama: '',
        merek: '',
        tipe: '',
        harga: value.harga,
        jumlah: value.jumlah,
        keterangan: value.keterangan,
      });
      setTipe('Jenis Baru');
      setMerek('Merek Baru');
      setOptionMerek([]);
    }
  };
  const handleOnChangeMerek = (e) => {
    if (e !== 'Merek Baru') {
      setMerek(e);
      const filter = allfetchAllBarang.filter((item) => item.tipe === tipe && item.merek === e);
      if (filter.length > 0) {
        setValue({
          ...filter[0],
          // 'id-barang': e,
          harga: value.harga,
          jumlah: value.jumlah,
          keterangan: value.keterangan,
        });
        setStok(filter[0].stok);
        console.log(filter);
      }
      // setBaru(true);
    } else {
      setValue({
        'id-barang': 'Barang Baru',
        nama: '',
        merek: '',
        tipe: '',
        harga: value.harga,
        jumlah: value.jumlah,
        keterangan: value.keterangan,
      });
      setStok('');
      setMerek('Merek Baru');
    }
  };

  // useEffect(() => {
  //   console.log('');
  //   console.log('tipe');
  //   console.log(tipe);
  //   console.log('merek');
  //   console.log(merek);
  //   console.log('');
  // }, [tipe, merek]);

  useEffect(() => {
    if (tipe && tipe !== 'Jenis Baru') {
      const filteredMerek = allfetchAllBarang
        .filter((item) => item.tipe === tipe)
        .map((item) => item.merek);

      setOptionMerek(filteredMerek);
    } else {
      setOptionMerek([]);
    }
  }, [tipe, allfetchAllBarang]);
  useEffect(() => {
    if (optionMerek && optionMerek.length > 0) {
      setMerek(optionMerek[0]);
    }
  }, [optionMerek]);
  useEffect(() => {
    fetchAllBarang();
  }, []);
  if (loadingfetchAllBarang) return <>Loading....</>;
  return (
    <div>
      {open && (
        <ModalPengadaan
          open={open}
          handleOpen={handleOpen}
          data={value}
          // listOption={allfetchAllBarang.data}
          resetValue={setValue}
        />
      )}
      <CardMain title={'Form Pengadaan Barang'} icon={'/svg/pengadaan2.svg'}>
        <Typography variant="h4">Informasi Barang</Typography>
        <form onSubmit={onHandlerSUbmit}>
          <div className="flex justify-start items-start w-full gap-10 mb-2">
            <div className="mb-1 flex flex-col gap-6 w-full">
              <SelectForm
                label="Jenis Barang"
                type="text"
                placeholder="Jenis Barang"
                value={tipe}
                onChange={handleOnChangeTipe}
                listOption={[
                  ...(Array.isArray(allfetchAllBarang)
                    ? [...new Set(allfetchAllBarang?.map((item) => `${item.tipe}`))]
                    : []),
                  'Jenis Baru',
                ]}
                className={'bg-white mt-1'}
              />
              <div className={`transition-all ease-in-out duration-300 `}>
                {tipe === 'Jenis Baru' && (
                  <InputForm
                    label="Jenis Baru"
                    type="text"
                    placeholder="Jenis Baru"
                    onChange={(e) => setValue({ ...value, tipe: e.target.value })}
                    value={value.tipe}
                    className={'bg-white'}
                    classLabel={` !mb-0 `}
                    // disabled={baru}
                  />
                )}
              </div>
            </div>
            <div className="mb-1 flex flex-col gap-6 w-full">
              <SelectForm
                label="Merek Barang"
                type="text"
                placeholder="Merek Barang"
                // value={merek}
                onChange={handleOnChangeMerek}
                // listOption={[
                //   ...(Array.isArray(allfetchAllBarang) ? optionMerek : []),
                //   'Merek Baru',
                // ]}
                listOption={[
                  ...(Array.isArray(allfetchAllBarang)
                    ? allfetchAllBarang
                        .filter((item) => item.tipe === tipe)
                        .map((item) => item.merek)
                    : []),
                  'Merek Baru',
                ]}
                className={'bg-white mt-1'}
                disabled={!tipe}
              />
              {/* {merek === 'Barang Baru' && ( */}
              <div className={`transition-all ease-in-out duration-300 `}>
                {(merek === 'Merek Baru' || tipe === 'Jenis Baru') && (
                  <InputForm
                    label="Merek Baru"
                    type="text"
                    placeholder="Merek Baru"
                    onChange={(e) => setValue({ ...value, merek: e.target.value })}
                    value={value.merek}
                    className={`bg-white `}
                    classLabel={` !mb-0 `}
                    // disabled={baru}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full gap-10">
            <div className="mb-1 flex flex-col gap-6 w-full">
              <InputForm
                label="Nama Barang"
                type="text"
                placeholder="Nama Barang"
                onChange={(e) => setValue({ ...value, nama: e.target.value })}
                value={value.nama}
                className={'bg-white'}
                disabled={merek !== 'Merek Baru'}
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
                label="Harga Barang /unit"
                type="number"
                placeholder="Harga Barang /unit"
                onChange={(e) => setValue({ ...value, harga: Number(e.target.value) })}
                value={value.harga}
                className={'bg-white'}
                // disabled={baru}
              />
              <InputForm
                label="Jumlah Barang"
                type="number"
                placeholder="Jumlah Barang"
                onChange={(e) =>
                  setValue({
                    ...value,
                    jumlah: Number(e.target.value),
                  })
                }
                value={value.jumlah}
                className={'bg-white mt-1'}
              />
              {/* {baru && <span className={`-mt-3 text-[12px] text-black ml-2`}>Stok: {stok}</span>} */}
            </div>
          </div>
          <Button type="submit" className="mt-6 bg-[#066AFF]" fullWidth>
            Submit
          </Button>
        </form>
      </CardMain>
    </div>
  );
}
