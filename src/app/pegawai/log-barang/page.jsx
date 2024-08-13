import Image from "next/image";
import LogBarang from "@/components/pages/pegawai/LogBarang";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Index() {
 return <LogBarang />;
}
