"use client";

import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";
import TableMain from "@/components/layouts/Tables/TableMain";
import useStore from "@/store/useStore";
import {barangServices} from "@/services/barang";
import {useFetch} from "@/lib/axios/api";
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

export default function LogBarangAdmin() {
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
    title={"Log Barang"}
    icon={"/svg/permintaan2.svg"}>
    {ressLog && console.log(ressLog)}
    {ressLog && (
     <TableMain
      tableHead={TABLE_HEAD}
      tableRow={ressLog}
     />
    )}
   </CardMain>
  </div>
 );
}
