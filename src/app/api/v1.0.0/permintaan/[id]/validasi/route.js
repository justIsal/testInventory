import { getPermintaanID, updatePermintaan } from '../../services';

export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    console.log('update permintaan');
    console.log(body);
    if (!body || Object.keys(body).length === 0) {
      return new Response('Bad Request: Body is missing or empty', { status: 400 });
    }

    if (!body.validasi) {
      return new Response("Bad Request: Missing required field 'validasi'", {
        status: 400,
      });
    }

    const enumValidasi = ['Disetujui', 'Ditolak'];
    if (!enumValidasi.includes(body.validasi)) {
      return new Response(
        "Bad Request: Invalid value for 'validasi'. Expected: 'Disetujui' or 'Ditolak'",
        { status: 400 }
      );
    }

    const data = await getPermintaanID(params.id);
    console.log('data permintaan');
    console.log(data);
    if (data.status) {
      const userUpdate = await updatePermintaan(params.id, data.message, {
        validasi: body.validasi,
      });
      const status = userUpdate.status ? 200 : 422;
      return new Response(userUpdate.message, { status });
    } else {
      return new Response('Permintaan not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response('Unprocessable Entity', { status: 422 });
  }
}
