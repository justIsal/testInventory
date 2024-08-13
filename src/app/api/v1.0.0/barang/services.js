import {
 createData,
 deleteData,
 retrieveData,
 retrieveDataByField,
 retrieveDataById,
 updateData,
} from "@/services";

import bcrypt from "bcrypt";

export const getBarang = async () => {
 console.log(`firebase: getBarang()`);
 try {
  const data = await retrieveData("barang");
  if (data.length > 0) {
   return {
    status: true,
    message: data.sort((a, b) => b.createdAt - a.createdAt),
   };
  } else {
   return {status: false, message: "Barang not found"};
  }
 } catch (error) {
  return {status: false, message: error.message};
 }
};

export const getBarangID = async (id) => {
 console.log(`firebase: getBarangID(${id})`);
 try {
  const barangData = await retrieveDataById("barang", id);
  if (barangData) {
   return {status: true, message: barangData};
  } else {
   return {status: false, message: "Barang not found"};
  }
 } catch (error) {
  return {status: false, message: error.message};
 }
};

export const createBarang = async (body) => {
 const {nama, merek, tipe, stok} = body;
 console.log(`firebase: createBarang()`);
 try {
  const barangData = await createData("barang", {
   createdAt: Date.now(),
   updatedAt: Date.now(),
   nama,
   merek,
   tipe,
   stok,
  });

  return {status: true, message: "Barang created successfully", barangData};
 } catch (error) {
  console.error("Error creating barang:", error);
  return {status: false, message: error.message};
 }
};

export const updateBarang = async (id, data, body) => {
 const {merek, tipe, stok} = body;

 console.log(`firebase: updateBarang(${id})`);
 const updateBarangData = await updateData("barang", id, {
  merek: merek || data.merek,
  tipe: tipe || data.tipe,
  stok: stok || data.stok,
  updatedAt: Date.now(),
 });

 if (updateBarangData)
  return {status: true, message: "Barang updated successfully"};
};

export const deleteBarang = async (id, data) => {
 try {
  const barangDelete = await deleteData("barang", id);
  if (!barangDelete)
   return {status: true, message: "Barang deleted successfully"};
 } catch (error) {
  console.error("Error deleting barang:", error);
  return {status: false, message: "Barang deleted failed"};
 }
};
