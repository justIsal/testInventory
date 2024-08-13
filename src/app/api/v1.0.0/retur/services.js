import {
 createData,
 deleteData,
 retrieveData,
 retrieveDataByField,
 retrieveDataById,
 updateData,
} from "@/services";

export const getRetur = async () => {
 console.log(`firebase: getRetur()`);
 try {
  const data = await retrieveData("retur");
  if (data.length > 0) {
   await Promise.all(
    data.map(async (retur) => {
     const dataBarang = await retrieveDataById("barang", retur["id-barang"]);
     retur.barang = dataBarang;
     const dataUser = await retrieveDataById("users", retur["id-users"]);
     delete dataUser.password;
     delete dataUser.username;
     delete dataUser.updatedAt;
     delete dataUser.createdAt;
     retur.users = dataUser;
    })
   );
   return {
    status: true,
    message: data.sort((a, b) => b.createdAt - a.createdAt),
   };
  } else {
   return {status: false, message: "Retur not found"};
  }
 } catch (error) {
  return {status: false, message: error.message};
 }
};

export const getReturID = async (id) => {
 console.log(`firebase: getReturID(${id})`);
 try {
  const returData = await retrieveDataById("retur", id);
  if (returData) {
   const dataBarang = await retrieveDataById("barang", returData["id-barang"]);
   returData.barang = dataBarang;
   const dataUser = await retrieveDataById("users", returData["id-users"]);
   delete dataUser.password;
   delete dataUser.username;
   delete dataUser.updatedAt;
   delete dataUser.createdAt;
   returData.users = dataUser;
   return {status: true, message: returData};
  } else {
   return {status: false, message: "Retur not found"};
  }
 } catch (error) {
  return {status: false, message: error.message};
 }
};

export const createRetur = async (body) => {
 const {
  "id-barang": idBarang,
  "id-users": idUsers,
  "jenis-retur": jenisRetur,
  keterangan,
  alasan,
  jumlah,
 } = body;
 console.log(`firebase: createRetur()`);
 try {
  const dataBarang = await retrieveDataById("barang", idBarang);
  const dataUsers = await retrieveDataById("users", idUsers);

  if (!dataBarang && !dataUsers)
   return {status: false, message: "Barang and User not found"};
  if (!dataBarang) return {status: false, message: "Barang not found"};
  if (!dataUsers) return {status: false, message: "User not found"};

  const returData = await createData("retur", {
   createdAt: Date.now(),
   updatedAt: Date.now(),
   "id-barang": idBarang,
   "id-users": idUsers,
   "jenis-retur": jenisRetur,
   keterangan,
   alasan,
   jumlah,
   validasi: "Pengajuan",
  });

  if (returData) {
   const loging = await createData("log", {
    "id-barang": idBarang,
    "id-users": idUsers,
    "id-retur": returData["id-retur"],
    createdAt: Date.now(),
   });
   if (loging)
    return {
     status: true,
     message: "Retur created successfully",
     returData,
    };
   else return {status: false, message: "Logging Retur created failed"};
  } else return {status: false, message: "Retur created failed"};
 } catch (error) {
  console.error("Error creating retur:", error);
  return {status: false, message: error.message};
 }
};

export const updateRetur = async (id, data, body) => {
 console.log(`firebase: updateRetur(${id})`);
 const {
  "id-barang": idBarang,
  "id-users": idUsers,
  "jenis-retur": jenisRetur,
  keterangan,
  alasan,
  jumlah,
  validasi,
 } = body;

 if (idBarang) {
  const dataBarang = await retrieveDataById("barang", idBarang);
  if (!dataBarang) return {status: false, message: "Barang not found"};
 }

 if (idUsers) {
  const dataUsers = await retrieveDataById("users", idUsers);
  if (!dataUsers) return {status: false, message: "User not found"};
 }

 console.log(data);

 if (validasi === "Disetujui") {
  const dataBarang = await retrieveDataById("barang", data["id-barang"]);
  const updateBarang = await updateData("barang", data["id-barang"], {
   stok:
    data["jenis-retur"] === "Pengadaan"
     ? dataBarang.stok - data.jumlah
     : dataBarang.stok + data.jumlah,
   updatedAt: Date.now(),
   ...(dataBarang.stok <= 0 && {
    createdAt: Date.now(),
   }),
  });
  if (!updateBarang) return {status: false, message: "Barang gagal diproses"};
 }

 const updateReturData = await updateData("retur", id, {
  "id-barang": idBarang || data["id-barang"],
  "id-users": idUsers || data["id-users"],
  "jenis-retur": jenisRetur || data["jenis-retur"],
  keterangan: keterangan || data.keterangan,
  alasan: alasan || data.alasan,
  jumlah: jumlah || data.jumlah,
  validasi: validasi || data.validasi,
  updatedAt: Date.now(),
 });

 if (updateReturData)
  return {status: true, message: "Retur updated successfully"};
};

export const deleteRetur = async (id, data) => {
 try {
  const dataLog = await retrieveDataByField("log", "id-retur", id);
  await deleteData("log", dataLog[0]["id-log"]);

  const returDelete = await deleteData("retur", id);
  if (!returDelete)
   return {status: true, message: "Retur deleted successfully"};
 } catch (error) {
  console.error("Error deleting retur:", error);
  return {status: false, message: "Retur deleted failed"};
 }
};
