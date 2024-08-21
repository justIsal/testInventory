import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '@/lib/firebase/init';
const firestore = getFirestore(app);
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// export async function GET() {
//   try {
//     const data = await getBarang();
//     const status = data.status ? 200 : 404;
//     return new Response(JSON.stringify(data.message), { status });
//   } catch (error) {
//     console.error('Error fetching barang:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }

export async function GET() {
  try {
    // 1. Hitung total dokumen di koleksi barang
    const allDocsSnapshot = await getDocs(collection(firestore, 'barang'));
    const itemCount = allDocsSnapshot.size + 1;

    // 2. Generate kode-barang berdasarkan urutan (itemCount)
    const kodeBarang = `BR${itemCount.toString().padStart(3, '0')}G`;

    return new Response(JSON.stringify({ kodeBarang }), { status: 200 });
  } catch (error) {
    console.error('Error generating kode-barang:', error);
    return NextResponse.json({ error: 'Failed to generate kode-barang' }, { status: 500 });
  }
}
