"use client";
import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";
import InputForm from "@/components/fragments/input/InputForm";
import {Button, Typography} from "@material-tailwind/react";
import {ModalPengadaanReturn} from "@/components/layouts/Modals/ModalPengadaanReturn";
import {useFetch} from "@/lib/axios/api";
import {barangServices} from "@/services/barang";
import SelectForm from "@/components/fragments/input/SelectForm";
import {ModalPermintaanReturn} from "@/components/layouts/Modals/ModalPermintaanReturn";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function PengadaanReturnPage() {
 const {
  loading: loadingAllas,
  response: allBaranga,
  fetchData: fetchAllBaranga,
 } = useFetch("/barangd", barangServices.fetchAllBarang);
 const [open, setOpen] = React.useState(false);
 const [value, setValue] = React.useState({
  nama: "",
  "id-barang": "",
  tipe: "",
  merek: "",
  jumlah: "",
  keterangan: "",
 });

 const handleOnChange = (e) => {
  const filter = allBaranga.filter(
   (item) => item["id-barang"] === e.split(" - ")[0]
  );
  console.log(filter);
  setValue({
   ...filter[0],
   // 'id-barang': e,
   jumlah: value.jumlah,
   keterangan: value.keterangan,
  });
 };

 const handleOpen = () => setOpen(!open);
 const onHandlerSUbmit = () => {
  handleOpen();
 };

 useEffect(() => {
  fetchAllBaranga();
 }, []);

 return (
  allBaranga && (
   <div>
    <CardMain
     title={"Form Return Barang"}
     icon={"/svg/pengadaan.svg"}>
     <Typography variant="h4">Informasi Barang</Typography>
     <form>
      <div className="flex justify-start items-start w-full gap-10">
       <div className="mb-1 flex flex-col gap-6 w-full">
        <SelectForm
         label="Kode Barang"
         type="text"
         placeholder="Tipe Barang"
         onChange={handleOnChange}
         listOption={allBaranga.map(
          (item) => `${item["id-barang"]} - ${item.nama}`
         )}
         className={"bg-white mt-1"}
        />
        <InputForm
         label="Merek Barang"
         type="text"
         placeholder="Merek Barang"
         onChange={(e) => setValue({...value, merek: e.target.value})}
         value={value.merek}
         className={"bg-white"}
         disabled={true}
        />
        <InputForm
         label="Keterangan Barang"
         type="text"
         placeholder="Keterangan Barang"
         onChange={(e) => setValue({...value, keterangan: e.target.value})}
         value={value.keterangan}
         className={"bg-white"}
        />
        <InputForm
         label="Alasan"
         type="text"
         placeholder="Alasan"
         onChange={(e) => setValue({...value, alasan: e.target.value})}
         value={value.alasan}
         className={"bg-white"}
        />
       </div>
       <div className="mb-1 flex flex-col gap-6  w-full">
        <InputForm
         label="Nama Barang"
         type="text"
         placeholder="Nama Barang"
         onChange={(e) => setValue({...value, nama: e.target.value})}
         value={value.merek}
         className={"bg-white"}
         disabled={true}
        />
        <InputForm
         label="Tipe Barang"
         type="text"
         placeholder="Tipe Barang"
         onChange={(e) => setValue({...value, tipe: e.target.value})}
         value={value.tipe}
         className={"bg-white"}
         disabled={true}
        />
        <InputForm
         label="Jumlah Barang"
         type="number"
         placeholder="Jumlah Barang"
         onChange={(e) => setValue({...value, jumlah: Number(e.target.value)})}
         value={value.jumlah}
         className={"bg-white mt-1"}
        />
       </div>
      </div>
      <Button
       onClick={onHandlerSUbmit}
       className="mt-6 bg-[#066AFF]"
       fullWidth>
       Submit
      </Button>
     </form>
    </CardMain>
    {open && (
     <ModalPengadaanReturn
      open={open}
      handleOpen={handleOpen}
      data={value}
      resetValue={setValue}
     />
    )}
   </div>
  )
 );
}
