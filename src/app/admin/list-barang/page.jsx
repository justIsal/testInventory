import ListBarangAdminPage from "@/components/pages/admin/ListBarang";
import React from "react";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function Index() {
 return <ListBarangAdminPage />;
}
