'use client';
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import CardMain from '../CardMain';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CSVDownloadButton from '@/lib/CSVDownload/CSVDownloadButton';

export function ModalLaporan({ open, handleOpen, data }) {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  return (
    <>
      <Dialog open={open} className="bg-opacity-0 p-0 relative">
        <CardMain
          title={'Buat Laporan'}
          icon={'/svg/permintaan2.svg'}
          className={'!w-full bg-[#D9D9D9] p-0'}
          classChild={'px-2'}
          handleOpen={handleOpen}
          styleHeader={'!w-full'}
        >
          <DialogBody className="py-0 flex justify-center">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
            />
          </DialogBody>
          <DialogFooter>
            <CSVDownloadButton
              // data={getDate(data, state[0].startDate, state[0].endDate)}
              title={'export csv'}
              fileName={'exportcsv'}
            />
          </DialogFooter>
        </CardMain>
      </Dialog>
    </>
  );
}
