import {getLogID} from "../services";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request, {params}) {
 try {
  const data = await getLogID(params.id);
  const status = data.status ? 200 : 404;
  return new Response(JSON.stringify(data.message), {
   status,
  });
 } catch (error) {
  console.error("Error fetching users:", error);
  return new Response("Internal Server Error", {status: 500});
 }
}
