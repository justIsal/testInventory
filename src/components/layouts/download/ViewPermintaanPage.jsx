import React, {useEffect} from "react";
import {Typography, CardBody, Card} from "@material-tailwind/react";
import {UserIcon} from "@heroicons/react/24/outline";

export default function ViewPermintaanPage({data, dokumentRef, className}) {
 useEffect(() => {
  console.log("data");
  console.log(data);
 }, [data]);

 return (
  <div
   className={`w-[1124px] h-[794px] relative ${className} !bg-opacity-0`}
   ref={dokumentRef}>
   <Card className={" mt-10 pb-10 mx-auto px-2 w-full h-full !bg-opacity-0"}>
    <CardBody className={`flex flex-col gap-4`}>
     <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-4 w-full">
       <UserIcon className="w-10" />
       <Typography>Nama Instansi</Typography>
      </div>
      <Typography
       variant="h2"
       className="text-center w-full">
       Permintaan Barang
      </Typography>
      <div className="flex items-center gap-10 justify-end w-full">
       <div className="flex items-start gap-2 flex-col justify-start">
        <Typography>Resi</Typography>
        <Typography>Tanggal</Typography>
       </div>
       <div className="flex items-start gap-2 flex-col justify-start">
        <Typography>{data["id-barang"]}</Typography>
        <Typography>07/07/7000</Typography>
       </div>
      </div>
     </div>
     <div className="py-0">
      <div className="flex flex-col mb-4">
       <Typography>Perminta Dari</Typography>
       <Typography>
        {data.user.nama} ({data.user["id-users"]})
       </Typography>
       <Typography>Divisi {data.user.divisi}</Typography>
      </div>
      <div className="w-full">
       <table className="mt-4 w-full min-w-max table-auto text-left border-collapse">
        <thead>
         <tr>
          <th className="border-y border-gray-100 p-2">
           <Typography className="text-center">Kode</Typography>
          </th>
          <th className="border-y border-gray-100 p-2">
           <Typography className="text-center">Nama Barang</Typography>
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
          <th className="border-y border-gray-100 p-2">
           <Typography className="text-center">Keterangan</Typography>
          </th>
         </tr>
        </thead>
        <tbody className="">
         {data && (
          <tr>
           <td className="p-4 text-black text-center">
            <Typography>{data["id-barang"]}</Typography>
           </td>
           <td className="p-4 text-black text-center">
            <Typography>{data.nama}</Typography>
           </td>
           <td className="p-4 text-black text-center">
            <Typography>{data.merek}</Typography>
           </td>
           <td className="p-4 text-black text-center">
            <Typography>{data.tipe}</Typography>
           </td>
           <td className="p-4 text-black text-center">
            <Typography>{data.harga}</Typography>
           </td>
           <td className="p-4 text-black text-center">
            <Typography>{data.jumlah}</Typography>
           </td>
           <td className="p-4 text-black text-center">
            <Typography>{data.keterangan}</Typography>
           </td>
          </tr>
         )}
        </tbody>
       </table>
      </div>
     </div>
    </CardBody>
   </Card>
  </div>
 );
}
