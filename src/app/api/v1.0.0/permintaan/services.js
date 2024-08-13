import {
  createData,
  deleteData,
  retrieveData,
  retrieveDataByField,
  retrieveDataById,
  updateData,
} from '@/services';

import bcrypt from 'bcrypt';

export const getPermintaan = async () => {
  console.log(`firebase: getPermintaan()`);
  try {
    const data = await retrieveData('permintaan');
    if (data.length > 0) {
      await Promise.all(
        data.map(async (item) => {
          const usersData = await retrieveDataById('users', item['id-users']);

          delete usersData.role;
          delete usersData['id-users'];
          delete usersData.username;
          delete usersData.password;
          delete usersData.createdAt;
          delete usersData.updatedAt;
          if (usersData) {
            item.users = usersData;
          }

          let barangData;

          const [dataPermintaan, dataPengadaan] = await Promise.all([
            retrieveDataById('permintaan', item['id-permintaan']),
            retrieveDataById('pengadaan', item['id-pengadaan']),
          ]);

          item.permintaan = dataPermintaan;
          item['id-barang'] = dataPengadaan['id-barang'];

          if (dataPengadaan['id-barang']) {
            barangData = await retrieveDataById('barang', dataPengadaan['id-barang']);
            item.barang = barangData;
          }

          delete item['id-pengadaan'];
          return item;
        })
      );
      return {
        status: true,
        message: data.sort((a, b) => b.createdAt - a.createdAt),
      };
    } else {
      return { status: false, message: 'Permintaan not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getPermintaanID = async (id) => {
  console.log(`firebase: getPermintaanID(${id})`);
  try {
    const permintaanData = await retrieveDataById('permintaan', id);
    if (permintaanData) {
      const usersData = await retrieveDataById('users', permintaanData['id-users']);
      const barangData = await retrieveDataById('pengadaan', permintaanData['id-pengadaan']);
      delete usersData.role;
      delete usersData['id-users'];
      delete usersData.username;
      delete usersData.password;
      delete usersData.createdAt;
      delete usersData.updatedAt;
      if (usersData) {
        permintaanData.users = usersData;
      }

      delete barangData['id-pengadaan'];
      if (barangData) {
        permintaanData.pengadaan = barangData;
      }
      return { status: true, message: permintaanData };
    } else {
      return { status: false, message: 'Permintaan not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const createPermintaan = async (body) => {
  const { 'id-pengadaan': idPengadaan, 'id-users': idUsers, keterangan, harga, jumlah } = body;
  console.log(`firebase: createPermintaan()`);
  try {
    const dataPengadaan = await retrieveDataById('pengadaan', idPengadaan);
    const dataUsers = await retrieveDataById('users', idUsers);

    if (!dataPengadaan && !dataUsers)
      return { status: false, message: 'Barang and User not found' };

    if (!idPengadaan && !dataPengadaan) return { status: false, message: 'Barang not found' };

    if (!dataUsers) return { status: false, message: 'User not found' };

    const permintaanData = await createData('permintaan', {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      'id-pengadaan': idPengadaan,
      'id-users': idUsers,
      // 'id-barang': dataPengadaan['id-barang'],
      keterangan,
      harga,
      jumlah,
      validasi: 'Pengajuan',
    });

    if (permintaanData) {
      const loging = await createData('log', {
        'id-pengadaan': idPengadaan,
        'id-users': idUsers,
        'id-permintaan': permintaanData['id-permintaan'],
        createdAt: Date.now(),
      });
      if (loging)
        return {
          status: true,
          message: 'Permintaan created successfully',
          permintaanData,
        };
      else return { status: false, message: 'Logging Permintaan created failed' };
    } else return { status: false, message: 'Permintaan created failed' };
  } catch (error) {
    console.error('Error creating permintaan:', error);
    return { status: false, message: error.message };
  }
};

export const updatePermintaan = async (id, data, body) => {
  console.log(`firebase: updatePermintaan(${id})`);
  const {
    'id-pengadaan': idPengadaan,
    'id-users': idUsers,
    keterangan,
    harga,
    jumlah,
    validasi,
  } = body;

  if (idPengadaan) {
    const dataPengadaan = await retrieveDataById('pengadaan', idPengadaan);
    if (!dataPengadaan) return { status: false, message: 'Barang fifo not found' };
    const dataBarang = await retrieveDataById('barang', dataPengadaan['id-barang']);
    if (!dataBarang) return { status: false, message: 'Barang not found' };
  }

  if (idUsers) {
    const dataUsers = await retrieveDataById('users', idUsers);
    if (!dataUsers) return { status: false, message: 'User not found' };
  }

  if (validasi === 'Disetujui') {
    const updatePengdaan = await updateData('pengadaan', data['id-pengadaan'], {
      stok: data.pengadaan.stok - data.jumlah,
      updatedAt: Date.now(),
    });
    if (!updatePengdaan) return { status: false, message: 'Barang gagal diproses' };
    const currentBarang = await retrieveDataById('barang', updatePengdaan['id-barang']);

    const updateBarang = await updateData('barang', updatePengdaan['id-barang'], {
      stok: currentBarang.stok - data.jumlah,
      updatedAt: Date.now(),
    });

    if (!updateBarang) return { status: false, message: 'Barang gagal diproses' };
  }

  const updatePermintaanData = await updateData('permintaan', id, {
    'id-pengadaan': idPengadaan || data['id-pengadaan'],
    'id-users': idUsers || data['id-users'],
    keterangan: keterangan || data.keterangan,
    harga: harga || data.harga,
    jumlah: jumlah || data.jumlah,
    validasi: validasi || data.validasi,
    updatedAt: Date.now(),
  });

  if (updatePermintaanData) return { status: true, message: 'Permintaan updated successfully' };
};

export const deletePermintaan = async (id, data) => {
  try {
    const dataLog = await retrieveDataByField('log', 'id-permintaan', id);
    await deleteData('log', dataLog[0]['id-log']);

    const permintaanDelete = await deleteData('permintaan', id);
    if (!permintaanDelete) return { status: true, message: 'Permintaan deleted successfully' };
  } catch (error) {
    console.error('Error deleting permintaan:', error);
    return { status: false, message: 'Permintaan deleted failed' };
  }
};
