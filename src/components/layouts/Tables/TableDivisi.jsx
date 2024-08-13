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

export default function TableDivisi({tableHead, tableRow}) {
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
         className="p-4">
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
       const classes = isLast ? "p-4" : "p-4 mb-2";

       return (
        <tr
         key={item["id-log"]}
         className="relative bg-transparent after:absolute after:w-full after:h-full after:bg-blue-200 after:left-0 after:rounded-full after:z-[-1] after:border">
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-bold">
           {item["id-log"]}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-bold">
           {item["id-users"]}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.username}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.nama}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.role}
          </Typography>
         </td>
         <td className={classes}>
          <Typography
           variant="small"
           color="blue-gray"
           className="font-normal">
           {item.divisi}
          </Typography>
         </td>
         {/* <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      <PencilIcon className="h-5 w-5" />
                    </Typography>
                  </td> */}
        </tr>
       );
      })}
     </tbody>
    </table>
   </CardBody>
  </Card>
 );
}
