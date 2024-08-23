"use client";
import React, {useEffect} from "react";
import TableMain from "@/components/layouts/Tables/TableMain";
import {barangServices} from "@/services/barang";
import {
 Button,
 Card,
 CardBody,
 CardFooter,
 CardHeader,
 Typography,
} from "@material-tailwind/react";
import {useFetch} from "@/lib/axios/api";
import {usersServices} from "@/services/user";
import {useRouter} from "next/navigation";
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

const DashboardPageAdmin = () => {
 const {
  loading: loadingLog,
  response: ressLog,
  fetchData: fetchLog,
 } = useFetch("log", barangServices.fetchLog);
 const {
  loading: loadingDash,
  response: dashboar,
  fetchData: fetchDash,
 } = useFetch("dashboard", usersServices.fetchDashboard);

 const router = useRouter();
 useEffect(() => {
  fetchLog();
  fetchDash();
 }, []);
 if (loadingLog && loadingDash) return <>Loading.....</>;
 return (
  ressLog &&
  dashboar && (
   <>
    <div className="flex mt-10 gap-10 mx-20">
     {dashboar && (
      <>
       <Card className="bg-[#066AFF]/40 w-full text-white">
        <CardHeader className="p-4 bg-[#066AFF] text-center">
         <Typography
          variant="h5 "
          color="white">
          Pengadaan
         </Typography>
        </CardHeader>
        <CardBody>
         <Typography>{dashboar.pengadaan} Pengadaan </Typography>
        </CardBody>
        <CardFooter className="flex justify-end">
         <Button
          className="bg-[#066AFF]"
          onClick={() => router.push("/admin/validasi")}>
          Validasi
         </Button>
        </CardFooter>
       </Card>
       <Card className="bg-[#066AFF]/40 w-full text-white">
        <CardHeader className="p-4 bg-[#066AFF] text-center">
         <Typography
          variant="h5 "
          color="white">
          Permintaan
         </Typography>
        </CardHeader>
        <CardBody>
         <Typography>{dashboar.permintaan} Permintaan </Typography>
        </CardBody>
        <CardFooter className="flex justify-end">
         <Button
          className="bg-[#066AFF]"
          onClick={() => router.push("/admin/validasi")}>
          Validasi
         </Button>
        </CardFooter>
       </Card>
       <Card className="bg-[#066AFF]/40 w-full text-white">
        <CardHeader className="p-4 bg-[#066AFF] text-center">
         <Typography
          variant="h5 "
          color="white">
          Barang
         </Typography>
        </CardHeader>
        <CardBody>
         <Typography>
          {dashboar.stok} Stok dari {dashboar.barang} Barang
         </Typography>
        </CardBody>
        <CardFooter className="flex justify-end">
         <Button
          className="bg-[#066AFF]"
          onClick={() => router.push("/admin/list-barang")}>
          Lihat Selengkapnya
         </Button>
        </CardFooter>
       </Card>
      </>
     )}
    </div>
    <div className="mx-10 mt-2">
     {ressLog && (
      <TableMain
       tableHead={TABLE_HEAD}
       tableRow={ressLog?.filter((item, index) => index <= 3) || []}
      />
     )}
     <Button
      fullWidth
      className="bg-gray-500 mt-4"
      onClick={() => router.push("/pegawai/log-barang")}>
      Selengkapnya..
     </Button>
    </div>
   </>
  )
 );
};
export default DashboardPageAdmin;
