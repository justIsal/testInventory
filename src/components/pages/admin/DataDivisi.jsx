"use client";

import React, {useEffect} from "react";
import CardMain from "@/components/layouts/CardMain";
import {barangServices} from "@/services/barang";
import {usersServices} from "@/services/user";
import {useFetch} from "@/lib/axios/api";
import TableDivisi from "@/components/layouts/Tables/TableDivisi";

const TABLE_HEAD = ["", "id user", "username", "name", "role", "divisi"];

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function DataDivisiPage() {
 const {
  loading: loadingAllUser,
  response: ressAllUser,
  fetchData: fetchAllUser,
 } = useFetch("barang", usersServices.fetchAllUser);

 useEffect(() => {
  fetchAllUser();
 }, []);
 if (loadingAllUser) return <>Loading.....</>;
 return (
  <div>
   <CardMain
    title={"List Users"}
    icon={"/svg/divisi2.svg"}>
    {ressAllUser && console.log(ressAllUser)}
    {ressAllUser && (
     <TableDivisi
      tableHead={TABLE_HEAD}
      tableRow={ressAllUser}
     />
    )}
   </CardMain>
  </div>
 );
}
