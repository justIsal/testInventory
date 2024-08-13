import {createPermintaan, getPermintaan} from "./services.js";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
 try {
  const data = await getPermintaan();
  const status = data.status ? 200 : 404;
  return new Response(JSON.stringify(data.message), {status});
 } catch (error) {
  console.error("Error fetching Permintaan:", error);
  return new Response("Internal Server Error", {status: 500});
 }
}

export async function POST(request) {
 try {
  const body = await request.json();

  if (!body || Object.keys(body).length === 0) {
   return new Response("Bad Request: Body is missing or empty", {status: 400});
  }

  const {
   "id-pengadaan": idPengadaan,
   "id-users": idUsers,
   keterangan,
   harga,
   jumlah,
//    nama,
//    merek,
//    tipe,
  } = body;

  if (
   !idPengadaan ||
   !idUsers ||
   !keterangan ||
   typeof harga !== "number" ||
   typeof jumlah !== "number"
  ) {
   return new Response("Bad Request: Missing required fields", {status: 400});
  }

//   if (idBarang === "Barang Baru") {
//    if (!nama || !merek || !tipe) {
//     return new Response("Bad Request: Missing required fields", {
//      status: 400,
//     });
//    }
//   }

  const data = await createPermintaan(body);

  const status = data.status ? 201 : 422;
  return new Response(JSON.stringify(data.message), {status});
 } catch (error) {
  console.error("Error processing request:", error);
  return new Response("Unprocessable Entity", {status: 422});
 }
}
