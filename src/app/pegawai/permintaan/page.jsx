import Image from "next/image";
import PermintaanPage from "@/components/pages/pegawai/PermintaanPage";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Index() {
 return <PermintaanPage />;
}
