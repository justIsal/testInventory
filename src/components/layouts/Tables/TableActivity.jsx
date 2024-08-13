import react from "@heroicons/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import {
 ArrowDownTrayIcon,
 MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
 Card,
 CardHeader,
 Typography,
 Button,
 CardBody,
 Chip,
 CardFooter,
 Avatar,
 IconButton,
 Tooltip,
 Input,
 iconButton,
} from "@material-tailwind/react";
import Image from "next/image";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function TableActivity({tableHead, tableRow}) {
 function formatTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
 }
 const status = (status, activity) => {
  switch (status) {
   case "Pengajuan":
    return {icon: `/svg/${activity}3.svg`, bg: "bg-white"};
   case "Disetujui":
    return {icon: `/svg/${activity}.svg`, bg: "bg-green-500"};
   case "Ditolak":
    return {icon: `/svg/${activity}.svg`, bg: "bg-red-500"};
   default:
    return {icon: `/svg/${activity}3.svg`, bg: "bg-white"};
  }
 };
 return (
  <Card
   className="h-full w-full bg-transparent"
   shadow={false}>
   {/* <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent">
        <div className="mb-4 flex flex-col justify-end gap-8 md:flex-row md:items-center">
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader> */}
   <CardBody className="overflow-x-scroll px-0">
    <table className="w-full min-w-max table-auto text-left">
     <thead>
      <tr>
       {tableHead.map((head) => (
        <th
         key={head}
         className=" p-4">
         <Typography
          variant="small"
          color="black"
          className="font-bold leading-none">
          {head}
         </Typography>
        </th>
       ))}
      </tr>
     </thead>
     <tbody>
      {tableRow.map((item, index) => {
       const isLast = index === tableRow.length - 1;
       const classes = isLast ? "p-4" : "p-5 ";
       let activity;
       if (item["id-permintaan"]) activity = "permintaan";
       if (item["id-pengadaan"]) activity = "pengadaan";
       if (item["id-retur"]) activity = "retur";
       return (
        <tr
         className="relative after:absolute after:w-full after:h-20 after:bg-blue-200 after:left-0 after:rounded-full after:z-[-1] bg-transparent"
         key={item[`id-${activity}`]}>
         <td className={classes}>
          {/* <Tooltip content=""> */}
          <div
           className={`w-10 h-10 flex items-center justify-center rounded-full mr-[-20px]  ${
            status(item?.validasi).bg
           }`}>
           <Image
            src={status(item?.validasi, activity).icon}
            alt="Vercel Logo"
            className="h-4 w-4 m-auto"
            width={200}
            height={200}
            // priority
           />
          </div>
          {/* </Tooltip> */}
         </td>
         <td className={classes}>
          <div className="flex items-center gap-3">
           <Typography
            variant="small"
            color="blue-gray"
            className="font-bold">
            {formatTimestampToDate(item.createdAt)}
           </Typography>
          </div>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item[`id-${activity}`]}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item?.barang?.nama}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item?.barang?.merek}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item?.barang?.tipe}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item?.jumlah}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal capitalize">
           {item?.users?.nama}
          </Typography>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal opacity-70">
           {item?.users?.divisi}
          </Typography>
         </td>
         <td className={classes}>
          {/* <Tooltip content="">
           <IconButton
            variant="text"
            className="bg-white rounded-full mr-[-30px]">
            <PencilIcon className="h-4 w-4" />
           </IconButton>
          </Tooltip> */}
         </td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </CardBody>
   {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter> */}
  </Card>
 );
}
