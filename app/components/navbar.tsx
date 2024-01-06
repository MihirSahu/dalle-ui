'use client';

import Link from "next/link";
import { Burger, Drawer } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();

  return(
    <div className="flex flex-row w-full justify-between p-10 text-black">
      <Link href='\' className="font-bold">DALLE UI</Link>
      <div className="flex flex-row space-x-10">
        <button className="text-darkGray hover:text-black hidden sm:block">About</button>
        { pathname === '/' || pathname === '/login' || pathname === '/signup' ? <></> : <Link href="\keys" className="text-darkGray hover:text-black hidden sm:block">API Keys</Link> }
        { pathname === '/' || pathname === '/login' || pathname === '/signup' ? <Link href="\login" className="text-darkGray hover:text-black hidden sm:block">Log in</Link> : <form className="text-darkGray hover:text-black hidden sm:block" action='/auth/logout' method='post'><button>Sign out</button></form> }

        <Burger className="sm:hidden" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
        <Drawer styles={{
          inner: {
            width: '50%',
          },
          close: {
            display: 'none',
          },
        }} offset={8} radius="md" opened={opened} onClose={toggle} title="DALLE UI">
          <div className="flex flex-col">
            <div className="flex flex-col space-y-3 h-20">
              <button onClick={toggle} className="text-darkGray hover:text-black text-left">About</button>
              { pathname === '/' || pathname === '/login' || pathname === '/signup' ? <></> : <Link onClick={toggle} href="\keys" className="text-darkGray hover:text-black">API Keys</Link> }
              { pathname === '/' || pathname === '/login' || pathname === '/signup' ? <Link onClick={toggle} href="\login" className="text-darkGray hover:text-black">Log in</Link> : <form className="text-darkGray hover:text-black" action='/auth/logout' method='post'><button>Sign out</button></form> }
              <div className="text-black text-sm">Created by <a className="text-blue-500" href="https://mihirsahu.com" target="_blank">Mihir Sahu</a></div>
            </div>
          </div>
      </Drawer>
      </div>
    </div>
  );
}

export default Navbar;