import {retrieveData} from "@/services";

export const getDashboard = async () => {
 console.log(`firebase: getDashboard()`);
 try {
  const dataPengadaan = await retrieveData("pengadaan");
  const dataPermintaan = await retrieveData("permintaan");
  const dataBarang = await retrieveData("barang");
  const stok = dataBarang
   .map((item) => item.stok)
   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return {
   status: true,
   message: {
    pengadaan: dataPengadaan.length,
    permintaan: dataPermintaan.length,
    barang: dataBarang.length,
    stok,
   },
  };
 } catch (error) {
  return {status: false, message: error.message};
 }
};
