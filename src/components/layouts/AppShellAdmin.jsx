'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Navbar,
  Collapse,
  IconButton,
  Tooltip,
  Button,
} from '@material-tailwind/react';

import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  Cog8ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

function NavList() {
  return (
    <div className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Tooltip content="Akun">
        <IconButton variant="text" className=" mr-2">
          <UserIcon className="h-10 w-10 bg-[#D9D9D9] rounded-full p-1" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Setting">
        <IconButton variant="text" className=" mr-2">
          <Cog8ToothIcon className="h-10 w-10 bg-[#D9D9D9] rounded-full p-1" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Notifikasi">
        <IconButton variant="text" className=" mr-2">
          <BellIcon className="h-10 w-10 bg-[#D9D9D9] rounded-full p-1" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: '/svg/home.svg' },
  { title: 'Validasi', url: '/admin/validasi', icon: '/svg/validasi.svg' },
//   { title: 'Data Divisi', url: '/admin/data-divisi', icon: '/svg/divisi.svg' },

  //  {title: "Log Barang", url: "/admin/log-barang", icon: "/svg/log.svg"},
  {
    title: 'Laporan',
    url: '#',
    icon: '/svg/laporan.svg',
    subItems: [
      {
        title: 'Pengadaan',
        url: '/admin/laporan/pengadaan',
        icon: '/svg/pengadaan.svg',
      },
      {
        title: 'Permintaan',
        url: '/admin/laporan/permintaan',
        icon: '/svg/permintaan.svg',
      },
    ],
  },
  { title: 'List Barang', url: '/admin/list-barang', icon: '/svg/list.svg' },
];
export const AppShellAdmin = ({ children }) => {
  const Session = useSession();
  const [open, setOpen] = React.useState(0);
  const [openNav, setOpenNav] = React.useState(false);

  const pathname = usePathname();
  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);
  console.log(pathname);
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <main className="flex gap-2">
      <div className="relative h-screen ">
        <div className="h-full fixed p-2 z-20 max-w-[20rem]">
          <Card className="h-full p-4 shadow-2xl shadow-blue-gray-900/5 rounded-xl w-full bg-[#066AFF]">
            <div className="flex items-center gap-10 p-4 mb-6 flex-col">
              <Image
                src="/svg/stars.svg"
                alt="Vercel Logo"
                className="dark:invert h-44 w-44 bg-white rounded-full p-3"
                width={400}
                height={400}
                priority
              />
              <Typography color="white">Nama Instansi</Typography>
            </div>
            <List>
              {menuItems.map((item, index) =>
                item.subItems ? (
                  <Accordion key={index} open={open === index}>
                    <ListItem
                      className={`bordrek h-[48px] p-0 ${
                        pathname === item.url ? 'bg-white !text-black' : ''
                      }`}
                    >
                      <Link href={item.url} className="flex items-center w-full">
                        <AccordionHeader onClick={() => handleOpen(index)} className="border-b-0">
                          <ListItemPrefix>
                            <div
                              className={`h-[40px] w-[40px] ml-1 flex items-center justify-center bg-[#066AFF] `}
                            >
                              <Image
                                src={item.icon}
                                alt={item.title}
                                className="h-5 w-5"
                                width={400}
                                height={400}
                                priority
                              />
                            </div>
                          </ListItemPrefix>
                          <Typography
                            color={pathname === item.url ? 'black' : 'white'}
                            className="mr-auto font-normal"
                          >
                            {item.title}
                          </Typography>
                        </AccordionHeader>
                      </Link>
                    </ListItem>
                    <AccordionBody className="py-1">
                      <List className="p-0">
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem
                            key={subIndex}
                            className={`bordrek !w-[94.4%] ml-3 h-[48px] p-0 ${
                              pathname === subItem.url ? 'bg-white !text-black' : ''
                            }`}
                          >
                            <Link href={subItem.url} className="flex items-center w-full">
                              <ListItemPrefix>
                                <div
                                  className={`h-[40px] w-[40px] ml-1 flex items-center justify-center bg-[#066AFF]`}
                                >
                                  <Image
                                    src={subItem.icon}
                                    alt={subItem.title}
                                    className="h-3 w-5 text-white"
                                    width={400}
                                    height={400}
                                    priority
                                  />
                                </div>
                              </ListItemPrefix>
                              {subItem.title}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionBody>
                  </Accordion>
                ) : (
                  <ListItem
                    key={index}
                    className={`bordrek h-[48px] p-0 ${
                      pathname === item.url ? 'bg-white !text-black' : ''
                    }`}
                  >
                    <Link href={item.url} className="flex items-center w-full">
                      <ListItemPrefix>
                        <div
                          className={`h-[40px] w-[40px] ml-1 flex items-center justify-center bg-[#066AFF]`}
                        >
                          <Image
                            src={item.icon}
                            alt={item.title}
                            className="h-5 w-5"
                            width={400}
                            height={400}
                            priority
                          />
                        </div>
                      </ListItemPrefix>
                      {item.title}
                    </Link>
                  </ListItem>
                )
              )}
            </List>
            <Button className="bg-white text-blue" onClick={handleLogout}>
              LogOut
            </Button>
          </Card>
        </div>
      </div>
      <div className="w-screen h-full rounded-xl relative">
        <div className="w-full pl-[296px] fixed rounded-xl pr-[14px] z-20">
          <nav className="w-full  mt-2 rounded-xl py-2 px-8  backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80  ">
            <div className="flex items-center justify-between text-blue-gray-900">
              <div className="flex items-center gap-3">
                {/* <UserIcon className="h-12 w-12 bg-[#D9D9D9] rounded-full p-1" /> */}
                <div>
                  <Typography variant="h5">{Session?.data?.user?.nama}</Typography>
                  <div className="flex gap-3">
                    <Typography>{Session?.data?.user?.divisi}</Typography>{' '}
                    <Typography>({Session?.data?.user?.['id-users']})</Typography>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <NavList />
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                ) : (
                  <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                )}
              </IconButton>
            </div>
            <Collapse open={openNav}>
              <NavList />
            </Collapse>
          </nav>
        </div>

        <main className="pl-[298px] pr-[7px] mt-20 pt-2">{children}</main>
      </div>
    </main>
  );
};
