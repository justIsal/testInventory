import {deletePermintaan, getPermintaanID, updatePermintaan} from "../services";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request, {params}) {
 try {
  const data = await getPermintaanID(params.id);
  const status = data.status ? 200 : 404;
  return new Response(JSON.stringify(data.message), {
   status,
  });
 } catch (error) {
  console.error("Error fetching permintaan:", error);
  return new Response("Internal Server Error", {status: 500});
 }
}

export async function PUT(request, {params}) {
 try {
  const body = await request.json();

  const enumValidasi = ["Disetujui", "Ditolak"];
  if (!enumValidasi.includes(body.validasi)) {
   return new Response(
    "Bad Request: Invalid value for 'validasi'. Expected: 'Disetujui' or 'Ditolak'",
    {status: 400}
   );
  }

  const data = await getPermintaanID(params.id);
  if (data.status) {
   const userUpdate = await updatePermintaan(params.id, data.message, body);
   const status = userUpdate.status ? 200 : 422;
   return new Response(userUpdate.message, {status});
  } else {
   return new Response("Permintaan not found", {status: 404});
  }
 } catch (error) {
  console.error("Error updating user:", error);
  return new Response("Unprocessable Entity", {status: 422});
 }
}

export async function DELETE(request, {params}) {
 try {
  const data = await getPermintaanID(params.id);
  if (data.status) {
   const userDelete = await deletePermintaan(params.id, data.message);
   const status = userDelete.status ? 200 : 422;
   return new Response(userDelete.message, {status});
  } else {
   return new Response("Permintaan not found", {status: 404});
  }
 } catch (error) {
  console.error("Error deleting user:", error);
  return new Response("Unprocessable Entity", {status: 422});
 }
}
