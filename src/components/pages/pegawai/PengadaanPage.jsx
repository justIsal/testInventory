"use client";

import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";
import TableActivity from "@/components/layouts/Tables/TableActivity";
import useStore from "@/store/useStore";
import {barangServices} from "@/services/barang";
import {useFetch} from "@/lib/axios/api";
import {pengadaanServices} from "@/services/pengadaan";
const TABLE_HEAD = [
 "",
 "Tanggal",
 "Kode Barang",
 "Barang",
 "Merek",
 "Tipe",
 "Jumlah",
 "User",
];

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function LogBarang() {
 const {
  loading: loadingLog,
  response: ressPengadaan,
  fetchData: fetchLog,
 } = useFetch("log", pengadaanServices.fetchAllPengadaan);

 useEffect(() => {
  fetchLog();
 }, []);
 if (loadingLog) return <>Loading.....</>;
 return (
  <div>
   <CardMain
    title={"List Pengadaan"}
    icon={"/svg/permintaan2.svg"}>
    {ressPengadaan && console.log(ressPengadaan)}
    {ressPengadaan && (
     <TableActivity
      tableHead={TABLE_HEAD}
      tableRow={ressPengadaan}
     />
    )}
   </CardMain>
  </div>
 );
}
