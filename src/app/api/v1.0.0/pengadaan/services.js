import {
  createData,
  deleteData,
  retrieveData,
  retrieveDataByField,
  retrieveDataById,
  updateData,
} from '@/services';

import bcrypt from 'bcrypt';
import { collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import app from '@/lib/firebase/init';

const firestore = getFirestore(app);

export const getPengadaan = async () => {
  console.log(`firebase: getPengadaan()`);
  try {
    const data = await retrieveData('pengadaan');
    if (data.length > 0) {
      await Promise.all(
        data.map(async (item) => {
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
      return {
        status: true,
        message: data.sort((a, b) => b.createdAt - a.createdAt),
      };
    } else {
      return { status: false, message: 'Pengadaan not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getPengadaanID = async (id) => {
  console.log(`firebase: getPengadaanID(${id})`);
  try {
    const pengadaanData = await retrieveDataById('pengadaan', id);
    if (pengadaanData) {
      const usersData = await retrieveDataById('users', pengadaanData['id-users']);
      const barangData = await retrieveDataById('barang', pengadaanData['id-barang']);
      console.log(usersData);
      delete usersData.role;
      delete usersData['id-users'];
      delete usersData.username;
      delete usersData.password;
      delete usersData.createdAt;
      delete usersData.updatedAt;
      console.log(barangData);
      if (usersData) {
        pengadaanData.users = usersData;
      }

      delete barangData['id-barang'];
      if (barangData) {
        pengadaanData.barang = barangData;
      }
      return { status: true, message: pengadaanData };
    } else {
      return { status: false, message: 'Pengadaan not found' };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const createPengadaan = async (body) => {
  const { 'id-users': idUsers, 'id-barang': idBarang, keterangan, harga, jumlah } = body;
  console.log(`firebase: createPengadaan()`);
  try {
    const dataBarang = await retrieveDataById('barang', idBarang);
    const dataUsers = await retrieveDataById('users', idUsers);

    if (!dataBarang && !dataUsers) return { status: false, message: 'Barang and User not found' };

    if (idBarang !== 'Barang Baru' && !dataBarang)
      return { status: false, message: 'Barang not found' };

    if (!dataUsers) return { status: false, message: 'User not found' };

    let idBarangBaru;

    if (idBarang === 'Barang Baru') {
      const { nama, merek, tipe } = body;
      const barangBaru = await createData('barang', {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        nama: nama,
        merek: merek,
        tipe: tipe,
        stok: 0,
      });
      console.log(barangBaru['id-barang']);
      idBarangBaru = barangBaru['id-barang'];

      const allDocsSnapshot = await getDocs(collection(firestore, 'barang'));
      const itemCount = allDocsSnapshot.size;

      const kodeBarang = `BR${itemCount.toString().padStart(3, '0')}G`;

      const newDocRef = doc(firestore, 'barang', idBarangBaru);
      await updateDoc(newDocRef, { 'kode-barang': kodeBarang });

      barangBaru['kode-barang'] = kodeBarang;
    }

    const pengadaanData = await createData('pengadaan', {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      'id-barang': idBarang === 'Barang Baru' ? idBarangBaru : idBarang,
      'id-users': idUsers,
      keterangan,
      harga,
      jumlah,
      stok: jumlah,
      validasi: 'Pengajuan',
    });

    if (pengadaanData) {
      const loging = await createData('log', {
        'id-barang': idBarang === 'Barang Baru' ? idBarangBaru : idBarang,
        'id-users': idUsers,
        'id-pengadaan': pengadaanData['id-pengadaan'],
        createdAt: Date.now(),
      });
      // const fifo = await createData('fifo', {});
      if (loging)
        return {
          status: true,
          message: 'Pengadaan created successfully',
          pengadaanData,
        };
      else return { status: false, message: 'Logging Pengadaan created failed' };
    } else return { status: false, message: 'Pengadaan created failed' };
  } catch (error) {
    console.error('Error creating pengadaan:', error);
    return { status: false, message: error.message };
  }
};

export const updatePengadaan = async (id, data, body) => {
  console.log(`firebase: updatePengadaan(${id})`);
  const { 'id-barang': idBarang, 'id-users': idUsers, keterangan, harga, jumlah, validasi } = body;

  if (idBarang) {
    const dataBarang = await retrieveDataById('barang', idBarang);
    if (!dataBarang) return { status: false, message: 'Barang not found' };
  }

  if (idUsers) {
    const dataUsers = await retrieveDataById('users', idUsers);
    if (!dataUsers) return { status: false, message: 'User not found' };
  }

  if (validasi === 'Disetujui') {
    let isReIn = false;
    if (data.barang.stok <= 0) {
      isReIn = true;
    }
    const updateBarang = await updateData('barang', data['id-barang'], {
      stok: data.barang.stok + data.jumlah,
      updatedAt: Date.now(),
      ...(isReIn ? { createdAt: Date.now() } : null),
    });

    if (!updateBarang) return { status: false, message: 'Barang gagal diproses' };
  }

  const updatePengadaanData = await updateData('pengadaan', id, {
    'id-barang': idBarang || data['id-barang'],
    'id-users': idUsers || data['id-users'],
    keterangan: keterangan || data.keterangan,
    harga: harga || data.harga,
    jumlah: jumlah || data.jumlah,
    validasi: validasi || data.validasi,
    updatedAt: Date.now(),
  });

  if (updatePengadaanData) return { status: true, message: 'Pengadaan updated successfully' };
};

export const deletePengadaan = async (id, data) => {
  try {
    const dataLog = await retrieveDataByField('log', 'id-pengadaan', id);
    await deleteData('log', dataLog[0]['id-log']);

    const pengadaanDelete = await deleteData('pengadaan', id);
    if (!pengadaanDelete) return { status: true, message: 'Pengadaan deleted successfully' };
  } catch (error) {
    console.error('Error deleting pengadaan:', error);
    return { status: false, message: 'Pengadaan deleted failed' };
  }
};
