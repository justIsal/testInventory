"use client";

import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";

import useStore from "@/store/useStore";
import {barangServices} from "@/services/barang";
import TableListBarang from "@/components/layouts/Tables/TableListBarang";
import {useFetch} from "@/lib/axios/api";

const TABLE_HEAD = ["Kode Barang", "Barang", "Merek", "Tipe", "Stock"];

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function PermintaanPage() {
 const {
  loading: loadingAllBarang,
  response: ressAllBarang,
  fetchData: fetchAllBarang,
 } = useFetch("barang", barangServices.fetchAllBarang);

 useEffect(() => {
  fetchAllBarang();
 }, []);
 if (loadingAllBarang) return <>Loading.....</>;
 return (
  <div>
   <CardMain
    title={"List Barang"}
    icon={"/svg/permintaan2.svg"}>
    {ressAllBarang && console.log(ressAllBarang)}
    {ressAllBarang && (
     <TableListBarang
      tableHead={TABLE_HEAD}
      tableRow={ressAllBarang}
     />
    )}
   </CardMain>
  </div>
 );
}