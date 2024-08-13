import {getDashboard} from "./services.js";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
 try {
  const data = await getDashboard();
  const status = data.status ? 200 : 404;
  return new Response(JSON.stringify(data.message), {status});
 } catch (error) {
  console.error("Error fetching Pengadaan:", error);
  return new Response("Internal Server Error", {status: 500});
 }
}
