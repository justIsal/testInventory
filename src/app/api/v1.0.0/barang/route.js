import {createBarang, getBarang} from "./services.js";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
 try {
  const data = await getBarang();
  const status = data.status ? 200 : 404;
  return new Response(JSON.stringify(data.message), {status});
 } catch (error) {
  console.error("Error fetching barang:", error);
  return new Response("Internal Server Error", {status: 500});
 }
}

export async function POST(request) {
 try {
  const body = await request.json();

  if (!body || Object.keys(body).length === 0) {
   return new Response("Bad Request: Body is missing or empty", {status: 400});
  }

  const {nama, merek, tipe, stok} = body;

  if (!nama || !merek || !tipe || typeof stok !== "number") {
   return new Response("Bad Request: Missing required fields", {status: 400});
  }

  const data = await createBarang(body);

  const status = data.status ? 201 : 422;
  return new Response(JSON.stringify(data.message), {status});
 } catch (error) {
  console.error("Error processing request:", error);
  return new Response("Unprocessable Entity", {status: 422});
 }
}
