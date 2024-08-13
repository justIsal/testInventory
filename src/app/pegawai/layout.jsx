import {AppShell} from "@/components/layouts/AppShell";

export const metadata = {
 title: "Inventory",
 description: "Management Gudang",
};

export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function RootLayout({children}) {
 return (
  <html lang="en">
   <body>
    <AppShell>{children}</AppShell>
   </body>
  </html>
 );
}
