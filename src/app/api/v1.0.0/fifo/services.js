import {
  createData,
  deleteData,
  retrieveData,
  retrieveDataByField,
  retrieveDataById,
  updateData,
} from '@/services';

export const getFifoByTipe = async () => {
  console.log(`firebase: getBarang()`);
  try {
    const dataPengadaan = await retrieveData('pengadaan');
    const dataBarang = await retrieveData('barang');

    if (dataPengadaan.length > 0) {
      const tipe = [...new Set(dataBarang.map((item) => item.tipe))];

      const merek = [...new Set(dataBarang.map((item) => item.tipe && item.merek))];

      console.log('merek');
      console.log(merek);

      const pengadaan = await Promise.all(
        dataPengadaan.map(async (item) => {
          const usersData = await retrieveDataById('users', item['id-users']);
          const barangData = await retrieveDataById('barang', item['id-barang']);
          delete usersData.role;
          delete usersData['id-users'];
          delete usersData.username;
          delete usersData.password;
          delete usersData.createdAt;
          delete usersData.updatedAt;
          if (usersData) {
            item.users = usersData;
          }

          delete barangData['id-barang'];
          if (barangData) {
            item.barang = barangData;
          }
          return item;
        })
      );

      const data = await Promise.all(
        tipe.map(async (item) => {
          const barangByType = pengadaan
            .filter((data) => data.validasi == 'Disetujui')
            .filter((data) => data.barang.tipe === item && data.stok > 0)
            .sort((a, b) => a.createdAt - b.createdAt);
          return { [item]: barangByType } || {};
        })
      );
      // const data = await Promise.all(
      //   tipe.map(async (item) => {
      //     const barangByType = merek
      //       .map((mrk) => {
      //         const filteredData = pengadaan
      //           .filter(
      //             (data) => data.barang.tipe === item && data.barang.merek === mrk && data.stok > 0
      //           )
      //           .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      //         return filteredData.length > 0 ? { [mrk]: filteredData } : null;
      //       })
      //       .filter((result) => result !== null);

      //     return { [item]: barangByType };
      //   })
      // );

      return { status: true, message: { tipe, data } };
    } else {
      return { status: false, message: 'Barang not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
export const getFifoByMerek = async () => {
  console.log(`firebase: getBarang()`);
  try {
    const dataPengadaan = await retrieveData('pengadaan');
    const dataBarang = await retrieveData('barang');

    if (dataPengadaan.length > 0) {
      const tipe = [...new Set(dataBarang.map((item) => item.tipe))];

      const merek = [...new Set(dataBarang.map((item) => item.tipe && item.merek))];

      console.log('merek');
      console.log(merek);

      const pengadaan = await Promise.all(
        dataPengadaan.map(async (item) => {
          const usersData = await retrieveDataById('users', item['id-users']);
          const barangData = await retrieveDataById('barang', item['id-barang']);
          delete usersData.role;
          delete usersData['id-users'];
          delete usersData.username;
          delete usersData.password;
          delete usersData.createdAt;
          delete usersData.updatedAt;
          if (usersData) {
            item.users = usersData;
          }

          delete barangData['id-barang'];
          if (barangData) {
            item.barang = barangData;
          }
          return item;
        })
      );

      // const data = await Promise.all(
      //   tipe.map(async (item) => {
      //     const barangByType = pengadaan
      //       .filter((data) => data.validasi == 'Disetujui')
      //       .filter((data) => data.barang.tipe === item && data.stok > 0)
      //       .sort((a, b) => a.createdAt - b.createdAt);
      //     return { [item]: barangByType } || {};
      //   })
      // );
      const data = await Promise.all(
        tipe.map(async (item) => {
          const barangByType = merek
            .map((mrk) => {
              const filteredData = pengadaan
                .filter(
                  (data) => data.barang.tipe === item && data.barang.merek === mrk && data.stok > 0
                )
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

              return filteredData.length > 0 ? { [mrk]: filteredData } : null;
            })
            .filter((result) => result !== null);

          return { [item]: barangByType };
        })
      );

      return { status: true, message: { tipe, data } };
    } else {
      return { status: false, message: 'Barang not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
