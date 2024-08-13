import Image from "next/image";
import DashboardPage from "@/components/pages/pegawai/DashboardPage";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Home() {
 return <DashboardPage />;
}
