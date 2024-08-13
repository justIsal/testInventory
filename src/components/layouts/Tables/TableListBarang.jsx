import React from "react";
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
 Input,
} from "@material-tailwind/react";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function TableListBarang({tableHead, tableRow}) {
 return (
  <Card
   className="h-full w-full bg-transparent"
   shadow={false}>
   <CardBody className="overflow-x-scroll px-0">
    <table className="w-full min-w-max table-auto text-left border-collapse">
     <thead>
      <tr>
       {tableHead.map((head) => (
        <th
         key={head}
         className="p-4 border-b border-gray-200">
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
       const rowClasses = `p-4 ${isLast ? "" : "border-b border-gray-200"}`;

       return (
        <tr
         className="relative bg-transparent"
         key={item["id-log"]}>
         <td className={rowClasses}>
          <div className="flex items-center gap-3">
           <Typography
            variant="small"
            color="blue-gray"
            className="font-bold">
            {item["id-barang"]}
           </Typography>
          </div>
         </td>
         <td className={rowClasses}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.nama}
          </Typography>
         </td>
         <td className={rowClasses}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.merek}
          </Typography>
         </td>
         <td className={rowClasses}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.tipe}
          </Typography>
         </td>
         <td className={rowClasses}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.stok}
          </Typography>
         </td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </CardBody>
  </Card>
 );
}