import { Button } from '@material-tailwind/react';
import React from 'react';
import CSVDownloader from 'react-csv-downloader';

const columns = [
  {
    id: 'name',
    displayName: 'Nama',
  },
  {
    id: 'waktuPesan',
    displayName: 'Waktu pesan',
  },
  {
    id: 'total',
    displayName: 'Total',
  },
];
const CSVDownloadButton = ({ data, fileName, title, columns }) => {
  //   const datas = data.map((item, index) => ({
  //     name: item.name,
  //     waktuPesan: new Date(),
  //     total: 35000,
  //   }));
  //   const total = datas.length * 35000;
  //   const dataWithTotal = [...datas, { name: 'Total', waktuPesan: '', total }];
  return (
    <CSVDownloader
      filename={fileName}
      separator=";"
      columns={columns}
      datas={data}
      // disabled="true"
      className="btn-export"
    >
      <Button variant="text" className="bg-[#066AFF] text-white">
        {title}
      </Button>
    </CSVDownloader>
  );
};

export default CSVDownloadButton;
