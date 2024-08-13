"use strict";
import React from "react";
import {
 Button,
 Card,
 CardBody,
 CardFooter,
 CardHeader,
 Checkbox,
 Input,
 Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import {LockClosedIcon} from "@heroicons/react/24/solid";

const CardMain = ({
 children,
 title,
 icon,
 className,
 classChild,
 ref,
 handleOpen,
 styleHeader
}) => {
 return (
  <>
   <Card
    className={`bg-[#066AFF]/20 mt-10 pb-10 mx-auto ${className}`}
    ref={ref}>
    <CardHeader className={`mb-4 w-2/4 mx-auto h-20  flex items-center justify-between rounded-full bg-[#066AFF] ${styleHeader}`}>
     <div className="h-19 w-19 p-4 bg-white rounded-full ml-3 flex grow-0">
      <Image
       src={icon}
       width={200}
       height={200}
       alt={icon}
       className="h-8 w-8 m-auto"
      />
     </div>
     <Typography
      variant="h3"
      color="white"
      className="flex-grow text-center">
      {title}
     </Typography>
     {handleOpen && (
      <div
       className="h-19 w-19 p-4 bg-[#D9D9D9] rounded-full mr-3 flex grow-0  cursor-pointer"
       onClick={handleOpen}>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M6 18 18 6M6 6l12 12"
        />
       </svg>
      </div>
     )}
    </CardHeader>
    <CardBody className={`flex flex-col gap-4 ${classChild}`}>
     {children}
    </CardBody>
   </Card>
  </>
 );
};
export default CardMain;
