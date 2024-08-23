"use client";

import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";
import {barangServices} from "@/services/barang";
import {useFetch} from "@/lib/axios/api";
import TableValidasi from "@/components/layouts/Tables/TableValidasi";
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

export default function ValidasiPage() {
 const {
  loading: loadingLog,
  response: ressLog,
  fetchData: fetchLog,
 } = useFetch("log", barangServices.fetchLog);

 useEffect(() => {
  fetchLog();
 }, []);
 if (loadingLog) return <>Loading.....</>;
 return (
  <div>
   <CardMain
    title={"Validasi"}
    icon={"/svg/validasi2.svg"}>
    {ressLog && (
     <TableValidasi
      tableHead={TABLE_HEAD}
      tableRow={ressLog}
     />
    )}
   </CardMain>
  </div>
 );
}
