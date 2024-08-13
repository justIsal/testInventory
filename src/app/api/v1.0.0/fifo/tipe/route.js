// const response = {
//  tipe: ["Sendal Cowo", "Slop Pria", "Slop Wanita"],
//  data: [
//   {"id-barang": 1, merek: "Swallow", nama: "Sendal Cowo", stok: 1},
//   {"id-barang": 2, merek: "Garpit", nama: "Slop Pria", stok: 2},
//   {"id-barang": 3, merek: "Jarcok", nama: "Slop Wanita", stok: 3},
//  ],
// };

import { getFifoByTipe } from '../services.js';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const data = await getFifoByTipe();
    const status = data.status ? 200 : 404;
    return new Response(JSON.stringify(data.message), { status });
  } catch (error) {
    console.error('Error fetching barang:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
