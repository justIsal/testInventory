'use client';
import React from 'react';
import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import CardMain from '../CardMain';

export function ModalListBarang({ openBarang, handleOpenBarang, data, filtered }) {
  const { filterTipe, filterMerek } = filtered;
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formattedDate;
  };

  return (
    <Dialog open={openBarang} className="bg-opacity-0 p-0 relative" size={'xl'}>
      <CardMain
        title={'Log Barang'}
        icon={'/svg/permintaan2.svg'}
        className={'!w-full bg-[#D9D9D9] p-0'}
        classChild={'px-2'}
        handleOpen={handleOpenBarang}
        // styleHeader={'!w-full'}
      >
        <DialogBody className="py-4 max-h-[70vh] overflow-y-auto">
          <div className="overflow-x-auto">
            {data.tipe
              .filter((tipe) => tipe === filterTipe) // Filter tipe hanya "Sepatu Bot"
              .map((tipe) => (
                <div key={tipe} className="mb-6">
                  <h2 className="text-lg font-bold mb-4">{tipe}</h2>
                  {data.data
                    .find((d) => d[tipe])
                    ?.[tipe].filter((merekObj) => Object.keys(merekObj)[0] === filterMerek) // Filter merek hanya "Adidas"
                    .map((merekObj, index) => {
                      const merek = Object.keys(merekObj)[0];
                      const sortedBarang = [...merekObj[merek]].sort(
                        (a, b) => b.createdAt - a.createdAt
                      );
                      return (
                        <div key={index} className="mb-6 ml-4">
                          <h3 className="text-md font-semibold mb-2">{merek}</h3>
                          <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead>
                              <tr>
                                <th className="py-2 px-6 text-left border-b">Tanggal</th>
                                <th className="py-2 px-6 text-left border-b">Nama Barang</th>
                                <th className="py-2 px-6 text-right border-b">Harga</th>
                                <th className="py-2 px-6 text-right border-b">Stok</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedBarang.map((barang, barangIndex) => (
                                <tr key={`${index}-${barangIndex}`} className="border-t">
                                  <td className="py-2 px-6 border-b">
                                    {formatDate(barang.createdAt)}
                                  </td>
                                  <td className="py-2 px-6 border-b">{barang.barang.nama}</td>
                                  <td className="py-2 px-6 text-right border-b">{barang.harga}</td>
                                  <td className="py-2 px-6 text-right border-b">{barang.stok}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={() => handleOpenBarang()}
            className="bg-[#066AFF] text-white"
          >
            Cancel
          </Button>
        </DialogFooter>
      </CardMain>
    </Dialog>
  );
}
