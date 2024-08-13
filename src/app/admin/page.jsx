import DashboardPageAdmin from "@/components/pages/admin/Dashboard";
import Image from "next/image";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Home() {
 return <DashboardPageAdmin />;
}
