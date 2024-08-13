import {
  createData,
  deleteData,
  retrieveData,
  retrieveDataByField,
  retrieveDataById,
  updateData,
} from '@/services';

export const getLog = async () => {
  console.log(`firebase: getLog()`);
  try {
    const data = await retrieveData('log');
    if (data.length > 0) {
      const dataQuery = await Promise.all(
        data.map(async (item) => {
          const dataUsers = await retrieveDataById('users', item['id-users']);
          item.users = dataUsers;

          let dataBarang;

          if (item['id-permintaan'] && item['id-pengadaan']) {
            const [dataPermintaan, dataPengadaan] = await Promise.all([
              retrieveDataById('permintaan', item['id-permintaan']),
              retrieveDataById('pengadaan', item['id-pengadaan']),
            ]);

            item.permintaan = dataPermintaan;
            item['id-barang'] = dataPengadaan['id-barang'];

            if (dataPengadaan['id-barang']) {
              dataBarang = await retrieveDataById('barang', dataPengadaan['id-barang']);
              item.barang = dataBarang;
            }

            delete item['id-pengadaan'];
          } else if (item['id-pengadaan']) {
            const dataPengadaan = await retrieveDataById('pengadaan', item['id-pengadaan']);
            item.pengadaan = dataPengadaan;

            if (dataPengadaan['id-barang']) {
              dataBarang = await retrieveDataById('barang', dataPengadaan['id-barang']);
              item.barang = dataBarang;
            }
          } else if (item['id-retur']) {
            const dataRetur = await retrieveDataById('retur', item['id-retur']);
            item.retur = dataRetur;

            if (item['id-barang']) {
              dataBarang = await retrieveDataById('barang', item['id-barang']);
              item.barang = dataBarang;
            }
          }

          return item;
        })
      );
      return {
        status: true,
        message: dataQuery.sort((a, b) => b.createdAt - a.createdAt),
      };
    } else {
      return { status: false, message: 'Log not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getLogID = async (id) => {
  console.log(`firebase: getLogID(${id})`);
  try {
    const logData = await retrieveDataById('log', id);
    console.log(logData);
    if (logData) {
      return { status: true, message: logData };
    } else {
      return { status: false, message: 'Log not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};
