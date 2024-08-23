"use client";

import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";
import TableActivity from "@/components/layouts/Tables/TableActivity";
import {barangServices} from "@/services/barang";
import {useFetch} from "@/lib/axios/api";
import {permintaanServices} from "@/services/permintaan";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function PermintaanPage() {
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
 const {
  loading: loadingLog,
  response: ressPermintaan,
  fetchData: fetchLog,
 } = useFetch("log", permintaanServices.fetchAllpermintaan);

 useEffect(() => {
  fetchLog();
 }, []);
 if (loadingLog) return <>Loading.....</>;
 return (
  <div>
   <CardMain
    title={"Permintaan Barang"}
    icon={"/svg/permintaan2.svg"}
    className="!w-[100%]">
    {ressPermintaan && (
     <TableActivity
      tableHead={TABLE_HEAD}
      tableRow={ressPermintaan}
     />
    )}
   </CardMain>
  </div>
 );
}
