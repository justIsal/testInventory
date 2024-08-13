import Image from "next/image";
import ListBarang from "@/components/pages/pegawai/ListBarang";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Index() {
 return <ListBarang />;
}
