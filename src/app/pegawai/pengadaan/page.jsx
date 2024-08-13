import Image from "next/image";
import PengadaanPage from "@/components/pages/pegawai/PengadaanPage";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Index() {
 return <PengadaanPage />;
}
